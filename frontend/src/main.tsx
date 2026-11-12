import React from 'react';
import ReactDOM from 'react-dom/client';
import {BarChart,Bar,CartesianGrid,ResponsiveContainer,Tooltip,XAxis,YAxis} from 'recharts';
import './styles.css';
type Week={week:string;count:number};
type Metrics={completed_items:number;average_cycle_time_days:number;weekly_throughput:Week[]};
const preview:Metrics={completed_items:24,average_cycle_time_days:4.5,weekly_throughput:[{week:'2026-10-11',count:3},{week:'2026-10-18',count:7},{week:'2026-10-25',count:7},{week:'2026-11-01',count:7}]};
function App(){
 const [metrics,setMetrics]=React.useState<Metrics>(preview);
 const [source,setSource]=React.useState('Preview data · synthetic');
 React.useEffect(()=>{
  const url=import.meta.env.VITE_API_URL as string|undefined;
  if(!url)return;
  fetch(url.replace(/\/$/,'')+'/api/v1/metrics').then(r=>{if(!r.ok)throw Error('API unavailable');return r.json()}).then((d:Metrics)=>{setMetrics(d);setSource('API connected · synthetic')}).catch(()=>setSource('Preview data · API unavailable'));
 },[]);
 return <main className="layout">
  <header><strong>EI <span>Engineering Intelligence</span></strong><small>Portfolio demonstration</small></header>
  <section className="hero"><p className="eyebrow">ENGINEERING ANALYTICS</p><h1>Delivery performance, made visible.</h1><p>Explore process indicators using safe, reproducible synthetic data.</p><span className="source">{source}</span></section>
  <section className="cards" aria-label="Delivery indicators">
   <article><label>Completed items</label><strong>{metrics.completed_items}</strong><small>Reporting period</small></article>
   <article><label>Average cycle time</label><strong>{metrics.average_cycle_time_days} days</strong><small>Start to completion</small></article>
   <article><label>Data source</label><strong>Synthetic</strong><small>No real team data</small></article>
  </section>
  <section className="panel"><p className="eyebrow">DELIVERY FLOW</p><h2>Weekly throughput</h2><p>Number of completed work items per reporting week.</p><div className="chart" role="img" aria-label="Weekly throughput bar chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={[...metrics.weekly_throughput].reverse()}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="week" tickFormatter={v=>v.slice(5)}/><YAxis allowDecimals={false}/><Tooltip/><Bar dataKey="count" fill="#3265d9" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div></section>
  <footer>Delivery indicators do not measure individual productivity. DORA metrics are not implemented yet.</footer>
 </main>;
}
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);