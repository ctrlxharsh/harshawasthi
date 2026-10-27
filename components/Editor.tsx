'use client';
import { useState } from 'react';
import Modal from './Modal';
import { assetUrl, hasDetails, type Entry, type Portfolio } from '@/lib/content';

const linkText = (links: Entry['links']) => links.map(l => `${l.label} | ${l.url}`).join('\n');
function parseLinks(value: string): Entry['links'] {
  return value.split('\n').filter(Boolean).map(line => { const split = line.indexOf('|'); if (split < 0) throw new Error('Enter each link as Label | URL.'); return { label: line.slice(0, split).trim(), url: line.slice(split + 1).trim() }; });
}
async function upload(file: File) {
  const first = await fetch('/api/upload', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({name:file.name, type:file.type, size:file.size}) });
  const data = await first.json(); if (!first.ok) throw new Error(data.error || 'Could not prepare upload.');
  const put = await fetch(data.url, { method:'PUT', headers:{'Content-Type':file.type}, body:file });
  if (!put.ok) throw new Error('Upload failed. Please check the file and try again.');
  const last = await fetch('/api/upload/complete', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({key:data.key})});
  const result = await last.json(); if (!last.ok) throw new Error(result.error || 'Could not verify upload.');
  return result as {key:string; preview:string};
}
function Upload({ label, accept, onUpload, setError, uploading, setUploading }: {label:string; accept:string; onUpload:(key:string, preview:string, name:string)=>void; setError:(error:string)=>void; uploading:boolean; setUploading:(busy:boolean)=>void}) {
  const [busy, setBusy] = useState(false);
  return <label className="upload-label">{busy ? 'Uploading…' : label}<input type="file" accept={accept} disabled={busy || uploading} onChange={async e => { const file = e.target.files?.[0]; e.target.value = ''; if (!file) return; setBusy(true); setUploading(true); setError(''); try { const result = await upload(file); onUpload(result.key, result.preview, file.name); } catch (error) { setError(error instanceof Error ? error.message : 'Upload failed'); } finally { setBusy(false); setUploading(false); } }} /></label>;
}
const acceptFiles = 'image/png,image/jpeg,image/webp,image/gif,application/pdf,video/mp4,video/webm,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation';

