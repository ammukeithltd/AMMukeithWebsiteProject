import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/navigation';
import { Footer } from '@/components/site';
import { TrackingConsent } from '@/components/tracking';
import { getTracking } from '@/db/store';
import { ORIGIN,CONTACT } from '@/lib/content';
export const dynamic='force-dynamic';
export const metadata:Metadata={metadataBase:new URL(ORIGIN),verification:{google:'8t9-I-HptOSChCEiyhqPq-UvqURHfqatracxKM9QKkQ'},title:{default:'Abdhool Mukeith | London Property Consultant',template:'%s | Abdhool Mukeith'},description:'Personal property advice, home sales and free valuations in East London. Talk to Abdhool Mukeith about your next move.',icons:{icon:'/icon.svg'},alternates:{canonical:ORIGIN},openGraph:{title:'Abdhool Mukeith | London Property Consultant',description:'London property. A personal approach.',type:'website',locale:'en_GB'}};
export default async function Layout({children}:{children:React.ReactNode}){const tracking=await getTracking();return <html lang="en-GB"><body><Header/>{children}<Footer/><TrackingConsent config={tracking}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'RealEstateAgent',name:'Abdhool Mukeith',alternateName:CONTACT.company,address:{'@type':'PostalAddress',streetAddress:'Level 18, 40 Bank St, Canary Wharf Estate',addressLocality:'London',postalCode:'E14 5NR',addressCountry:'GB'},url:ORIGIN,telephone:[CONTACT.tel,CONTACT.secondTel],email:CONTACT.email,areaServed:'East London',sameAs:[CONTACT.profile]})}}/></body></html>}
