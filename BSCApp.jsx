import { useState, useEffect } from "react";
const A="#F59E0B",DARK="#0A0F1E",CARD="#111827",CARD2="#1A2235",BORDER="#2D3748",TEXT="#E2E8F0",MUTED="#64748B",GREEN="#10B981",BLUE="#3B82F6",RED="#EF4444",PURPLE="#A855F7";
const PERSP=[{id:"fin",label:"Financiera",icon:"💰",color:GREEN},{id:"cli",label:"Clientes",icon:"👥",color:BLUE},{id:"pro",label:"Procesos Internos",icon:"⚙️",color:A},{id:"apr",label:"Crecimiento y Aprendizaje",icon:"🌱",color:PURPLE}];
const FREQS=["Mensual","Bimensual","Trimestral","Cuatrimestral","Semestral","Anual"];
const UNITS=["$","%","#","Días","Horas","Puntos","Ratio","Otro"];
const KPI0=()=>({nombre:"",objetivo:"",perspectiva:"fin",responsable:"",frecuencia:"Mensual",unidad:"%",linea_base:"",meta:"",formula:"",polaridad:"up",peso:10,umbral_amarillo:"",umbral_rojo:"",periodos:[{label:"",valor:""}],notas:"",acciones:"",chart_type:"line"});

// helpers
const semCol=(v,m,r,a,pol)=>{if(!v||!m)return MUTED;const vn=+v,mn=+m,rn=+r,an=+a;if(pol==="up"){if(vn>=mn)return GREEN;if(rn&&vn<=rn)return RED;if(an&&vn<=an)return A;return GREEN;}else{if(vn<=mn)return GREEN;if(rn&&vn>=rn)return RED;if(an&&vn>=an)return A;return GREEN;}};
const semLbl=(c)=>c===GREEN?"🟢 En meta":c===A?"🟡 En riesgo":c===RED?"🔴 Crítico":"⚪ Sin datos";
const trend=(ps)=>{const vs=(ps||[]).filter(p=>p.valor!=="").map(p=>+p.valor);if(vs.length<2)return"→";return vs[vs.length-1]>vs[vs.length-2]?"↑":vs[vs.length-1]<vs[vs.length-2]?"↓":"→";};
const kpiCol=(k)=>{const a=(k.periodos||[]).filter(p=>p.valor!=="").slice(-1)[0]?.valor||"";return semCol(a,k.meta,k.umbral_rojo,k.umbral_amarillo,k.polaridad);};

// UI atoms
function Bar({pct,color=A,h=5}){return <div style={{width:"100%",height:h,background:"#1e3a5f",borderRadius:3}}><div style={{width:`${pct}%`,height:"100%",background:pct===100?GREEN:color,borderRadius:3,transition:"width 0.4s"}}/></div>;}
function LB({t}){return <div style={{fontSize:10,color:MUTED,marginBottom:4,fontFamily:"monospace",letterSpacing:1}}>{t.toUpperCase()}</div>;}
function TI({v,ch,ph,style={}}){const[f,sf]=useState(false);return <input type="text" value={v||""} onChange={e=>ch(e.target.value)} placeholder={ph} style={{width:"100%",background:"#0D1526",border:`1px solid ${f?A:BORDER}`,borderRadius:5,color:TEXT,padding:"8px 10px",fontSize:12,outline:"none",boxSizing:"border-box",fontFamily:"inherit",transition:"border-color 0.2s",...style}} onFocus={()=>sf(true)} onBlur={()=>sf(false)}/>;}
function TA({v,ch,ph,rows=3}){const[f,sf]=useState(false);return <textarea rows={rows} value={v||""} onChange={e=>ch(e.target.value)} placeholder={ph} style={{width:"100%",background:"#0D1526",border:`1px solid ${f?A:BORDER}`,borderRadius:5,color:TEXT,padding:"8px 10px",fontSize:12,outline:"none",boxSizing:"border-box",fontFamily:"inherit",resize:"vertical",lineHeight:1.5,transition:"border-color 0.2s"}} onFocus={()=>sf(true)} onBlur={()=>sf(false)}/>;}
function SEL({v,ch,opts}){return <select value={v||""} onChange={e=>ch(e.target.value)} style={{width:"100%",background:"#0D1526",border:`1px solid ${BORDER}`,borderRadius:5,color:TEXT,padding:"8px 8px",fontSize:12,outline:"none",cursor:"pointer",fontFamily:"inherit"}}>{opts.map(o=>typeof o==="string"?<option key={o}>{o}</option>:<option key={o.v} value={o.v}>{o.l}</option>)}</select>;}

