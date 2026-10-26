import { ArrowUpRight,BookOpen,FileText,ReceiptText,Download,ExternalLink } from 'lucide-react';
import type { Page } from '@/lib/content';
import { documents } from '@/lib/documents';
import { ContactLinks,Paragraphs } from './site';

export const resourceIds=['guides','seller-guide','buyer-guide','tenant-guide','landlord-terms','fees','terms-of-business'];
const resources=[
  {id:'seller-guide',title:'Seller guide',text:'Prepare for a sale with the KW PDF and the GOV.UK guide.',Icon:BookOpen},
  {id:'buyer-guide',title:'Buyer guide',text:'Plan your purchase with the KW PDF and the GOV.UK guide.',Icon:BookOpen},
  {id:'tenant-guide',title:'Tenant guide',text:'Before you start renting: the government’s Easy Read guide.',Icon:BookOpen},
  {id:'renters-rights-act',title:'Renters’ Rights Act',text:'Official GOV.UK guidance on the changes to private renting in England and what they mean for tenants.',Icon:BookOpen,href:'https://www.gov.uk/guidance/renters-rights-act-overview-for-tenants'},
  {id:'landlord-terms',title:'Landlord terms',text:'Read the KW Move terms of business for letting services.',Icon:FileText},
  {id:'fees',title:'Our fees',text:'Discuss fees for residential and commercial sales and lettings.',Icon:ReceiptText},
  {id:'terms-of-business',title:'Terms of business',text:'Download seller and landlord terms for your proposed instruction.',Icon:FileText},
];
export function ResourceCards(){return <div className="resource-grid">{resources.map(({id,title,text,Icon,href})=><a className="resource-card" key={id} href={href||'/'+id} target={href?'_blank':undefined} rel={href?'noopener noreferrer':undefined} aria-label={href?title+' on GOV.UK (opens in a new tab)':undefined}><Icon size={27} strokeWidth={1.3}/><h3>{title}</h3><p>{text}</p><span>{href?'Read on GOV.UK':'Explore'} {href?<ExternalLink size={18}/>:<ArrowUpRight size={18}/>}</span></a>)}</div>}
function ResourceBody({text}:{text:string}){return <div className="resource-body">{text.split('\n\n').filter(Boolean).map((block,i)=>{if(block.startsWith('## ')){const [heading,...lines]=block.split('\n');return <section key={i}><h2>{heading.slice(3)}</h2><p>{lines.join('\n')}</p></section>}return <p key={i}>{block}</p>})}</div>}

export function DocumentDownloads({section}:{section:string}){
  const list=documents.filter(d=>d.sections.includes(section));
  if(!list.length)return null;
  return <section className="document-downloads" aria-labelledby="documents-heading"><p className="eyebrow">READ AT YOUR OWN PACE</p><h2 id="documents-heading">{section.includes('terms')?'Terms documents':'Your downloadable guide'}</h2>{list.map(d=><article className="document-card" key={d.id}><div className="document-title"><FileText size={25} aria-hidden="true"/><div><h3>{d.title}</h3><p className="document-publisher">{d.publisher}</p></div></div><p>{d.description}</p><p className="document-meta">PDF · {d.pages} pages · {d.bytes>=1e6?(d.bytes/1e6).toFixed(1)+' MB':Math.round(d.bytes/1000)+' KB'}</p><div className="document-actions"><a className="button small" href={d.file} target="_blank" rel="noopener noreferrer" aria-label={'View '+d.title+' PDF in a new tab'}>View PDF <ExternalLink size={16}/></a><a className="document-download-link" href={d.file} download aria-label={'Download '+d.title+' PDF'}>Download <Download size={16}/></a></div></article>)}</section>;
}

export function ServiceResourceLinks({letting=false}:{letting?:boolean}){const links=letting?[['Tenant guide','/tenant-guide'],['Landlord terms','/landlord-terms']]:[['Seller guide','/seller-guide'],['Buyer guide','/buyer-guide'],['Terms of business','/terms-of-business']];return <nav className="service-resource-links" aria-label={letting?'Residential letting guides':'Property guides'}><strong>{letting?'Residential letting resources':'Useful guides & documents'}</strong><div>{links.map(([label,href])=><a href={href} key={href}>{label}<ArrowUpRight size={15}/></a>)}</div></nav>}

export function ResourcePage({page}:{page:Page}){
  const source=page.id==='seller-guide'?'https://www.gov.uk/government/publications/how-to-sell-a-home/how-to-sell-a-home':page.id==='buyer-guide'?'https://www.gov.uk/government/publications/how-to-buy-a-home/how-to-buy':null;
  return <main id="main"><section className="page-hero resource-hero"><div>{page.id!=='guides'&&<a className="resource-back" href="/guides">← Guides & fees</a>}<p className="eyebrow">INFORMATION FOR YOUR NEXT MOVE</p><h1>{page.title}</h1><p>{page.intro}</p></div></section>{page.id==='guides'?<section className="section"><Paragraphs text={page.body}/><ResourceCards/></section>:<section className="section resource-layout"><article><DocumentDownloads section={page.id}/>{source&&<section className="official-guide"><h2>GOV.UK guide</h2><p>Read the government’s detailed guidance alongside the Keller Williams PDF.</p><a className="text-link" href={source} target="_blank" rel="noopener noreferrer">{page.id==='seller-guide'?'How to sell a home':'How to buy a home'} on GOV.UK <ExternalLink size={16}/></a></section>}<div className={page.id==='fees'?'fee-schedule':undefined}><ResourceBody text={page.body}/></div>{page.id==='fees'&&<a className="text-link" href="/terms-of-business">Read seller & landlord terms <ArrowUpRight size={16}/></a>}</article><aside className="resource-contact"><p className="eyebrow">PERSONAL PROPERTY ADVICE</p><h2>Let’s talk.</h2><p>One dedicated contact for all your property questions.</p><a className="button" href={'/contact?topic='+encodeURIComponent(page.title)}>{page.cta}<ArrowUpRight size={18}/></a><ContactLinks/></aside></section>}{page.id!=='guides'&&<section className="section related-resources soft"><h2>Explore more</h2><ResourceCards/></section>}</main>;
}
