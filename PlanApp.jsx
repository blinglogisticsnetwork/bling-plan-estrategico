import { useState, useEffect } from "react";

const LOGO_B64='data:image/png;base64,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'
const A="#F59E0B",DARK="#0A0F1E",CARD="#111827",CARD2="#1A2235",BORDER="#2D3748",TEXT="#E2E8F0",MUTED="#64748B",GREEN="#10B981",BLUE="#3B82F6",RED="#EF4444";

// ── SHARED UI ──────────────────────────────────────────────
function Bar({pct,h=6}){return <div style={{width:"100%",height:h,background:"#1e3a5f",borderRadius:4}}><div style={{width:`${pct}%`,height:"100%",background:pct===100?GREEN:A,borderRadius:4,transition:"width 0.4s"}}/></div>;}

function TA({value,onChange,placeholder,rows=3}){
  const[fo,setFo]=useState(false);
  return <textarea rows={rows} value={value||""} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
    style={{width:"100%",background:"#0D1526",border:`1px solid ${fo?A:BORDER}`,borderRadius:6,color:TEXT,padding:"10px 12px",fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box",lineHeight:1.6,resize:"vertical",transition:"border-color 0.2s"}}
    onFocus={()=>setFo(true)} onBlur={()=>setFo(false)}/>;
}

function TI({value,onChange,placeholder}){
  const[fo,setFo]=useState(false);
  return <input type="text" value={value||""} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
    style={{width:"100%",background:"#0D1526",border:`1px solid ${fo?A:BORDER}`,borderRadius:6,color:TEXT,padding:"10px 12px",fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box",transition:"border-color 0.2s"}}
    onFocus={()=>setFo(true)} onBlur={()=>setFo(false)}/>;
}

function NI({value,onChange,placeholder="0",prefix="$"}){
  const[fo,setFo]=useState(false);
  return <div style={{display:"flex",alignItems:"center",background:"#0D1526",border:`1px solid ${fo?A:BORDER}`,borderRadius:6,overflow:"hidden"}}>
    <span style={{padding:"8px 8px",color:MUTED,fontSize:12,borderRight:`1px solid ${BORDER}`}}>{prefix}</span>
    <input type="number" value={value||""} onChange={e=>onChange(Number(e.target.value))} placeholder={placeholder}
      style={{flex:1,background:"transparent",border:"none",color:TEXT,padding:"8px 10px",fontSize:13,outline:"none",fontFamily:"inherit"}}
      onFocus={()=>setFo(true)} onBlur={()=>setFo(false)}/>
  </div>;
}

function SEL({value,onChange}){
  return <select value={value||""} onChange={e=>onChange(e.target.value)}
    style={{background:"#0D1526",border:`1px solid ${BORDER}`,borderRadius:6,color:value?TEXT:MUTED,padding:"8px 12px",fontSize:13,fontFamily:"inherit",outline:"none",cursor:"pointer"}}>
    <option value="">Nivel...</option>
    <option value="Alto">🔴 Alto</option>
    <option value="Moderado">🟡 Moderado</option>
    <option value="Bajo">🟢 Bajo</option>
  </select>;
}

function DL({items,onChange,placeholder,useTA=false,add="+ Agregar"}){
  const upd=(i,v)=>onChange(items.map((x,j)=>j===i?v:x));
  const rem=(i)=>onChange(items.filter((_,j)=>j!==i));
  return <div style={{display:"flex",flexDirection:"column",gap:8}}>
    {items.map((it,i)=>(
      <div key={i} style={{display:"flex",gap:6,alignItems:"flex-start"}}>
        <div style={{flex:1}}>{useTA?<TA value={it} onChange={v=>upd(i,v)} placeholder={`${placeholder} ${i+1}...`} rows={2}/>:<TI value={it} onChange={v=>upd(i,v)} placeholder={`${placeholder} ${i+1}...`}/>}</div>
        {items.length>1&&<button onClick={()=>rem(i)} style={{background:"transparent",border:`1px solid ${BORDER}`,color:MUTED,borderRadius:6,padding:"8px 9px",cursor:"pointer",fontSize:11,flexShrink:0}}
          onMouseEnter={e=>{e.target.style.borderColor=RED;e.target.style.color=RED;}} onMouseLeave={e=>{e.target.style.borderColor=BORDER;e.target.style.color=MUTED;}}>✕</button>}
      </div>
    ))}
    <button onClick={()=>onChange([...items,""])} style={{background:"transparent",border:`1px dashed ${A}`,color:A,borderRadius:6,padding:"7px 12px",cursor:"pointer",fontSize:12,fontFamily:"inherit",alignSelf:"flex-start"}}
      onMouseEnter={e=>e.target.style.background=`${A}15`} onMouseLeave={e=>e.target.style.background="transparent"}>{add}</button>
  </div>;
}

function SC({title,color,children}){return <div style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:20,marginBottom:14}}><h3 style={{margin:"0 0 14px",color:color||A,fontSize:14}}>{title}</h3>{children}</div>;}
function LB({text}){return <label style={{display:"block",fontSize:11,color:MUTED,marginBottom:5,fontFamily:"monospace",letterSpacing:1}}>{text.toUpperCase()}</label>;}

// ── CHARTS ────────────────────────────────────────────────
function LineChart({pts,color=A,height=80}){
  if(!pts||!pts.some(p=>p.y>0)) return <div style={{height,display:"flex",alignItems:"center",justifyContent:"center",color:MUTED,fontSize:12}}>Ingresa datos para ver el gráfico</div>;
  const max=Math.max(...pts.map(p=>p.y)),min=Math.min(...pts.map(p=>p.y)),range=max-min||1,w=100/(pts.length-1);
  const points=pts.map((p,i)=>`${i*w},${height-((p.y-min)/range)*(height-10)-5}`).join(" ");
  return <div><svg width="100%" height={height} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
    <polyline fill="none" stroke={color} strokeWidth="2" points={points} vectorEffect="non-scaling-stroke"/>
    {pts.map((p,i)=><circle key={i} cx={i*w} cy={height-((p.y-min)/range)*(height-10)-5} r="2" fill={color} vectorEffect="non-scaling-stroke"/>)}
  </svg><div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>{pts.map((p,i)=><span key={i} style={{fontSize:9,color:MUTED}}>{p.x}</span>)}</div></div>;
}

function BarChart({gastos,ingresos,labels,height=110}){
  if(!gastos?.some(v=>v>0)) return <div style={{height,display:"flex",alignItems:"center",justifyContent:"center",color:MUTED,fontSize:12}}>Ingresa datos para ver el gráfico</div>;
  const max=Math.max(...gastos,...ingresos)||1;
  return <div>
    <div style={{display:"flex",alignItems:"flex-end",gap:4,height}}>
      {gastos.map((g,i)=><div key={i} style={{flex:1,display:"flex",gap:2,alignItems:"flex-end",justifyContent:"center",height:"100%",paddingTop:20}}>
        <div style={{flex:1,background:BLUE,borderRadius:"2px 2px 0 0",height:`${(g/max)*(height-20)}px`}}/>
        <div style={{flex:1,background:GREEN,borderRadius:"2px 2px 0 0",height:`${((ingresos[i]||0)/max)*(height-20)}px`}}/>
      </div>)}
    </div>
    <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>{labels?.map((l,i)=><span key={i} style={{fontSize:9,color:MUTED,flex:1,textAlign:"center"}}>{l}</span>)}</div>
    <div style={{display:"flex",gap:12,marginTop:6}}>
      <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,background:BLUE,borderRadius:2}}/><span style={{fontSize:10,color:MUTED}}>Gastos</span></div>
      <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,background:GREEN,borderRadius:2}}/><span style={{fontSize:10,color:MUTED}}>Ingresos</span></div>
    </div>
  </div>;
}

