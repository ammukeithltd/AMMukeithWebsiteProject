import { env } from 'cloudflare:workers';
import { defaultPages, defaultProperties, defaultReviews, type Page, type Property, type Review } from '@/lib/content';
export function database(){if(!env.DB)throw new Error('Database unavailable');return env.DB;}
export async function records<T extends {id:string}>(kind:string,defaults:T[]):Promise<T[]>{const rows=await database().prepare('SELECT id,data FROM content WHERE kind = ?').bind(kind).all<{id:string;data:string}>();const map=new Map(defaults.map(x=>[x.id,x]));for(const row of rows.results)map.set(row.id,JSON.parse(row.data));return [...map.values()];}
export const getProperties=()=>records<Property>('property',defaultProperties);
export const getPages=()=>records<Page>('page',defaultPages);
export const getReviews=()=>records<Review>('review',defaultReviews);
export async function getTracking(){const row=await database().prepare('SELECT data FROM content WHERE kind = ? AND id = ?').bind('settings','tracking').first<{data:string}>();return row?JSON.parse(row.data):{gtm:'',ga:'',ads:'',label:''};}