export function EntryEditor({ item, isNew, onClose, onSave, saving, serverError }: {item:Entry; isNew:boolean; onClose:()=>void; onSave:(entry:Entry)=>void; saving:boolean; serverError:string}) {
  const [draft, setDraft] = useState(item); const [links, setLinks] = useState(linkText(item.links)); const [tags, setTags] = useState(item.tags.join(', '));
  const [error, setError] = useState(''); const [preview, setPreview] = useState(''); const [uploading, setUploading] = useState(false);
  const [details, setDetails] = useState<NonNullable<Entry['details']>>(item.details ?? {enabled:hasDetails(item), description:'', images:[]});
  const [galleryPreviews, setGalleryPreviews] = useState<Record<string,string>>({});
  const set = (field: keyof Entry, value: string) => setDraft(d => ({...d, [field]: value}));
  return <Modal title={isNew ? 'Add entry' : 'Edit entry'} onClose={onClose}><form className="editor-form" onSubmit={e => {e.preventDefault(); setError(''); try { if (details.images.some(image=>!image.url.trim())) throw new Error('Add an image URL or remove the empty image.'); onSave({...draft, details, links: parseLinks(links), tags: tags.split(',').map(s=>s.trim()).filter(Boolean)}); } catch (err) { setError(err instanceof Error ? err.message : 'Please check the links.'); }}}>
    <label>Title<input required maxLength={200} value={draft.title} onChange={e=>set('title',e.target.value)} /></label>
    <label>Short description<textarea rows={4} maxLength={3000} value={draft.description} onChange={e=>set('description',e.target.value)} /></label>
    <label>Subtitle or date<input maxLength={200} value={draft.meta} onChange={e=>set('meta',e.target.value)} /></label>
    <label>Image URL or uploaded file<input value={draft.image} onChange={e=>{set('image',e.target.value);setPreview('');}} placeholder="https://…" /></label>
    <Upload uploading={uploading} setUploading={setUploading} label="Upload image" accept="image/png,image/jpeg,image/webp,image/gif" setError={setError} onUpload={(key,url)=>{set('image',key);setPreview(url);}} />
    {draft.image && <img className="editor-preview" src={preview || assetUrl(draft.image)} alt="Selected cover" />}
    <fieldset className="detail-settings"><legend>Detailed view</legend>
      <label className="detail-toggle"><input type="checkbox" checked={details.enabled} onChange={e=>setDetails(d=>({...d,enabled:e.target.checked}))} /> Open a detailed view when this entry is clicked</label>
      <p>The short description appears on both the card and in the popup. A cover image, links, tags, extra text or gallery images make the detailed view available.</p>
      <label>Additional description<textarea rows={5} maxLength={10000} value={details.description} onChange={e=>setDetails(d=>({...d,description:e.target.value}))} /></label>
      {details.images.map((image,index)=><div className="gallery-editor" key={index}>
        <label>Image URL<input value={image.url} placeholder="https://…" onChange={e=>setDetails(d=>({...d,images:d.images.map((v,i)=>i===index?{...v,url:e.target.value}:v)}))} /></label>
        <label>Image description<input maxLength={500} value={image.caption} onChange={e=>setDetails(d=>({...d,images:d.images.map((v,i)=>i===index?{...v,caption:e.target.value}:v)}))} /></label>
        {image.url && <img className="editor-preview" src={galleryPreviews[image.url] || assetUrl(image.url)} alt={image.caption || 'Gallery image'} />}
        <button type="button" onClick={()=>setDetails(d=>({...d,images:d.images.filter((_,i)=>i!==index)}))}>Remove image</button>
      </div>)}
      {details.images.length < 12 && <div className="gallery-add"><button type="button" disabled={uploading} onClick={()=>setDetails(d=>({...d,images:[...d.images,{url:'',caption:''}]}))}>+ Add image URL</button>
        <Upload uploading={uploading} setUploading={setUploading} label="Upload gallery image" accept="image/png,image/jpeg,image/webp,image/gif" setError={setError} onUpload={(key,url)=>{setGalleryPreviews(p=>({...p,[key]:url}));setDetails(d=>({...d,images:[...d.images,{url:key,caption:''}]}));}} /></div>}
    </fieldset>
    <label>Links <small>One per line: Label | URL</small><textarea rows={4} value={links} onChange={e=>setLinks(e.target.value)} placeholder={'GitHub | https://github.com/…\nVideo | https://…'} /></label>
    <Upload uploading={uploading} setUploading={setUploading} label="Upload attachment" accept={acceptFiles} setError={setError} onUpload={(key,_url,name)=>setLinks(current => `${current}${current ? '\n' : ''}${name} | ${key}`)} />
    <label>Tags <small>Separated by commas</small><input value={tags} onChange={e=>setTags(e.target.value)} /></label>
    {(error || serverError) && <p className="form-error" role="alert">{error || serverError}</p>}
    <div className="form-actions"><button type="button" onClick={onClose}>Cancel</button><button type="submit" className="primary" disabled={saving || uploading}>{saving ? 'Saving…' : 'Save changes'}</button></div>
  </form></Modal>;
}
export function ProfileEditor({ profile, onClose, onSave, saving, serverError }: {profile:Portfolio['profile'];onClose:()=>void;onSave:(p:Portfolio['profile'])=>void;saving:boolean;serverError:string}) {
  const [draft,setDraft] = useState(profile); const [links,setLinks] = useState(linkText(profile.socials)); const [error,setError] = useState(''); const [uploading,setUploading] = useState(false);
  const set = (field:keyof Portfolio['profile'], value:string) => setDraft(d=>({...d,[field]:value}));
  return <Modal title="Edit profile" onClose={onClose}><form className="editor-form" onSubmit={e=>{e.preventDefault();try{onSave({...draft,socials:parseLinks(links)});}catch(err){setError(err instanceof Error?err.message:'Check your links.');}}}>
    <label>Name<input required value={draft.name} onChange={e=>set('name',e.target.value)} /></label>
    <label>English greeting<input required value={draft.greeting} onChange={e=>set('greeting',e.target.value)} /></label>
    <label>Hindi greeting<input required lang="hi" value={draft.hindi} onChange={e=>set('hindi',e.target.value)} /></label>
    <label>About me<textarea required rows={7} value={draft.about} onChange={e=>set('about',e.target.value)} /></label>
    <label>Email<input required type="email" value={draft.email} onChange={e=>set('email',e.target.value)} /></label>
    <label>Resume URL or uploaded file<input value={draft.resume} onChange={e=>set('resume',e.target.value)} /></label>
    <Upload uploading={uploading} setUploading={setUploading} label="Upload resume" accept="application/pdf" setError={setError} onUpload={key=>set('resume',key)} />
    <label>Social links <small>One per line: Label | URL</small><textarea rows={4} value={links} onChange={e=>setLinks(e.target.value)} /></label>
    {(error || serverError) && <p className="form-error" role="alert">{error || serverError}</p>}
    <div className="form-actions"><button type="button" onClick={onClose}>Cancel</button><button type="submit" className="primary" disabled={saving || uploading}>{saving?'Saving…':'Save changes'}</button></div>
  </form></Modal>;
}
