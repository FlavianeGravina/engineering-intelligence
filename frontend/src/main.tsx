import React from 'react';
import ReactDOM from 'react-dom/client';
import {BarChart,Bar,CartesianGrid,ResponsiveContainer,Tooltip,XAxis,YAxis} from 'recharts';
import './styles.css';

type Squad='Platform'|'Payments'|'Experience';
type Item={id:number;squad:Squad;completed:string;cycleDays:number;leadDays:number;blocked:boolean};
const squads:Squad[]=['Platform','Payments','Experience'];
// Reproducible synthetic events: no individual employee or customer information.
const events:Item[]=Array.from({length:120},(_,i)=>{
 const day=new Date(Date.UTC(2026,9,1+Math.floor(i*42/120)));
 return {id:i+1,squad:squads[i%3],completed:day.toISOString().slice(0,10),
 cycleDays:2+(i*7%11),leadDays:4+(i*11%17),blocked:i%9===0};
});
const dayDiff=(a:string,b:string)=>Math.round((Date.parse(a+'T00:00:00Z')-Date.parse(b+'T00:00:00Z'))/86400000);
const average=(values:number[])=>values.length?(values.reduce((a,b)=>a+b,0)/values.length).toFixed(1):'—';
const weekOf=(date:string)=>{const d=new Date(date+'T00:00:00Z');const dow=(d.getUTCDay()+6)%7;d.setUTCDate(d.getUTCDate()-dow);return d.toISOString().slice(0,10)};
function App(){
 const [squad,setSquad]=React.useState('All squads');
 const [period,setPeriod]=React.useState('30');
 const [apiStatus,setApiStatus]=React.useState('Synthetic demonstration');
 const end='2026-11-12';
 const filtered=React.useMemo(()=>events.filter(e=>(squad==='All squads'||e.squad===squad)&&dayDiff(end,e.completed)<Number(period)),[squad,period]);
 const weeks=React.useMemo(()=>{
  const grouped=new Map<string,number>();
  filtered.forEach(e=>{const key=weekOf(e.completed);grouped.set(key,(grouped.get(key)||0)+1)});
  return [...grouped].sort(([a],[b])=>a.localeCompare(b)).map(([week,count])=>({week,count}));
 },[filtered]);
 const blocked=filtered.filter(e=>e.blocked).length;
 const download=()=>{
  const rows=[['id','squad','completed','cycle_days','lead_days','blocked'],...filtered.map(e=>[e.id,e.squad,e.completed,e.cycleDays,e.leadDays,e.blocked])];
  const csv=rows.map(row=>row.join(',')).join('\n');
  const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download='engineering-intelligence-demo.csv';link.click();URL.revokeObjectURL(url);
 };
 return <main className="layout">
  <header><strong>EI <span>Engineering Intelligence</span></strong><small>Interactive portfolio demo · v0.2</small></header>
  <section className="hero"><p className="eyebrow">ENGINEERING ANALYTICS</p><h1>Delivery performance, made visible.</h1><p>Explore trends and bottlenecks with reproducible synthetic delivery events.</p><span className="source">{apiStatus}</span></section>
  <section className="filters" aria-label="Dashboard filters">
   <label>Squad<select value={squad} onChange={e=>setSquad(e.target.value)}><option>All squads</option>{squads.map(s=><option key={s}>{s}</option>)}</select></label>
   <label>Reporting period<select value={period} onChange={e=>setPeriod(e.target.value)}><option value="7">Last 7 days</option><option value="14">Last 14 days</option><option value="30">Last 30 days</option><option value="60">Last 60 days</option></select></label>
   <button type="button" onClick={download}>Export CSV</button>
  </section>
  <section className="cards" aria-label="Delivery indicators">
   <article><label>Completed items</label><strong>{filtered.length}</strong><small>Throughput in selected period</small></article>
   <article><label>Average cycle time</label><strong>{average(filtered.map(e=>e.cycleDays))} <span>days</span></strong><small>Start to completion</small></article>
   <article><label>Average lead time</label><strong>{average(filtered.map(e=>e.leadDays))} <span>days</span></strong><small>Request to completion</small></article>
   <article><label>Blocked items</label><strong>{blocked}</strong><small>{filtered.length?(blocked/filtered.length*100).toFixed(1):'0'}% of completed items</small></article>
  </section>
  <section className="panel"><p className="eyebrow">DELIVERY FLOW</p><h2>Weekly throughput</h2><p>Completed work items grouped by week starting Monday. Filters update every indicator.</p>
   <div className="chart" role="img" aria-label="Weekly throughput bar chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={weeks}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="week" tickFormatter={v=>v.slice(5)}/><YAxis allowDecimals={false}/><Tooltip/><Bar dataKey="count" fill="#3265d9" radius={[6,6,0,0]} name="Completed items"/></BarChart></ResponsiveContainer></div>
  </section>
  <footer>All records are synthetic. This is not a measure of individual productivity. DORA metrics, authentication, persistence and live integrations are planned, not yet implemented.</footer>
 </main>;
}
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
