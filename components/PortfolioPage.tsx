'use client';
import { useEffect, useState } from 'react';
import Hero from './Hero';
import Modal from './Modal';
import { EntryEditor, ProfileEditor } from './Editor';
import { MediaLink, MediaViewer } from './Media';
import { assetUrl, hasDetails, sectionIds, sectionLabels, type Entry, type Portfolio, type SectionId } from '@/lib/content';

type Selection = { section: SectionId; index: number; item: Entry } | null;
const sectionIntros: Record<SectionId, string> = {
  projects: 'Things I’ve made, learned from, and sent out into the world.',
  research: 'Questions I’ve explored at the intersection of intelligence and perception.',
  experience: 'The teams, ideas, and real-world problems that have shaped my work.',
  achievements: 'A few moments along the way.',
  skills: 'The tools and ideas I reach for when building.',
  activities: 'Learning is better when it’s shared.',
  journey: 'The places where the story began.',
};
const blank = (): Entry => ({ id: crypto.randomUUID(), title:'', description:'', meta:'', image:'', links:[], tags:[] });

export default function PortfolioPage({ initial, initialRevision, adminEmail }: { initial: Portfolio; initialRevision: number; adminEmail: string }) {
  const [content,setContent] = useState(initial); const [revision,setRevision] = useState(initialRevision);
  const [owner,setOwner] = useState(false); const [editing,setEditing] = useState(false); const [menu,setMenu] = useState(false);
  const [login,setLogin] = useState(false); const [password,setPassword] = useState(''); const [loginError,setLoginError] = useState(''); const [loggingIn,setLoggingIn] = useState(false);
  const [about,setAbout] = useState(false); const [profileEdit,setProfileEdit] = useState(false); const [selection,setSelection] = useState<Selection>(null);
  const [saving,setSaving] = useState(false); const [saveError,setSaveError] = useState(''); const [notice,setNotice] = useState('');
  const [media,setMedia] = useState<{url:string;label:string}|null>(null);
  const [detail,setDetail] = useState<Entry|null>(null);
  const [expanded,setExpanded] = useState<Partial<Record<SectionId, boolean>>>({});
  useEffect(()=>{ fetch('/api/session',{cache:'no-store'}).then(r=>r.json()).then(data=>setOwner(!!data.owner)).catch(()=>{}); },[]);
  async function persist(next:Portfolio) {
    setSaving(true); setSaveError(''); setNotice('');
    try {
      const response = await fetch('/api/portfolio',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({revision,content:next})});
      const result = await response.json(); if (!response.ok) throw new Error(result.error || 'Could not save.');
      setContent(next); setRevision(result.revision); setSelection(null); setProfileEdit(false); setNotice('Changes saved.');
    } catch(error) { setSaveError(error instanceof Error ? error.message : 'Could not save.'); }
    finally { setSaving(false); }
  }
  async function signIn(event:React.FormEvent) {
    event.preventDefault(); setLoggingIn(true); setLoginError('');
    try {
      const r=await fetch('/api/auth/sign-in/email',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:adminEmail,password})});
      if (!r.ok) throw new Error('Could not sign in. Check your password and try again.');
      const result = await fetch('/api/session',{cache:'no-store'}).then(r=>r.json());
      if (!result.owner) throw new Error('This account does not have permission to edit.');
      setOwner(true);setEditing(true);setLogin(false);setPassword('');
    } catch(error) { setLoginError(error instanceof Error ? error.message : 'Could not sign in.'); } finally { setLoggingIn(false); }
  }
  async function signOut() { await fetch('/api/auth/sign-out',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'}); setOwner(false);setEditing(false);setMenu(false); }
  function updateItem(section:SectionId,index:number,item:Entry) {
    const list=[...content.sections[section]]; if(index<0) list.push(item); else list[index]=item;
    void persist({...content,sections:{...content.sections,[section]:list}});
  }
  function removeItem(section:SectionId,index:number) {
    if (!window.confirm(`Remove “${content.sections[section][index].title}” from the portfolio?`)) return;
    void persist({...content,sections:{...content.sections,[section]:content.sections[section].filter((_,i)=>i!==index)}});
  }
  function moveItem(section:SectionId,index:number,direction:number) {
    const list=[...content.sections[section]]; const target=index+direction; if(target<0 || target>=list.length) return;
    [list[index],list[target]]=[list[target],list[index]]; void persist({...content,sections:{...content.sections,[section]:list}});
  }
  function controls(section:SectionId,index:number,item:Entry) {
    if (!editing) return null;
    return <div className="row-controls"><button type="button" onClick={()=>{setSaveError('');setSelection({section,index,item});}}>Edit<span className="sr-only"> {item.title}</span></button><button type="button" disabled={index===0||saving} onClick={()=>moveItem(section,index,-1)} aria-label={`Move ${item.title} up`}>↑</button><button type="button" disabled={index===content.sections[section].length-1||saving} onClick={()=>moveItem(section,index,1)} aria-label={`Move ${item.title} down`}>↓</button><button type="button" disabled={saving} onClick={()=>removeItem(section,index)}>Remove<span className="sr-only"> {item.title}</span></button></div>;
  }
  function row(item:Entry,section:SectionId,index:number) {
    const clickable = hasDetails(item);
    const images = item.details?.images.length ? item.details.images : item.image ? [{url:item.image,caption:''}] : [];
    return <article className={`work-row ${clickable ? 'has-details' : ''} ${clickable && images.length ? 'has-gallery' : ''}`} key={item.id} onClick={event=>{ if (clickable && !(event.target as Element).closest('a, button, input, textarea, label') && !window.getSelection()?.toString()) setDetail(item); }}>
      <div className="row-index">{String(index+1).padStart(2,'0')}</div>
      {item.image && <button className="row-image" type="button" onClick={()=>setMedia({url:item.image,label:item.title})} aria-label={`View image for ${item.title}`}><img src={assetUrl(item.image)} alt="" /></button>}
      <div className="row-content"><div className="row-titleline"><h3>{item.title}</h3>{item.meta && <span className="row-meta">{item.meta}</span>}</div>{item.description && <p>{item.description}</p>}
        {item.tags.length>0 && <p className="row-tags">{item.tags.join(' · ')}</p>}
        {item.links.length>0 && <div className="resource-links">{item.links.map((link,i)=><MediaLink key={`${link.url}-${i}`} {...link} onPreview={setMedia} />)}</div>}
        {controls(section,index,item)}{clickable && !!images.length && <div className="row-thumbs" aria-hidden="true">{images.slice(0,3).map((image,i)=><img key={i} src={assetUrl(image.url)} alt="" />)}{images.length>3 && <span>+{images.length-3}</span>}</div>}</div>
      {clickable ? <button className="row-arrow" type="button" onClick={()=>setDetail(item)} aria-label={`View details for ${item.title}`}>↗</button> : <div className="row-arrow" aria-hidden="true" />}
    </article>;
  }
  return <>
    <header className="site-header"><a className="wordmark" href="#top" onClick={()=>setMenu(false)}>{content.profile.name}</a>
      <button className="menu-toggle" aria-expanded={menu} aria-controls="nav-links" onClick={()=>setMenu(!menu)}>{menu?'Close':'Menu'} <span aria-hidden="true">{menu?'×':'☰'}</span></button>
      <nav id="nav-links" className={menu?'open':''} aria-label="Main navigation">
        <a href="#about" onClick={()=>{setAbout(true);setMenu(false);}}>About</a>
        {(['projects','research','experience'] as const).map(id=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{sectionLabels[id].replace(' & publications','')}</a>)}
        <a href="#contact" onClick={()=>setMenu(false)}>Contact</a>
        {owner ? <><button className="login-button" onClick={()=>{setEditing(!editing);setMenu(false);}}>{editing?'Done':'Edit'}</button><button className="logout-button" onClick={signOut}>Log out</button></> : <button className="login-button" onClick={()=>{setLogin(true);setMenu(false);}}>Login</button>}
      </nav>
    </header>
    <main id="top">
      <Hero profile={content.profile} open={about} setOpen={setAbout} canEdit={editing} onEdit={()=>{setSaveError('');setProfileEdit(true);}} />
      <div className="interlude"><p>Curiosity, <em>in motion.</em></p><span>Building at the intersection of AI, vision &amp; robotics.</span><img className="pet pet-hanging" src="/pets/hanging.webp" alt="" /></div>
      {sectionIds.map(id=><section className="portfolio-section" id={id} key={id}>
        <div className="section-intro"><h2>{sectionLabels[id]}</h2><p>{sectionIntros[id]}</p>{(['research','achievements','skills','activities'] as const).includes(id as 'research'|'achievements'|'skills'|'activities') && <img className="pet pet-seated" src={`/pets/${id==='achievements'?'peeking':id==='activities'?'waving':'seated'}.webp`} alt="" />}</div>
        <div className="work-list">{content.sections[id].slice(0,3).map((item,i)=>row(item,id,i))}</div>
        <div id={`${id}-entries`} className={`more-entries ${editing || expanded[id] ? 'is-expanded' : ''}`} inert={!editing && !expanded[id]} aria-hidden={!editing && !expanded[id] ? true : undefined}><div>{content.sections[id].slice(3).map((item,i)=>row(item,id,i+3))}</div></div>
        {content.sections[id].length > 3 && !editing && <button className="view-more" type="button" aria-expanded={!!expanded[id]} aria-controls={`${id}-entries`} onClick={()=>setExpanded(current=>({...current,[id]:!current[id]}))}>{expanded[id] ? 'View less' : `View more (${content.sections[id].length - 3})`} <span aria-hidden="true">{expanded[id] ? '−' : '+'}</span><span className="sr-only"> {sectionLabels[id]}</span></button>}
        {editing && <button className="add-entry" onClick={()=>{setSaveError('');setSelection({section:id,index:-1,item:blank()});}}>+ Add entry</button>}
      </section>)}
      <section id="contact" className="contact-section"><div><h2>Let’s make<br />something meaningful.</h2><p>Have an idea, a question, or a research opportunity? I’d love to hear from you.</p><a className="contact-email" href={`mailto:${content.profile.email}`}>{content.profile.email} <span aria-hidden="true">↗</span></a></div>
        <div className="contact-bottom"><div className="contact-links">{content.profile.socials.map(link=><a href={link.url} key={link.label} target="_blank" rel="noopener noreferrer">{link.label} ↗</a>)}{content.profile.resume && <MediaLink label="Resume" url={content.profile.resume} onPreview={setMedia} />}</div><img className="pet pet-waving" src="/pets/waving.webp" alt="" /></div>
        {editing && <button className="edit-button" onClick={()=>{setSaveError('');setProfileEdit(true);}}>Edit profile & contact</button>}
      </section>
    </main>
    <footer className="site-footer"><span>© {new Date().getFullYear()} {content.profile.name}</span><a href="#top">Back to top ↑</a></footer>
    {(notice || (!selection && !profileEdit && saveError)) && <div className={`status-message ${saveError?'status-error':''}`} role="status"><span>{saveError || notice}</span><button onClick={()=>{setNotice('');setSaveError('');}} aria-label="Dismiss">×</button></div>}
    {login && <Modal title="Owner login" onClose={()=>{setLogin(false);setPassword('');setLoginError('');}}><form className="editor-form" onSubmit={signIn}><p>Enter your password to edit the portfolio.</p><label>Password<input autoFocus type="password" required autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} /></label>{loginError && <p className="form-error" role="alert">{loginError}</p>}<div className="form-actions"><button type="submit" className="primary" disabled={loggingIn}>{loggingIn?'Signing in…':'Sign in'}</button></div></form></Modal>}
    {selection && <EntryEditor key={`${selection.section}-${selection.index}`} item={selection.item} isNew={selection.index<0} onClose={()=>setSelection(null)} onSave={item=>updateItem(selection.section,selection.index,item)} saving={saving} serverError={saveError} />}
    {profileEdit && <ProfileEditor profile={content.profile} onClose={()=>setProfileEdit(false)} onSave={profile=>void persist({...content,profile})} saving={saving} serverError={saveError} />}
    {detail && <Modal title={detail.title} onClose={()=>setDetail(null)} wide><div className="detail-view">{detail.meta && <p className="detail-meta">{detail.meta}</p>}{detail.description && <p className="detail-summary">{detail.description}</p>}{detail.details?.description && <div className="detail-description">{detail.details.description.split('\n').filter(Boolean).map((paragraph,i)=><p key={i}>{paragraph}</p>)}</div>}{(detail.details?.images.length ? detail.details.images : detail.image ? [{url:detail.image,caption:''}] : []).map((image,i)=><figure key={i}><img src={assetUrl(image.url)} alt={image.caption || `${detail.title} image ${i+1}`} />{image.caption && <figcaption>{image.caption}</figcaption>}</figure>)}{detail.tags.length>0 && <p className="detail-meta">{detail.tags.join(' · ')}</p>}{detail.links.length>0 && <div className="resource-links">{detail.links.map((link,i)=><MediaLink key={i} {...link} onPreview={setMedia} />)}</div>}</div></Modal>}
    {media && <MediaViewer media={media} close={()=>setMedia(null)} />}
  </>;
}