// ── PROGRESS ──────────────────────────────────────────────
const MARCOS_TABS=[{id:"estrategia",label:"Estrategia"},{id:"swot",label:"Análisis SWOT"},{id:"pestel",label:"Análisis PESTEL"},{id:"porter",label:"Cinco Fuerzas de Porter"},{id:"catwoe",label:"Análisis CATWOE"},{id:"idea",label:"Idea Revolucionaria"}];
const CTX_SECS=[
  {id:"acerca",title:"Acerca de Bling",icon:"🏢",color:A,fields:[{id:"mision",label:"Misión",ph:"¿Por qué existe Bling?"},{id:"vision",label:"Visión",ph:"¿Dónde quiere estar Bling?"},{id:"valores",label:"Valores",ph:"Confianza, colaboración..."},{id:"desc",label:"Descripción",ph:"Modelo de negocio..."}]},
  {id:"industria",title:"Perspectiva de la Industria",icon:"🌐",color:BLUE,fields:[{id:"global",label:"Contexto Global",ph:"Tamaño del mercado..."},{id:"dolor",label:"Dolores",ph:"Fragmentación, desconfianza..."},{id:"oport",label:"Oportunidad",ph:"¿Qué brecha aprovecha Bling?"},{id:"tend",label:"Tendencias",ph:"IA, blockchain..."}]},
  {id:"why",title:"Why Bling",icon:"💡",color:GREEN,fields:[{id:"ahora",label:"¿Por qué ahora?",ph:"Momento ideal..."},{id:"nosotros",label:"¿Por qué Bling?",ph:"Ventaja única..."},{id:"diff",label:"Diferencial Humano",ph:"Confianza, comunidad..."},{id:"impacto",label:"Impacto",ph:"¿Qué cambia si Bling tiene éxito?"}]},
];

