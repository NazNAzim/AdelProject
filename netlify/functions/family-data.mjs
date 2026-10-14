import { getStore } from '@netlify/blobs';
import { createHash } from 'node:crypto';
const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
export default async (req)=>{
  const url=new URL(req.url); const household=(url.searchParams.get('household')||'').trim();
  if(household.length<10||household.length>100)return reply({error:'Code famille invalide'},400);
  const key=createHash('sha256').update(household).digest('hex'); const store=getStore('adel-family-data');
  if(req.method==='GET'){const data=await store.get(key,{type:'json',consistency:'strong'});return data?reply(data):reply({error:'Aucune donnée'},404)}
  if(req.method==='PUT'){const data=await req.json().catch(()=>null);if(!data||!Array.isArray(data.items)||data.items.length>500)return reply({error:'Données invalides'},400);const saved={...data,version:6,updatedAt:new Date().toISOString()};await store.setJSON(key,saved);return reply(saved)}
  return reply({error:'Méthode non autorisée'},405);
};
