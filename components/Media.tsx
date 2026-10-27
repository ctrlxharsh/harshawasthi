'use client';
import Modal from './Modal';
import { assetUrl } from '@/lib/content';

export function kindOfMedia(url: string, label = ''): 'image' | 'pdf' | 'video' | 'youtube' | null {
  const path = url.split('?')[0].toLowerCase();
  if (/\.(png|jpe?g|webp|gif)$/.test(path)) return 'image';
  if (/\.pdf$/.test(path)) return 'pdf';
  if (/\.(mp4|webm)$/.test(path)) return 'video';
  if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//i.test(url) && /video|watch|youtube/i.test(label + url)) return 'youtube';
  return null;
}
export function MediaLink({ url, label, onPreview, className }: { url: string; label: string; onPreview: (media: {url: string; label: string}) => void; className?: string }) {
  const kind = kindOfMedia(url, label);
  return kind ? <button className={className} type="button" onClick={() => onPreview({url, label})}>{label}</button> : <a className={className} href={assetUrl(url)} target="_blank" rel="noopener noreferrer">{label}<span className="sr-only"> (opens in a new tab)</span></a>;
}
export function MediaViewer({ media, close }: { media: {url: string; label: string}; close: () => void }) {
  const kind = kindOfMedia(media.url, media.label);
  let src = assetUrl(media.url);
  if (kind === 'youtube') {
    try { const u = new URL(media.url); const id = u.hostname.includes('youtu.be') ? u.pathname.slice(1) : u.searchParams.get('v'); if (id && /^[\w-]+$/.test(id)) src = `https://www.youtube-nocookie.com/embed/${id}`; } catch { /* keep original link */ }
  }
  return <Modal title={media.label} onClose={close} wide><div className="media-viewer">
    {kind === 'image' && <img src={src} alt={media.label} />}
    {kind === 'video' && <video src={src} controls playsInline />}
    {(kind === 'pdf' || kind === 'youtube') && <iframe src={src} title={media.label} allow="fullscreen; picture-in-picture" sandbox="allow-scripts allow-same-origin allow-presentation" />}
    <a href={assetUrl(media.url)} target="_blank" rel="noopener noreferrer">Open in a new tab ↗</a>
  </div></Modal>;
}