function ctxPct(d){let t=0,f=0;CTX_SECS.forEach(s=>s.fields.forEach(fi=>{t++;if((d[`ctx_${s.id}_${fi.id}`]||"").trim())f++;}));return t?Math.round(f/t*100):0;}
function mrkPct(tab,d){const l=d[`mrk_${tab}_lists`]||{},tx=d[`mrk_${tab}_texts`]||{};let t=0,f=0;Object.values(l).forEach(a=>a.forEach(v=>{t++;if(v.trim())f++;}));Object.values(tx).forEach(v=>{t++;if((v||"").trim())f++;});return t?Math.round(f/t*100):0;}
import {Dashboard,Contexto,Marcos,Finanzas} from './PlanCore.jsx'
import {GTM,Competitivo,PVS,MVP,Cliente,BSC} from './PlanExtra.jsx'
export default function PlanApp(){
  const[active,setActive]=useState("dashboard");
  const[data,setData]=useState({});
  const[saved,setSaved]=useState(false);
  const[loading,setLoading]=useState(true);
  const[menuOpen,setMenuOpen]=useState(false);
  const[isMobile,setIsMobile]=useState(window.innerWidth<=768);
  const timer=React.useRef(null);

  useEffect(()=>{
    const onResize=()=>setIsMobile(window.innerWidth<=768);
    window.addEventListener('resize',onResize);
    return()=>window.removeEventListener('resize',onResize);
  },[]);

  useEffect(()=>{(async()=>{try{const r=await window.storage.get("bling_v4");if(r?.value)setData(JSON.parse(r.value));}catch(_){}setLoading(false);})();},[]);

  const save=async(d)=>{try{await window.storage.set("bling_v4",JSON.stringify(d));setSaved(true);setTimeout(()=>setSaved(false),2000);}catch(_){}};
  const handleChange=(k,v)=>{const d={...data,[k]:v};setData(d);if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>save(d),2000);};
  const handleSave=()=>{if(timer.current)clearTimeout(timer.current);save(data);};

  if(loading)return <div style={{background:DARK,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:A,fontFamily:"monospace"}}>Cargando...</div>;

  const prog=totalPct(data);
  const wide=active==="gtm"||active==="finanzas";
  const navTo=(id)=>{setActive(id);setMenuOpen(false);};

  return <div style={{background:DARK,minHeight:"100vh",display:"flex",flexDirection:"column",fontFamily:"'Segoe UI',sans-serif",color:TEXT}}>

    {/* TOPBAR */}
    <div style={{background:CARD,borderBottom:`1px solid ${BORDER}`,padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,zIndex:99,position:"relative"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {isMobile&&<button onClick={()=>setMenuOpen(!menuOpen)} style={{background:"transparent",border:`1px solid ${BORDER}`,color:TEXT,borderRadius:6,padding:"6px 10px",cursor:"pointer",fontSize:18,lineHeight:1,marginRight:4}}>☰</button>}
        <img src={LOGO_B64} alt="Bling" style={{height:32,objectFit:"contain"}}/>
        {!isMobile&&<div><div style={{fontSize:13,fontWeight:"bold",color:TEXT}}>Bling Logistics Network</div><div style={{fontSize:10,color:MUTED,fontFamily:"monospace",letterSpacing:1}}>PLAN ESTRATÉGICO 2026</div></div>}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        {!isMobile&&<div style={{display:"flex",alignItems:"center",gap:6}}>
          <div style={{width:80,height:5,background:"#1e3a5f",borderRadius:3}}><div style={{width:`${prog}%`,height:"100%",background:prog===100?GREEN:A,borderRadius:3,transition:"width 0.4s"}}/></div>
          <span style={{fontSize:12,color:A,fontFamily:"monospace"}}>{prog}%</span>
        </div>}
        {isMobile&&<span style={{fontSize:12,color:A,fontFamily:"monospace",fontWeight:"bold"}}>{prog}%</span>}
        <button onClick={handleSave} style={{background:saved?GREEN:A,color:DARK,border:"none",borderRadius:6,padding:"7px 12px",fontWeight:"bold",cursor:"pointer",fontSize:12,fontFamily:"monospace",transition:"background 0.3s",whiteSpace:"nowrap"}}>
          {saved?"✓ GUARDADO":isMobile?"💾":"💾 GUARDAR"}
        </button>
        {!isMobile&&window.__user&&<span style={{fontSize:11,color:MUTED,fontFamily:"monospace"}}>{window.__user}</span>}
        <button onClick={()=>window.__logout&&window.__logout()} style={{background:"transparent",border:`1px solid ${BORDER}`,color:MUTED,borderRadius:6,padding:"7px 10px",cursor:"pointer",fontSize:11,fontFamily:"monospace"}}
          onMouseEnter={e=>{e.target.style.borderColor="#EF4444";e.target.style.color="#EF4444"}} onMouseLeave={e=>{e.target.style.borderColor=BORDER;e.target.style.color=MUTED}}>
          Salir
        </button>
      </div>
    </div>

    {/* OVERLAY mobile */}
    {isMobile&&menuOpen&&<div onClick={()=>setMenuOpen(false)} style={{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",background:"rgba(0,0,0,0.6)",zIndex:99}}/>}

    <div style={{display:"flex",flex:1,overflow:"hidden"}}>
      {/* SIDEBAR */}
      {(!isMobile||menuOpen)&&<div style={{
        width:isMobile?Math.min(280,window.innerWidth*0.8):210,
        background:"#0D1526",borderRight:`1px solid ${BORDER}`,overflowY:"auto",flexShrink:0,padding:"8px 0",
        ...(isMobile?{position:"fixed",top:0,left:0,height:"100vh",zIndex:100,boxShadow:"4px 0 20px rgba(0,0,0,0.5)"}:{})
      }}>
        {isMobile&&<div style={{padding:"16px 14px",borderBottom:`1px solid ${BORDER}`,marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:24,height:24,background:A,borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",color:DARK,fontSize:13}}>B</div>
            <span style={{fontSize:13,fontWeight:"bold",color:TEXT}}>Bling Logistics</span>
          </div>
          <button onClick={()=>setMenuOpen(false)} style={{background:"transparent",border:"none",color:MUTED,cursor:"pointer",fontSize:20}}>✕</button>
        </div>}
        {NAV.map(sec=><div key={sec.sec} style={{marginBottom:4}}>
          <div style={{fontSize:10,color:MUTED,fontFamily:"monospace",letterSpacing:1.5,padding:"10px 14px 5px",textTransform:"uppercase"}}>{sec.sec}</div>
          {sec.items.map(item=>{const on=active===item.id;return(
            <div key={item.id} onClick={()=>!item.dis&&navTo(item.id)} style={{padding:"11px 14px",display:"flex",alignItems:"center",gap:8,cursor:item.dis?"default":"pointer",background:on?`${A}15`:"transparent",borderLeft:on?`3px solid ${A}`:"3px solid transparent",opacity:item.dis?0.3:1,transition:"all 0.15s"}}>
              <span style={{fontSize:15}}>{item.ic}</span>
              <span style={{fontSize:13,color:on?A:TEXT}}>{item.label}</span>
            </div>
          );})}
        </div>)}
      </div>}

      {/* MAIN */}
      <div style={{flex:1,overflowY:"auto",padding:isMobile?"16px 14px":"24px 30px"}}>
        <div style={{maxWidth:wide?1060:840}}>
          {active==="dashboard"&&<Dashboard data={data} go={navTo}/>}
          {active==="contexto"&&<Contexto data={data} set={handleChange}/>}
          {active==="marcos"&&<Marcos data={data} set={handleChange}/>}
          {active==="finanzas"&&<Finanzas data={data} set={handleChange}/>}
          {active==="gtm"&&<GTM data={data} set={handleChange}/>}
          {active==="competitivo"&&<Competitivo data={data} set={handleChange}/>}
          {active==="pvs"&&<PVS data={data} set={handleChange}/>}
          {active==="mvp"&&<MVP data={data} set={handleChange}/>}
          {active==="cliente"&&<Cliente data={data} set={handleChange}/>}
          {active==="bsc"&&<BSC/>}
          {active==="reportes"&&<div style={{textAlign:"center",padding:"40px 20px"}}>
            <div style={{fontSize:48,marginBottom:16}}>📄</div>
            <h2 style={{color:A,marginBottom:10,fontSize:22}}>Reportes y Documentos</h2>
            <p style={{color:MUTED,fontSize:14,marginBottom:28,maxWidth:400,margin:"0 auto 28px"}}>Genera reportes profesionales y exporta tu plan estratégico completo en PDF.</p>
            <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
              <a href="#report" style={{textDecoration:"none"}}>
                <div style={{background:CARD2,border:`2px solid ${A}`,borderRadius:12,padding:"20px 28px",cursor:"pointer",minWidth:180}}>
                  <div style={{fontSize:28,marginBottom:8}}>📋</div>
                  <div style={{fontSize:14,fontWeight:"bold",color:TEXT,marginBottom:4}}>Ver Reporte</div>
                  <div style={{fontSize:12,color:MUTED}}>Vista de lectura + exportar PDF</div>
                </div>
              </a>
            </div>
          </div>}
        </div>
      </div>
    </div>
  </div>;
}
