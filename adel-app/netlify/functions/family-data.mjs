import { getStore } from '@netlify/blobs';
import { createHash } from 'node:crypto';
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
export default async function(req){
  const url=new URL(req.url); const household=(url.searchParams.get('household')||'').trim();
  if(household.length<10||household.length>100) return json({error:'Code famille invalide'},400);
  const key=createHash('sha256').update(household).digest('hex');
  const store=getStore({name:'adel-family-data',region:'eu-central-1'});
  if(req.method==='GET') { const data=await store.get(key,{type:'json',consistency:'strong'}); return data?json(data):json({error:'Aucune donnée'},404); }
  if(req.method==='PUT') { const data=await req.json().catch(()=>null); if(!data||!Array.isArray(data.items)||data.items.length>500) return json({error:'Données invalides'},400); await store.setJSON(key,{...data,version:5,updatedAt:new Date().toISOString()}); return json({ok:true}); }
  return json({error:'Méthode non autorisée'},405);
}
