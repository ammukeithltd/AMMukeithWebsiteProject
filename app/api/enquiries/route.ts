import { database } from '@/db/store';
import { enquiryServices } from '@/lib/property-sections';
import { sameOrigin } from '@/lib/admin';
const respond=(message:string,status:number)=>Response.json({error:message},{status});
export async function POST(request:Request){
 if(!sameOrigin(request))return respond('Please submit your enquiry from this website.',403);
 if(Number(request.headers.get('content-length')??0)>16000)return respond('Your message is too long.',413);
 let b;try{const raw=await request.text();if(raw.length>16000)return respond('Your message is too long.',413);b=JSON.parse(raw);}catch{return respond('Please check the form and try again.',400);}
 if(b.website)return respond('We couldn’t accept this enquiry. Please call Abdhool.',400);
 const field=(key:string,max=200)=>typeof b[key]==='string'?b[key].trim().slice(0,max):'';
 const name=field('name'),email=field('email'),phone=field('phone',40),service=field('service',50),postcode=field('postcode',20),address=field('address',300),message=field('message',4000);
 if(name.length<2||!/^\S+@\S+\.\S+$/.test(email)||phone.replace(/\D/g,'').length<7||!enquiryServices.includes(service)||!b.privacy)return respond('Please add your name, a valid email and phone number, and acknowledge the privacy notice.',400);
 if(service==='Valuation'&&(!postcode||!address))return respond('Please add the property address and postcode.',400);
 try{const db=database(),now=Date.now();const ip=request.headers.get('cf-connecting-ip')??'local';const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(ip+':'+Math.floor(now/3600000)));const key=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
 const rate=await db.prepare('INSERT INTO rate_limits (key,count,expires) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count').bind(key,now+3600000).first<{count:number}>();
 if((rate?.count??0)>8)return respond('Too many requests in a short time. Please call or email Abdhool, or try again later.',429);
 await db.prepare('DELETE FROM rate_limits WHERE expires < ?').bind(now).run();
 const id=crypto.randomUUID();const source=JSON.stringify({page:field('page',200),...(b.measurement===true?{utm_source:field('utm_source',150),utm_medium:field('utm_medium',150),utm_campaign:field('utm_campaign',150),gclid:field('gclid',200)}:{})});
 await db.prepare('INSERT INTO enquiries (id,created,name,email,phone,service,postcode,address,message,source,status) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(id,new Date().toISOString(),name,email,phone,service,postcode,address,message,source,'New').run();return Response.json({ok:true,id});
 }catch{return respond('Your enquiry could not be saved. Please try again or contact Abdhool directly on 07356 069322.',503);}
}