// Line chart
function MiniChart({periodos,color}){
  const pts=(periodos||[]).filter(p=>p.valor!=="").map(p=>+p.valor);
  if(pts.length<2)return <div style={{height:44,display:"flex",alignItems:"center",justifyContent:"center",color:MUTED,fontSize:10}}>Ingresa al menos 2 períodos</div>;
  const mx=Math.max(...pts),mn=Math.min(...pts),rng=mx-mn||1,h=44,w=100/(pts.length-1);
  const points=pts.map((v,i)=>`${i*w},${h-((v-mn)/rng)*(h-8)-4}`).join(" ");
  return <svg width="100%" height={h} viewBox={`0 0 100 ${h}`} preserveAspectRatio="none">
    <polyline fill="none" stroke={color} strokeWidth="2" points={points} vectorEffect="non-scaling-stroke"/>
    {pts.map((v,i)=><circle key={i} cx={i*w} cy={h-((v-mn)/rng)*(h-8)-4} r="1.8" fill={color} vectorEffect="non-scaling-stroke"/>)}
  </svg>;
}

// Bar chart
function BarChart({periodos,color}){
  const pts=(periodos||[]).filter(p=>p.valor!=="");
  if(!pts.length)return <div style={{height:60,display:"flex",alignItems:"center",justifyContent:"center",color:MUTED,fontSize:10}}>Sin datos</div>;
  const max=Math.max(...pts.map(p=>+p.valor))||1;
  const h=60;
  return <div>
    <div style={{display:"flex",alignItems:"flex-end",gap:4,height:h}}>
      {pts.map((p,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,height:"100%",justifyContent:"flex-end"}}>
        <div style={{width:"100%",background:color,borderRadius:"3px 3px 0 0",height:`${(+p.valor/max)*(h-16)}px`,transition:"height 0.4s"}}/>
      </div>)}
    </div>
    <div style={{display:"flex",gap:4,marginTop:4}}>
      {pts.map((p,i)=><div key={i} style={{flex:1,fontSize:8,color:MUTED,textAlign:"center",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.label||i+1}</div>)}
    </div>
  </div>;
}

// Donut chart
function DonutChart({actual,meta,color}){
  if(!actual||!meta)return <div style={{height:80,display:"flex",alignItems:"center",justifyContent:"center",color:MUTED,fontSize:10}}>Sin datos suficientes</div>;
  const pct=Math.min(100,Math.round(+actual/+meta*100));
  const r=28,cx=40,cy=40,circ=2*Math.PI*r;
  const dash=circ*(pct/100);
  return <div style={{display:"flex",alignItems:"center",gap:14}}>
    <svg width="80" height="80" viewBox="0 0 80 80">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e3a5f" strokeWidth="8"/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`} style={{transition:"stroke-dasharray 0.5s"}}/>
      <text x={cx} y={cy+1} textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="12" fontWeight="bold">{pct}%</text>
    </svg>
    <div>
      <div style={{fontSize:11,color:MUTED,marginBottom:3}}>Logrado vs Meta</div>
      <div style={{fontSize:13,fontWeight:"bold",color:TEXT}}>{actual} / {meta}</div>
    </div>
  </div>;
}

