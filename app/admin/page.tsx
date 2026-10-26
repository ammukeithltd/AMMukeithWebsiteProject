import { requireChatGPTUser } from '@/app/chatgpt-auth';
import { isAdmin } from '@/lib/admin';
import { database,getPages,getProperties,getReviews,getTracking } from '@/db/store';
import { Manager } from '@/components/manager';
export const dynamic='force-dynamic';
export const metadata={title:'Site manager',robots:{index:false,follow:false}};
export default async function Admin(){await requireChatGPTUser('/admin');if(!await isAdmin())return <main id="main" className="section empty-state"><p className="eyebrow">PRIVATE MANAGEMENT AREA</p><h1>Manager access is restricted.</h1><p>Your account has not been enabled for this area. The owner can configure approved manager access in the site settings.</p><a className="button" href="/">Back to the website</a></main>;const initial={pages:await getPages(),properties:await getProperties(),reviews:await getReviews(),tracking:await getTracking(),enquiries:(await database().prepare('SELECT * FROM enquiries ORDER BY created DESC LIMIT 500').all()).results};return <main id="main" className="section manager"><div className="section-heading"><div><p className="eyebrow">YOUR WEBSITE, IN YOUR HANDS</p><h1>Site manager</h1></div><a className="text-link" href="/">View website ↗</a></div><Manager initial={initial}/></main>}