// KPI Card (collapsible)
function KCard({kpi,idx,pc,upd,rem}){
  const[open,setOpen]=useState(false);
  const u=(k,v)=>upd({...kpi,[k]:v});
  const actual=(kpi.periodos||[]).filter(p=>p.valor!=="").slice(-1)[0]?.valor||"";
  const col=kpiCol(kpi);
  const tr=trend(kpi.periodos);
  const brecha=actual&&kpi.meta?(+kpi.meta - +actual).toFixed(2):"—";
  const addPer=()=>u("periodos",[...(kpi.periodos||[]),{label:"",valor:""}]);
  const remPer=(i)=>u("periodos",(kpi.periodos||[]).filter((_,j)=>j!==i));
  const updPer=(i,k,v)=>{const ps=[...(kpi.periodos||[])];ps[i]={...ps[i],[k]:v};u("periodos",ps);};

  return <div style={{background:CARD2,border:`2px solid ${col}44`,borderRadius:10,marginBottom:10,overflow:"hidden"}}>
    {/* Header */}
    <div onClick={()=>setOpen(!open)} style={{padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,background:`${col}08`}}>
      <div style={{width:9,height:9,borderRadius:"50%",background:col,flexShrink:0}}/>
      <div style={{flex:1}}>
        <div style={{fontSize:13,fontWeight:"bold",color:TEXT}}>{kpi.nombre||`KPI ${idx+1}`}</div>
        <div style={{fontSize:10,color:MUTED,marginTop:1}}>{PERSP.find(p=>p.id===kpi.perspectiva)?.label||""} · {kpi.frecuencia} · <span style={{color:col}}>{semLbl(col)}</span></div>
      </div>
      {actual&&<div style={{textAlign:"right",flexShrink:0,marginRight:8}}>
        <div style={{fontSize:16,fontWeight:"bold",color:col}}>{actual}{kpi.unidad==="%" ?"%":kpi.unidad==="$"?"":""}</div>
        <div style={{fontSize:10,color:MUTED}}>Meta:{kpi.meta} Tend:<span style={{color:tr==="↑"?GREEN:tr==="↓"?RED:A}}>{tr}</span></div>
      </div>}
      <span style={{color:MUTED,fontSize:11}}>{open?"▲":"▼"}</span>
    </div>

    {open&&<div style={{padding:16,borderTop:`1px solid ${BORDER}`}}>
      <div style={{display:"flex",justifyContent:"flex-end",marginBottom:10}}>
        <button onClick={rem} style={{background:"transparent",border:`1px solid ${BORDER}`,color:MUTED,borderRadius:5,padding:"4px 10px",cursor:"pointer",fontSize:11}}
          onMouseEnter={e=>{e.target.style.color=RED;e.target.style.borderColor=RED;}} onMouseLeave={e=>{e.target.style.color=MUTED;e.target.style.borderColor=BORDER;}}>✕ Eliminar</button>
      </div>

      {/* Row 1 */}
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:8,marginBottom:8}}>
        <div><LB t="Nombre del Indicador"/><TI v={kpi.nombre} ch={v=>u("nombre",v)} ph="Ej: Tasa de Retención de Miembros"/></div>
        <div><LB t="Perspectiva"/><SEL v={kpi.perspectiva} ch={v=>u("perspectiva",v)} opts={PERSP.map(p=>({v:p.id,l:`${p.icon} ${p.label}`}))}/></div>
        <div><LB t="Responsable"/><TI v={kpi.responsable} ch={v=>u("responsable",v)} ph="Nombre o cargo"/></div>
        <div><LB t="Frecuencia"/><SEL v={kpi.frecuencia} ch={v=>u("frecuencia",v)} opts={FREQS}/></div>
      </div>

      {/* Row 2 */}
      <div style={{display:"grid",gridTemplateColumns:"3fr 1fr 1fr 1fr 1fr",gap:8,marginBottom:8}}>
        <div><LB t="Objetivo Vinculado"/><TI v={kpi.objetivo} ch={v=>u("objetivo",v)} ph="Ej: Incrementar retención de miembros activos"/></div>
        <div><LB t="Unidad"/><SEL v={kpi.unidad} ch={v=>u("unidad",v)} opts={UNITS}/></div>
        <div><LB t="Polaridad"/><SEL v={kpi.polaridad} ch={v=>u("polaridad",v)} opts={[{v:"up",l:"↑ Más = mejor"},{v:"down",l:"↓ Menos = mejor"}]}/></div>
        <div><LB t="Peso %"/><input type="number" min="0" max="100" value={kpi.peso||10} onChange={e=>u("peso",+e.target.value)} style={{width:"100%",background:"#0D1526",border:`1px solid ${BORDER}`,borderRadius:5,color:TEXT,padding:"8px 8px",fontSize:12,outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/></div>
        <div><LB t="Línea Base"/><TI v={kpi.linea_base} ch={v=>u("linea_base",v)} ph="Valor inicial"/></div>
      </div>

      {/* Row 3 */}
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:8,marginBottom:12}}>
        <div><LB t="Fórmula / Método de Cálculo"/><TI v={kpi.formula} ch={v=>u("formula",v)} ph="Ej: (Miembros activos / Total) × 100"/></div>
        <div><LB t="Meta"/><TI v={kpi.meta} ch={v=>u("meta",v)} ph="Ej: 85"/></div>
        <div><LB t="Umbral 🟡"/><TI v={kpi.umbral_amarillo} ch={v=>u("umbral_amarillo",v)} ph="Ej: 70"/></div>
        <div><LB t="Umbral 🔴"/><TI v={kpi.umbral_rojo} ch={v=>u("umbral_rojo",v)} ph="Ej: 60"/></div>
      </div>

      {/* Períodos */}
      <div style={{background:"#0D1526",borderRadius:8,padding:12,marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <LB t="Resultados por Período"/>
          <button onClick={addPer} style={{background:"transparent",border:`1px dashed ${A}`,color:A,borderRadius:4,padding:"3px 8px",cursor:"pointer",fontSize:10,fontFamily:"inherit"}}>+ Período</button>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
          {(kpi.periodos||[]).map((p,pi)=>{
            const pCol=semCol(p.valor,kpi.meta,kpi.umbral_rojo,kpi.umbral_amarillo,kpi.polaridad);
            const pPct=p.valor&&kpi.meta?Math.round(+p.valor/+kpi.meta*100):null;
            const pEmoji=pCol===GREEN?"🟢":pCol===A?"🟡":pCol===RED?"🔴":"⚪";
            return <div key={pi} style={{display:"flex",flexDirection:"column",gap:3,minWidth:72,alignItems:"center",background:`${pCol}11`,borderRadius:8,padding:"6px 4px",border:`1px solid ${p.valor?pCol+"44":BORDER}`}}>
              <input type="text" value={p.label} onChange={e=>updPer(pi,"label",e.target.value)} placeholder="Período"
                style={{background:"transparent",border:"none",borderBottom:`1px solid ${BORDER}`,color:MUTED,padding:"2px 4px",fontSize:10,outline:"none",textAlign:"center",width:"100%",boxSizing:"border-box",fontFamily:"inherit"}}/>
              <input type="number" value={p.valor} onChange={e=>updPer(pi,"valor",e.target.value)} placeholder="0"
                style={{background:"transparent",border:"none",color:TEXT,padding:"4px 4px",fontSize:13,outline:"none",textAlign:"center",width:"100%",boxSizing:"border-box",fontFamily:"inherit",fontWeight:"bold"}}/>
              {p.valor&&<>
                <span style={{fontSize:14}}>{pEmoji}</span>
                {pPct!==null&&<span style={{fontSize:9,color:pCol,fontWeight:"bold"}}>{pPct}%</span>}
              </>}
              {(kpi.periodos||[]).length>1&&<button onClick={()=>remPer(pi)} style={{background:"transparent",border:"none",color:MUTED,cursor:"pointer",fontSize:9,padding:0}}
                onMouseEnter={e=>e.target.style.color=RED} onMouseLeave={e=>e.target.style.color=MUTED}>✕</button>}
            </div>;
          })}
        </div>
        {(kpi.periodos||[]).some(p=>p.valor!=="")&&<>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <LB t="Tipo de gráfico"/>
            <div style={{display:"flex",gap:6}}>
              {[{v:"line",l:"📈 Líneas"},{v:"bar",l:"📊 Barras"},{v:"donut",l:"🍩 Dona"}].map(ct=>(
                <button key={ct.v} onClick={()=>u("chart_type",ct.v)} style={{background:kpi.chart_type===ct.v?A:CARD2,color:kpi.chart_type===ct.v?DARK:TEXT,border:`1px solid ${kpi.chart_type===ct.v?A:BORDER}`,borderRadius:20,padding:"4px 10px",cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>{ct.l}</button>
              ))}
            </div>
          </div>
          {kpi.chart_type==="bar"?<BarChart periodos={kpi.periodos} color={col}/>:
           kpi.chart_type==="donut"?<DonutChart actual={actual} meta={kpi.meta} color={col}/>:
           <MiniChart periodos={kpi.periodos} color={col}/>}
          <div style={{display:"flex",flexWrap:"wrap",gap:14,marginTop:6,fontSize:11}}>
            <span style={{color:MUTED}}>Tendencia: <strong style={{color:tr==="↑"?GREEN:tr==="↓"?RED:A}}>{tr}</strong></span>
            <span style={{color:MUTED}}>Brecha vs meta: <strong style={{color:col}}>{brecha} {kpi.unidad}</strong></span>
            <span style={{color:MUTED}}>Estado: <strong style={{color:col}}>{semLbl(col)}</strong></span>
          </div>
        </>}
      </div>

      {/* Notas y acciones */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <div><LB t="Notas del Indicador"/><TA v={kpi.notas} ch={v=>u("notas",v)} ph="Observaciones, contexto..." rows={2}/></div>
        <div><LB t="Acciones Correctivas"/><TA v={kpi.acciones} ch={v=>u("acciones",v)} ph="¿Qué hacer si está en 🔴 o 🟡?" rows={2}/></div>
      </div>
    </div>}
  </div>;
}

// Main BSC App
export default function BSCApp(){
  const[tab,setTab]=useState("dash");
  const[kpis,setKpis]=useState([]);
  const[saved,setSaved]=useState(false);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{(async()=>{try{const r=await window.storage.get("bling_bsc");if(r?.value)setKpis(JSON.parse(r.value));}catch(_){}setLoading(false);})();},[]);
  const save=async()=>{try{await window.storage.set("bling_bsc",JSON.stringify(kpis));setSaved(true);setTimeout(()=>setSaved(false),2500);}catch(_){}};
  const addKpi=(pid)=>setKpis([...kpis,{...KPI0(),perspectiva:pid}]);
  const remKpi=(i)=>setKpis(kpis.filter((_,j)=>j!==i));
  const updKpi=(i,v)=>setKpis(kpis.map((k,j)=>j===i?v:k));
  const byP=(pid)=>kpis.filter(k=>k.perspectiva===pid);
  const pctOk=(pid)=>{const ks=byP(pid);return ks.length?Math.round(ks.filter(k=>kpiCol(k)===GREEN).length/ks.length*100):0;};
  const cnt=(c)=>kpis.filter(k=>kpiCol(k)===c).length;

  if(loading)return <div style={{background:DARK,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:A,fontFamily:"monospace"}}>Cargando BSC...</div>;

  const TABS=[{id:"dash",l:"📊 Dashboard"},{id:"fin",l:"💰 Financiera"},{id:"cli",l:"👥 Clientes"},{id:"pro",l:"⚙️ Procesos Internos"},{id:"apr",l:"🌱 Crecimiento y Aprendizaje"}];

  return <div style={{background:DARK,minHeight:"100vh",fontFamily:"'Segoe UI',sans-serif",color:TEXT}}>
    {/* TOP */}
    <div style={{background:CARD,borderBottom:`1px solid ${BORDER}`,padding:"10px 22px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:28,height:28,background:A,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",color:DARK,fontSize:13}}>B</div>
        <div>
          <div style={{fontSize:13,fontWeight:"bold"}}>Bling Logistics Network</div>
          <div style={{fontSize:10,color:MUTED,fontFamily:"monospace",letterSpacing:1}}>CUADRO DE MANDO INTEGRAL — BSC 2026</div>
        </div>
        <button onClick={()=>window.location.hash=""} style={{background:"transparent",border:`1px solid ${BORDER}`,color:MUTED,borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:11,fontFamily:"monospace"}}
          onMouseEnter={e=>e.target.style.color=A} onMouseLeave={e=>e.target.style.color=MUTED}>← Plan Estratégico</button>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{display:"flex",gap:8}}>
          {[{c:GREEN,n:cnt(GREEN)},{c:A,n:cnt(A)},{c:RED,n:cnt(RED)}].map(s=><div key={s.c} style={{background:`${s.c}22`,border:`1px solid ${s.c}55`,borderRadius:20,padding:"3px 10px",fontSize:11,color:s.c,fontWeight:"bold"}}>{s.n} {s.c===GREEN?"🟢":s.c===A?"🟡":"🔴"}</div>)}
        </div>
        <button onClick={save} style={{background:saved?GREEN:A,color:DARK,border:"none",borderRadius:6,padding:"7px 14px",fontWeight:"bold",cursor:"pointer",fontSize:12,fontFamily:"monospace",transition:"background 0.3s"}}>
          {saved?"✓ GUARDADO":"💾 GUARDAR"}
        </button>
      </div>
    </div>

    <div style={{padding:"22px 28px"}}>
      {/* TABS */}
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
        {TABS.map(t=>{const on=t.id===tab;return <button key={t.id} onClick={()=>setTab(t.id)} style={{background:on?A:CARD2,color:on?DARK:TEXT,border:`1px solid ${on?A:BORDER}`,borderRadius:20,padding:"7px 16px",fontSize:12,cursor:"pointer",fontFamily:"inherit",fontWeight:on?"bold":"normal",transition:"all 0.2s"}}>{t.l}</button>;})}
      </div>

      {/* DASHBOARD */}
      {tab==="dash"&&<div>
        <h2 style={{color:A,marginTop:0,fontSize:20,marginBottom:16}}>Dashboard BSC</h2>
        {/* Semáforos */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:12,marginBottom:20}}>
          {[{c:GREEN,l:"🟢 En Meta"},{c:A,l:"🟡 En Riesgo"},{c:RED,l:"🔴 Crítico"},{c:MUTED,l:"⚪ Sin datos"}].map(s=>(
            <div key={s.c} style={{background:CARD2,border:`1px solid ${s.c}44`,borderRadius:10,padding:16,textAlign:"center"}}>
              <div style={{fontSize:28,fontWeight:"bold",color:s.c}}>{cnt(s.c)}</div>
              <div style={{fontSize:12,color:MUTED,marginTop:4}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* 4 perspectivas */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
          {PERSP.map(p=>{
            const ks=byP(p.id),pct=pctOk(p.id);
            return <div key={p.id} onClick={()=>setTab(p.id)} style={{background:CARD2,border:`1px solid ${p.color}44`,borderRadius:12,padding:18,cursor:"pointer"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=p.color} onMouseLeave={e=>e.currentTarget.style.borderColor=`${p.color}44`}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:18}}>{p.icon}</span><span style={{fontSize:14,fontWeight:"bold",color:p.color}}>{p.label}</span></div>
                <span style={{fontSize:20,fontWeight:"bold",color:ks.length?(pct===100?GREEN:pct>60?A:RED):MUTED}}>{ks.length?`${pct}%`:"—"}</span>
              </div>
              <Bar pct={pct} color={p.color}/>
              <div style={{marginTop:10,display:"flex",gap:5,flexWrap:"wrap"}}>
                {ks.length?ks.map((k,i)=>{const col=kpiCol(k);return<div key={i} style={{background:`${col}22`,border:`1px solid ${col}55`,borderRadius:20,padding:"2px 8px",fontSize:10,color:col}}>{k.nombre||`KPI ${i+1}`}</div>;}):
                <span style={{fontSize:11,color:MUTED}}>Sin KPIs · clic para agregar</span>}
              </div>
            </div>;
          })}
        </div>

        {/* Tabla resumen */}
        {kpis.length>0&&<div style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,overflow:"hidden"}}>
          <div style={{padding:"12px 16px",borderBottom:`1px solid ${BORDER}`}}><h3 style={{margin:0,color:A,fontSize:14}}>📋 Resumen General de KPIs</h3></div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
              <thead><tr style={{background:"#0D1526"}}>
                {["Est.","Indicador","Perspectiva","Responsable","Frec.","Meta","Resultado","Brecha","Tend."].map(h=><th key={h} style={{padding:"8px 10px",textAlign:"left",color:MUTED,fontFamily:"monospace",fontSize:9,borderBottom:`1px solid ${BORDER}`,whiteSpace:"nowrap"}}>{h}</th>)}
              </tr></thead>
              <tbody>{kpis.map((k,i)=>{
                const col=kpiCol(k);
                const act=(k.periodos||[]).filter(p=>p.valor!=="").slice(-1)[0]?.valor||"";
                const br=act&&k.meta?(+k.meta - +act).toFixed(1):"—";
                const tr=trend(k.periodos);
                const p=PERSP.find(pp=>pp.id===k.perspectiva);
                return<tr key={i} style={{borderBottom:`1px solid ${BORDER}`}}>
                  <td style={{padding:"8px 10px"}}><div style={{width:8,height:8,borderRadius:"50%",background:col}}/></td>
                  <td style={{padding:"8px 10px",color:TEXT,fontWeight:"bold",maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{k.nombre||`KPI ${i+1}`}</td>
                  <td style={{padding:"8px 10px",color:p?.color||MUTED}}>{p?.label||"—"}</td>
                  <td style={{padding:"8px 10px",color:MUTED}}>{k.responsable||"—"}</td>
                  <td style={{padding:"8px 10px",color:MUTED}}>{k.frecuencia}</td>
                  <td style={{padding:"8px 10px",color:A,fontWeight:"bold"}}>{k.meta||"—"} {k.unidad}</td>
                  <td style={{padding:"8px 10px",color:col,fontWeight:"bold"}}>{act||"—"}{act?` ${k.unidad}`:""}</td>
                  <td style={{padding:"8px 10px",color:col}}>{br}</td>
                  <td style={{padding:"8px 10px",fontSize:14,color:tr==="↑"?GREEN:tr==="↓"?RED:A}}>{tr}</td>
                </tr>;
              })}</tbody>
            </table>
          </div>
        </div>}
        {kpis.length===0&&<div style={{background:CARD2,border:`2px dashed ${BORDER}`,borderRadius:12,padding:40,textAlign:"center"}}>
          <div style={{fontSize:40,marginBottom:12}}>🎯</div>
          <div style={{color:MUTED,fontSize:14,marginBottom:16}}>No hay KPIs todavía. Selecciona una perspectiva para comenzar.</div>
          <div style={{display:"flex",justifyContent:"center",gap:10,flexWrap:"wrap"}}>
            {PERSP.map(p=><button key={p.id} onClick={()=>setTab(p.id)} style={{background:`${p.color}22`,border:`1px solid ${p.color}`,color:p.color,borderRadius:20,padding:"8px 16px",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}>{p.icon} {p.label}</button>)}
          </div>
        </div>}
      </div>}

      {/* PERSPECTIVAS */}
      {PERSP.map(p=>tab===p.id&&<div key={p.id}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <span style={{fontSize:22}}>{p.icon}</span>
          <h3 style={{margin:0,color:p.color,fontSize:18}}>{p.label}</h3>
          <span style={{marginLeft:"auto",fontSize:12,color:MUTED}}>{byP(p.id).length} KPI{byP(p.id).length!==1?"s":""}</span>
        </div>
        {byP(p.id).length===0&&<div style={{background:CARD2,border:`2px dashed ${p.color}44`,borderRadius:12,padding:30,textAlign:"center",marginBottom:14}}>
          <div style={{fontSize:28,marginBottom:8}}>{p.icon}</div>
          <div style={{color:MUTED,fontSize:13}}>No hay KPIs en esta perspectiva</div>
        </div>}
        {kpis.map((k,i)=>k.perspectiva===p.id&&<KCard key={i} kpi={k} idx={i} pc={p.color} upd={v=>updKpi(i,v)} rem={()=>remKpi(i)}/>)}
        <button onClick={()=>addKpi(p.id)} style={{width:"100%",background:"transparent",border:`2px dashed ${p.color}`,color:p.color,borderRadius:10,padding:"13px",cursor:"pointer",fontSize:13,fontFamily:"inherit",transition:"all 0.2s",marginTop:4}}
          onMouseEnter={e=>e.target.style.background=`${p.color}10`} onMouseLeave={e=>e.target.style.background="transparent"}>
          + Agregar KPI a {p.label}
        </button>
      </div>)}
    </div>
  </div>;
}
