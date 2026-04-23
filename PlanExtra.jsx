import { useState, useEffect } from "react";

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
function finPct(d){const ks=["mercado_tam","mercado_usp","ing_anual","gasto_total","eq_sus","kpi_cac","kpi_ltv","kpi_mrr"];let t=ks.length,f=0;ks.forEach(k=>{if((String(d[`fin_${k}`]||"")).trim())f++;});return Math.round(f/t*100);}
function gtmPct(d){const ks=["intro","f1","f2","f3","pv_dec","precios_det","canales_det","mkt_det","ventas_det","conclusion"];let t=ks.length,f=0;ks.forEach(k=>{if((d[`gtm_${k}`]||"").trim())f++;});return Math.round(f/t*100);}
function bscPct(d){const ks=d.bsc_kpis||[];if(!ks.length)return 0;let t=0,f=0;ks.forEach(k=>{t+=4;if((k.nombre||"").trim())f++;if((k.meta||"").trim())f++;if((k.formula||"").trim())f++;if((k.objetivo||"").trim())f++;});return Math.round(f/t*100);}
function clientePct(d){const ps=d.clientes_personas||[];if(!ps.length)return 0;let t=0,f=0;ps.forEach(p=>{t+=3;if((p.nombre||"").trim())f++;if((p.cargo||"").trim())f++;if((p.antecedentes||"").trim())f++;});return Math.round(f/t*100);}
function mvpPct(d){const ks=["intro","presupuesto_notas"];let t=ks.length,f=0;ks.forEach(k=>{if((d[`mvp_${k}`]||"").trim())f++;});const h=d.mvp_hitos||[];h.forEach(h=>{t++;if((h.desc||"").trim())f++;});return t?Math.round(f/t*100):0;}
function pvsPct(d){const ks=["intro","usp_ganadora","usp_arriesgada","usp_perdedora"];let t=ks.length,f=0;ks.forEach(k=>{if((d[`pvs_${k}`]||"").trim())f++;});return Math.round(f/t*100);}
function compPct(d){
  const rs=d.vrio_recursos||[];
  if(!rs.length)return 0;
  let t=0,f=0;
  rs.forEach(r=>{
    t+=3;
    if((r.nombre||"").trim())f++;
    if((r.resultado||"").trim())f++;
    if((r.conclusion||"").trim())f++;
  });
  return t?Math.round(f/t*100):0;
}
function totalPct(d){const s=[ctxPct(d),...MARCOS_TABS.map(t=>mrkPct(t.id,d)),finPct(d),gtmPct(d),compPct(d),pvsPct(d),mvpPct(d),clientePct(d),bscPct(d)];return Math.round(s.reduce((a,b)=>a+b,0)/s.length);}

// ── DASHBOARD ─────────────────────────────────────────────
function Competitivo({data,set}){
  const recursos=data.vrio_recursos||[{nombre:"",desc:"",vrio:{},resultado:"",conclusion:""}];
  const setRecursos=v=>set("vrio_recursos",v);
  const addR=()=>setRecursos([...recursos,{nombre:"",desc:"",vrio:{},resultado:"",conclusion:""}]);
  const remR=i=>setRecursos(recursos.filter((_,j)=>j!==i));
  const updR=(i,v)=>setRecursos(recursos.map((r,j)=>j===i?v:r));

  return <div>
    <h2 style={{color:A,marginTop:0,fontSize:22,marginBottom:6}}>⚔️ Análisis Competitivo</h2>
    <p style={{color:MUTED,fontSize:13,marginBottom:20}}>Framework VRIO — evalúa cada recurso o capacidad de Bling en 4 dimensiones para identificar ventajas competitivas sostenibles.</p>

    <SC title="📋 Introducción">
      <TA value={data.vrio_intro||""} onChange={v=>set("vrio_intro",v)} placeholder="El framework VRIO permite a Bling evaluar sus recursos y capacidades internas para identificar ventajas competitivas sostenibles..." rows={4}/>
    </SC>

    {/* Leyenda */}
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:20}}>
      {RESULTADOS.map(r=><div key={r} style={{background:`${RESULTADO_COLORS[r]}18`,border:`1px solid ${RESULTADO_COLORS[r]}55`,borderRadius:20,padding:"4px 12px",fontSize:11,color:RESULTADO_COLORS[r]}}>{r}</div>)}
    </div>

    <h3 style={{color:A,fontSize:15,marginBottom:14}}>📦 Recursos y Capacidades</h3>
    {recursos.map((r,i)=><VRIOCard key={i} recurso={r} idx={i} onChange={v=>updR(i,v)} onRemove={()=>remR(i)}/>)}

    <button onClick={addR} style={{width:"100%",background:"transparent",border:`2px dashed ${A}`,color:A,borderRadius:10,padding:"14px",cursor:"pointer",fontSize:14,fontFamily:"inherit",transition:"all 0.2s"}}
      onMouseEnter={e=>e.target.style.background=`${A}10`} onMouseLeave={e=>e.target.style.background="transparent"}>
      + Agregar Recurso / Capacidad
    </button>
  </div>;
}

// ── PROPUESTAS ÚNICAS DE VENTA ────────────────────────────
const CRITERIOS=["Precio","Calidad","Soporte","Innovación","Satisfacción"];
const COMP_COLORS=[A,GREEN,BLUE,RED,"#A855F7","#EC4899","#14B8A6"];

function RankingChart({empresa,competidores}){
  const todos=[{nombre:"Tu empresa",rasgos:[],scores:empresa.scores||{},...empresa},...competidores];
  const hasData=todos.some(e=>CRITERIOS.some(c=>e.scores?.[c]>0));
  if(!hasData)return <div style={{height:120,display:"flex",alignItems:"center",justifyContent:"center",color:MUTED,fontSize:12}}>Ingresa puntuaciones para ver el gráfico</div>;
  const h=160,pad=40;
  const w=100/(CRITERIOS.length-1);
  return <div>
    <svg width="100%" height={h+40} viewBox={`0 0 100 ${h+40}`} preserveAspectRatio="none">
      {/* grid lines */}
      {[1,2,3,4,5].map(v=><line key={v} x1="0" y1={h-(v-1)/(5-1)*(h-pad)+pad/2} x2="100" y2={h-(v-1)/(5-1)*(h-pad)+pad/2} stroke={BORDER} strokeWidth="0.3" vectorEffect="non-scaling-stroke"/>)}
      {todos.map((e,ei)=>{
        const col=COMP_COLORS[ei]||MUTED;
        const pts=CRITERIOS.map((c,ci)=>{const v=Number(e.scores?.[c])||0;return `${ci*w},${h-(v-1)/(5-1)*(h-pad)+pad/2}`;}).join(" ");
        return <polyline key={ei} fill="none" stroke={col} strokeWidth="1.5" points={pts} vectorEffect="non-scaling-stroke"/>;
      })}
      {todos.map((e,ei)=>CRITERIOS.map((c,ci)=>{
        const v=Number(e.scores?.[c])||0;if(!v)return null;
        const col=COMP_COLORS[ei]||MUTED;
        return <circle key={`${ei}-${ci}`} cx={ci*w} cy={h-(v-1)/(5-1)*(h-pad)+pad/2} r="1.5" fill={col} vectorEffect="non-scaling-stroke"/>;
      }))}
    </svg>
    <div style={{display:"flex",justifyContent:"space-between",marginTop:2}}>
      {CRITERIOS.map(c=><span key={c} style={{fontSize:9,color:MUTED,flex:1,textAlign:"center"}}>{c}</span>)}
    </div>
    <div style={{display:"flex",flexWrap:"wrap",gap:10,marginTop:8}}>
      {todos.map((e,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:10,height:2,background:COMP_COLORS[i]||MUTED,borderRadius:1}}/><span style={{fontSize:10,color:MUTED}}>{e.nombre||`Competidor ${i}`}</span></div>)}
    </div>
  </div>;
}

function PVS({data,set}){
  const f=(k,def="")=>data[`pvs_${k}`]||def;
  const s=(k,v)=>set(`pvs_${k}`,v);

  // Empresa propia
  const empresa=data.pvs_empresa||{nombre:"Tu empresa",rasgos:[""],scores:{}};
  const setEmpresa=v=>set("pvs_empresa",v);

  // Competidores
  const comps=data.pvs_comps||[{nombre:"",color:GREEN,rasgos:[""],scores:{}}];
  const setComps=v=>set("pvs_comps",v);
  const addComp=()=>setComps([...comps,{nombre:"",color:COMP_COLORS[comps.length+1]||BLUE,rasgos:[""],scores:{}}]);
  const remComp=i=>setComps(comps.filter((_,j)=>j!==i));
  const updComp=(i,v)=>setComps(comps.map((c,j)=>j===i?v:c));

  return <div>
    <h2 style={{color:A,marginTop:0,fontSize:22,marginBottom:6}}>💎 Propuestas Únicas de Venta</h2>
    <p style={{color:MUTED,fontSize:13,marginBottom:20}}>Define y compara tus USPs frente a la competencia.</p>

    <SC title="📋 Introducción">
      <TA value={f("intro")} onChange={v=>s("intro",v)} placeholder="En un mercado saturado, la capacidad de Bling para articular una USP convincente es fundamental..." rows={4}/>
    </SC>

    {/* TEST ÁCIDO */}
    <SC title="✅ Test Ácido de USP">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
        <div style={{background:`${GREEN}15`,border:`1px solid ${GREEN}44`,borderRadius:10,padding:14}}>
          <div style={{fontSize:13,fontWeight:"bold",color:GREEN,marginBottom:8}}>✅ USP Ganadora</div>
          <TA value={f("usp_ganadora")} onChange={v=>s("usp_ganadora",v)} placeholder="¿Cuál es tu USP más fuerte y difícil de imitar?" rows={4}/>
        </div>
        <div style={{background:`${A}15`,border:`1px solid ${A}44`,borderRadius:10,padding:14}}>
          <div style={{fontSize:13,fontWeight:"bold",color:A,marginBottom:8}}>⚠️ USP Arriesgada</div>
          <TA value={f("usp_arriesgada")} onChange={v=>s("usp_arriesgada",v)} placeholder="¿Qué USP podría ser un arma de doble filo?" rows={4}/>
        </div>
        <div style={{background:`${RED}15`,border:`1px solid ${RED}44`,borderRadius:10,padding:14}}>
          <div style={{fontSize:13,fontWeight:"bold",color:RED,marginBottom:8}}>🚫 USP Perdedora</div>
          <TA value={f("usp_perdedora")} onChange={v=>s("usp_perdedora",v)} placeholder="¿Qué USP definitivamente no deberías usar?" rows={4}/>
        </div>
      </div>
    </SC>

    {/* ¿QUÉ TE HACE ÚNICO? */}
    <div style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:20,marginBottom:14}}>
      <h3 style={{margin:"0 0 4px",color:A,fontSize:14}}>⭐ ¿Qué te hace único?</h3>
      <p style={{margin:"0 0 16px",color:MUTED,fontSize:12}}>Compara los rasgos principales de tu empresa vs competidores.</p>

      <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:8}}>
        {/* Tu empresa */}
        <div style={{flex:"0 0 220px",background:`${A}18`,border:`2px solid ${A}`,borderRadius:10,padding:14}}>
          <div style={{fontSize:12,fontWeight:"bold",color:A,marginBottom:10}}>🏢 Tu empresa</div>
          <LB text="Rasgos únicos"/>
          <DL items={empresa.rasgos||[""]} onChange={v=>setEmpresa({...empresa,rasgos:v})} placeholder="Rasgo único" add="+ Agregar rasgo"/>
        </div>

        {/* Competidores */}
        {comps.map((comp,i)=>(
          <div key={i} style={{flex:"0 0 220px",background:`${COMP_COLORS[i+1]||BLUE}15`,border:`1px solid ${COMP_COLORS[i+1]||BLUE}55`,borderRadius:10,padding:14,position:"relative"}}>
            <div style={{marginBottom:8}}>
              <TI value={comp.nombre} onChange={v=>updComp(i,{...comp,nombre:v})} placeholder={`Nombre competidor ${i+1}`}/>
            </div>
            <LB text="Rasgos"/>
            <DL items={comp.rasgos||[""]} onChange={v=>updComp(i,{...comp,rasgos:v})} placeholder="Rasgo" add="+ Agregar rasgo"/>
            <button onClick={()=>remComp(i)} style={{position:"absolute",top:10,right:10,background:"transparent",border:"none",color:MUTED,cursor:"pointer",fontSize:12}}
              onMouseEnter={e=>e.target.style.color=RED} onMouseLeave={e=>e.target.style.color=MUTED}>✕</button>
          </div>
        ))}

        {/* Agregar competidor */}
        <div style={{flex:"0 0 160px",border:`2px dashed ${BORDER}`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",minHeight:120}}
          onClick={addComp} onMouseEnter={e=>e.currentTarget.style.borderColor=A} onMouseLeave={e=>e.currentTarget.style.borderColor=BORDER}>
          <span style={{color:A,fontSize:13,textAlign:"center",padding:10}}>+ Agregar<br/>competidor</span>
        </div>
      </div>
    </div>

    {/* RANKING */}
    <SC title="📊 Análisis de Ranking de Competidores USP">
      <p style={{color:MUTED,fontSize:12,marginBottom:14}}>Puntúa del 1 al 5 cada criterio (5 = mejor). El gráfico se genera automáticamente.</p>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",marginBottom:16}}>
          <thead>
            <tr>
              <th style={{textAlign:"left",padding:"8px 10px",color:MUTED,fontSize:11,fontFamily:"monospace",borderBottom:`1px solid ${BORDER}`}}>EMPRESA</th>
              {CRITERIOS.map(c=><th key={c} style={{textAlign:"center",padding:"8px 10px",color:MUTED,fontSize:11,fontFamily:"monospace",borderBottom:`1px solid ${BORDER}`}}>{c.toUpperCase()}</th>)}
            </tr>
          </thead>
          <tbody>
            {/* Tu empresa */}
            <tr>
              <td style={{padding:"8px 10px",color:A,fontSize:12,fontWeight:"bold"}}>Tu empresa</td>
              {CRITERIOS.map(c=>(
                <td key={c} style={{padding:"6px 10px",textAlign:"center"}}>
                  <select value={empresa.scores?.[c]||""} onChange={e=>setEmpresa({...empresa,scores:{...(empresa.scores||{}),[c]:Number(e.target.value)}})}
                    style={{background:"#0D1526",border:`1px solid ${BORDER}`,borderRadius:4,color:A,padding:"4px 6px",fontSize:12,outline:"none",cursor:"pointer",width:"100%"}}>
                    <option value="">-</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n}</option>)}
                  </select>
                </td>
              ))}
            </tr>
            {/* Competidores */}
            {comps.map((comp,i)=>(
              <tr key={i}>
                <td style={{padding:"8px 10px",color:COMP_COLORS[i+1]||BLUE,fontSize:12,fontWeight:"bold"}}>{comp.nombre||`Competidor ${i+1}`}</td>
                {CRITERIOS.map(c=>(
                  <td key={c} style={{padding:"6px 10px",textAlign:"center"}}>
                    <select value={comp.scores?.[c]||""} onChange={e=>updComp(i,{...comp,scores:{...(comp.scores||{}),[c]:Number(e.target.value)}})}
                      style={{background:"#0D1526",border:`1px solid ${BORDER}`,borderRadius:4,color:COMP_COLORS[i+1]||BLUE,padding:"4px 6px",fontSize:12,outline:"none",cursor:"pointer",width:"100%"}}>
                      <option value="">-</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n}</option>)}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{background:"#0D1526",borderRadius:8,padding:14}}>
        <div style={{fontSize:11,color:MUTED,marginBottom:8,fontFamily:"monospace"}}>GRÁFICO COMPARATIVO (1–5)</div>
        <RankingChart empresa={empresa} competidores={comps}/>
      </div>
    </SC>
  </div>;
}

// ── CAMINO A UN MVP ───────────────────────────────────────
function MVP({data,set}){
  const f=(k,def="")=>data[`mvp_${k}`]||def;
  const s=(k,v)=>set(`mvp_${k}`,v);
  const gl=(k,def=[""])=>data[`mvp_list_${k}`]||def;
  const sl=(k,v)=>set(`mvp_list_${k}`,v);

  // Hitos con progreso
  const hitos=data.mvp_hitos||[{desc:"",pct:0}];
  const setHitos=v=>set("mvp_hitos",v);
  const addHito=()=>setHitos([...hitos,{desc:"",pct:0}]);
  const remHito=i=>setHitos(hitos.filter((_,j)=>j!==i));
  const updHito=(i,k,v)=>setHitos(hitos.map((h,j)=>j===i?{...h,[k]:v}:h));

  return <div>
    <h2 style={{color:GREEN,marginTop:0,fontSize:22,marginBottom:6}}>🗺 Camino a un MVP</h2>
    <p style={{color:MUTED,fontSize:13,marginBottom:20}}>Define el Producto Mínimo Viable para validar la propuesta de valor de Bling.</p>

    {/* INTRODUCCIÓN */}
    <SC title="📋 Introducción" color={GREEN}>
      <TA value={f("intro")} onChange={v=>s("intro",v)} placeholder="El camino hacia el MVP busca resolver la fragmentación y falta de confianza en el sector de agentes de carga independientes..." rows={4}/>
    </SC>

    {/* FUNCIONALIDADES + VALIDACIÓN — 2 columnas */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
      <div style={{background:CARD2,border:`1px solid ${GREEN}44`,borderRadius:12,padding:18}}>
        <h3 style={{margin:"0 0 14px",color:GREEN,fontSize:14}}>⚙️ Funcionalidades Principales</h3>
        <DL items={gl("funcionalidades",[""])} onChange={v=>sl("funcionalidades",v)} placeholder="Funcionalidad del MVP" useTA add="+ Agregar funcionalidad"/>
      </div>
      <div style={{background:CARD2,border:`1px solid ${GREEN}44`,borderRadius:12,padding:18}}>
        <h3 style={{margin:"0 0 14px",color:GREEN,fontSize:14}}>✅ Validación de Mercado</h3>
        <DL items={gl("validacion",[""])} onChange={v=>sl("validacion",v)} placeholder="Acción de validación" useTA add="+ Agregar acción"/>
      </div>
    </div>

    {/* CRONOGRAMA E HITOS */}
    <div style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:20,marginBottom:14}}>
      <h3 style={{margin:"0 0 16px",color:A,fontSize:14}}>📅 Cronograma e Hitos</h3>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {hitos.map((h,i)=>(
          <div key={i} style={{background:"#0D1526",borderRadius:8,padding:14}}>
            <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}>
              <div style={{width:26,height:26,borderRadius:"50%",background:GREEN,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:"bold",color:DARK,flexShrink:0}}>{i+1}</div>
              <div style={{flex:1}}>
                <TI value={h.desc} onChange={v=>updHito(i,"desc",v)} placeholder={`Hito ${i+1}: Ej. Definición del alcance MVP: Mes 1`}/>
              </div>
              {hitos.length>1&&<button onClick={()=>remHito(i)} style={{background:"transparent",border:`1px solid ${BORDER}`,color:MUTED,borderRadius:6,padding:"6px 8px",cursor:"pointer",fontSize:11}}
                onMouseEnter={e=>{e.target.style.borderColor=RED;e.target.style.color=RED;}} onMouseLeave={e=>{e.target.style.borderColor=BORDER;e.target.style.color=MUTED;}}>✕</button>}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:11,color:MUTED,minWidth:60}}>Progreso:</span>
              <input type="range" min="0" max="100" value={h.pct||0} onChange={e=>updHito(i,"pct",Number(e.target.value))}
                style={{flex:1,accentColor:GREEN,cursor:"pointer"}}/>
              <span style={{fontSize:12,fontWeight:"bold",color:GREEN,minWidth:36}}>{h.pct||0}%</span>
            </div>
            <div style={{marginTop:6,height:4,background:"#1e3a5f",borderRadius:2}}>
              <div style={{width:`${h.pct||0}%`,height:"100%",background:GREEN,borderRadius:2,transition:"width 0.3s"}}/>
            </div>
          </div>
        ))}
      </div>
      <button onClick={addHito} style={{marginTop:12,background:"transparent",border:`1px dashed ${A}`,color:A,borderRadius:6,padding:"7px 14px",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}
        onMouseEnter={e=>e.target.style.background=`${A}15`} onMouseLeave={e=>e.target.style.background="transparent"}>+ Agregar hito</button>
    </div>

    {/* MARKETING */}
    <SC title="📣 Marketing">
      <div style={{marginBottom:14}}>
        <LB text="Estrategia de Marketing"/>
        <DL items={gl("mkt_estrategia",[""])} onChange={v=>sl("mkt_estrategia",v)} placeholder="Táctica de marketing" useTA add="+ Agregar táctica"/>
      </div>
      <div style={{marginBottom:14}}>
        <LB text="Eslóganes"/>
        <DL items={gl("slogans",[""])} onChange={v=>sl("slogans",v)} placeholder="Eslógan" add="+ Agregar eslógan"/>
      </div>
      <div style={{marginBottom:14}}>
        <LB text="Publicaciones en Redes Sociales"/>
        <DL items={gl("social_posts",[""])} onChange={v=>sl("social_posts",v)} placeholder="Publicación para redes sociales..." useTA add="+ Agregar publicación"/>
      </div>
      <LB text="Canales de Distribución"/>
      <DL items={gl("canales",[""])} onChange={v=>sl("canales",v)} placeholder="Canal" add="+ Agregar canal"/>
    </SC>

    {/* PRESUPUESTO + MÉTRICAS — 2 columnas */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <div style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:18}}>
        <h3 style={{margin:"0 0 14px",color:A,fontSize:14}}>💲 Consideraciones de Presupuesto</h3>
        <DL items={gl("presupuesto",[""])} onChange={v=>sl("presupuesto",v)} placeholder="Ítem de presupuesto y monto estimado" useTA add="+ Agregar ítem"/>
        <div style={{marginTop:12}}>
          <LB text="Notas adicionales de presupuesto"/>
          <TA value={f("presupuesto_notas")} onChange={v=>s("presupuesto_notas",v)} placeholder="Notas sobre el presupuesto del MVP..." rows={2}/>
        </div>
      </div>
      <div style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:18}}>
        <h3 style={{margin:"0 0 14px",color:GREEN,fontSize:14}}>📊 Métricas de Desempeño</h3>
        <DL items={gl("metricas",[""])} onChange={v=>sl("metricas",v)} placeholder="Métrica de desempeño del MVP" useTA add="+ Agregar métrica"/>
        <div style={{marginTop:12}}>
          <LB text="KPIs clave del piloto"/>
          <DL items={gl("kpis",[""])} onChange={v=>sl("kpis",v)} placeholder="KPI" add="+ Agregar KPI"/>
        </div>
      </div>
    </div>
  </div>;
}

// ── PERFIL DEL CLIENTE ────────────────────────────────────
const PERSONA_EMPTY=()=>({nombre:"",cargo:"",antecedentes:"",desafios:[""],metas:[""],objeciones:[""],ofreces:[""],identificadores:[""],citas:["","",""],genero:"",edad:"",ingresos:"",educacion:"",ubicacion:""});

function PersonaCard({persona,idx,onChange,onRemove}){
  const u=(k,v)=>onChange({...persona,[k]:v});
  const ul=(k,v)=>onChange({...persona,[k]:v});
  const uc=(i,v)=>{const c=[...(persona.citas||["","",""])];c[i]=v;onChange({...persona,citas:c});};

  const SECCIONES=[
    {k:"antecedentes",title:"📋 Antecedentes",icon:"🟠",type:"textarea",ph:"Historia, contexto, situación actual..."},
    {k:"desafios",title:"⚠️ Desafíos",icon:"🔴",type:"list",ph:"Desafío principal"},
    {k:"metas",title:"🎯 Metas",icon:"🟢",type:"list",ph:"Meta u objetivo"},
    {k:"objeciones",title:"❓ Objeciones",icon:"🟡",type:"list",ph:'Objeción típica (ej: "¿Qué garantiza que sea diferente?")'},
    {k:"ofreces",title:"💡 ¿Qué puedes ofrecer?",icon:"🔵",type:"list",ph:"Beneficio o solución que ofrece Bling"},
    {k:"identificadores",title:"🔍 Identificadores",icon:"🟣",type:"list",ph:"Rasgo identificador de este cliente"},
  ];

  return <div style={{background:CARD2,border:`1px solid ${GREEN}44`,borderRadius:14,padding:22,marginBottom:20}}>
    {/* Header */}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
      <div style={{flex:1,marginRight:12}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <div style={{width:36,height:36,borderRadius:"50%",background:`${A}22`,border:`2px solid ${A}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>👤</div>
          <div style={{flex:1}}>
            <TI value={persona.nombre||""} onChange={v=>u("nombre",v)} placeholder="Nombre completo del cliente ideal"/>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{background:`${GREEN}22`,border:`1px solid ${GREEN}55`,borderRadius:20,padding:"3px 12px",fontSize:11,color:GREEN,whiteSpace:"nowrap"}}>Customer persona #{idx+1}</span>
          <div style={{flex:1}}><TI value={persona.cargo||""} onChange={v=>u("cargo",v)} placeholder="Cargo y empresa (Ej: Gerente de Logística Global Express)"/></div>
        </div>
      </div>
      <button onClick={onRemove} style={{background:"transparent",border:`1px solid ${BORDER}`,color:MUTED,borderRadius:6,padding:"7px 12px",cursor:"pointer",fontSize:12}}
        onMouseEnter={e=>{e.target.style.borderColor=RED;e.target.style.color=RED;}} onMouseLeave={e=>{e.target.style.borderColor=BORDER;e.target.style.color=MUTED;}}>✕ Eliminar</button>
    </div>

    {/* Secciones en grid 3 columnas */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:14}}>
      {SECCIONES.map(sec=>(
        <div key={sec.k} style={{background:"#0D1526",borderRadius:8,padding:14}}>
          <div style={{fontSize:12,fontWeight:"bold",color:A,marginBottom:10}}>{sec.title}</div>
          {sec.type==="textarea"
            ? <TA value={persona[sec.k]||""} onChange={v=>u(sec.k,v)} placeholder={sec.ph} rows={3}/>
            : <DL items={persona[sec.k]||[""]} onChange={v=>ul(sec.k,v)} placeholder={sec.ph} add="+ Agregar"/>
          }
        </div>
      ))}
    </div>

    {/* Demografía */}
    <div style={{background:"#0D1526",borderRadius:8,padding:14,marginBottom:14}}>
      <div style={{fontSize:12,fontWeight:"bold",color:A,marginBottom:12}}>👥 Demografía</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
        {[{k:"genero",l:"Género",ph:"Ej: Mujer"},{k:"edad",l:"Edad",ph:"Ej: 35-45 años"},{k:"ingresos",l:"Ingresos",ph:"Ej: $70,000 USD/año"},{k:"educacion",l:"Educación",ph:"Ej: Lic. Comercio Int."},{k:"ubicacion",l:"Ubicación",ph:"Ej: LATAM"}].map(d=>(
          <div key={d.k}>
            <LB text={d.l}/>
            <TI value={persona[d.k]||""} onChange={v=>u(d.k,v)} placeholder={d.ph}/>
          </div>
        ))}
      </div>
    </div>

    {/* Citas reales */}
    <div>
      <div style={{fontSize:12,fontWeight:"bold",color:GREEN,marginBottom:10}}>💬 Citas Reales</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        {[0,1,2].map(i=>(
          <div key={i} style={{background:`${GREEN}12`,border:`1px solid ${GREEN}44`,borderRadius:8,padding:12}}>
            <TA value={(persona.citas||[])[i]||""} onChange={v=>uc(i,v)} placeholder={`"Cita real o frase típica de este cliente..."`} rows={2}/>
          </div>
        ))}
      </div>
    </div>
  </div>;
}

function Cliente({data,set}){
  const personas=data.clientes_personas||[PERSONA_EMPTY()];
  const setPersonas=v=>set("clientes_personas",v);
  const add=()=>setPersonas([...personas,PERSONA_EMPTY()]);
  const rem=i=>setPersonas(personas.filter((_,j)=>j!==i));
  const upd=(i,v)=>setPersonas(personas.map((p,j)=>j===i?v:p));

  return <div>
    <h2 style={{color:A,marginTop:0,fontSize:22,marginBottom:6}}>👤 Perfil del Cliente</h2>
    <p style={{color:MUTED,fontSize:13,marginBottom:20}}>Define los perfiles de tus clientes ideales (Customer Personas) para guiar tu estrategia.</p>

    <SC title="📋 Introducción">
      <TA value={data.clientes_intro||""} onChange={v=>set("clientes_intro",v)} placeholder="Para Bling Logistics Network, comprender la psicografía de nuestros clientes ideales es fundamental para comunicar nuestra propuesta de valor..." rows={4}/>
    </SC>

    {personas.map((p,i)=><PersonaCard key={i} persona={p} idx={i} onChange={v=>upd(i,v)} onRemove={()=>rem(i)}/>)}

    <button onClick={add} style={{width:"100%",background:"transparent",border:`2px dashed ${A}`,color:A,borderRadius:10,padding:"14px",cursor:"pointer",fontSize:14,fontFamily:"inherit",transition:"all 0.2s"}}
      onMouseEnter={e=>e.target.style.background=`${A}10`} onMouseLeave={e=>e.target.style.background="transparent"}>
      + Agregar Perfil de Cliente
    </button>
  </div>;
}


// ── BSC PLACEHOLDER ───────────────────────────────────────
function BSC(){
  const PERSP=[
    {id:"fin",label:"Financiera",icon:"💰",color:"#10B981"},
    {id:"cli",label:"Clientes",icon:"👥",color:"#3B82F6"},
    {id:"pro",label:"Procesos Internos",icon:"⚙️",color:"#F59E0B"},
    {id:"apr",label:"Crecimiento y Aprendizaje",icon:"🌱",color:"#A855F7"},
  ];
  return <div>
    <h2 style={{color:A,marginTop:0,fontSize:22,marginBottom:6}}>🎯 Cuadro de Mando Integral</h2>
    <p style={{color:MUTED,fontSize:13,marginBottom:24}}>El BSC es una herramienta de medición avanzada que funciona como módulo independiente para mantener el rendimiento óptimo de la plataforma.</p>
    <div style={{background:CARD2,border:`2px solid ${A}`,borderRadius:14,padding:32,textAlign:"center",marginBottom:20}}>
      <div style={{fontSize:48,marginBottom:12}}>🎯</div>
      <h3 style={{color:A,margin:"0 0 10px",fontSize:20}}>Cuadro de Mando Integral — BSC 2026</h3>
      <p style={{color:MUTED,fontSize:13,margin:"0 0 24px",maxWidth:480,marginLeft:"auto",marginRight:"auto"}}>Tu BSC con las 4 perspectivas, semaforización automática, gráficos por indicador y tabla de seguimiento está disponible como módulo independiente.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,maxWidth:400,margin:"0 auto 24px"}}>
        {PERSP.map(p=><div key={p.id} style={{background:`${p.color}18`,border:`1px solid ${p.color}44`,borderRadius:10,padding:"12px 16px",display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:20}}>{p.icon}</span>
          <span style={{fontSize:12,color:p.color,fontWeight:"bold"}}>{p.label}</span>
        </div>)}
      </div>
      <div style={{background:"#0D1526",borderRadius:10,padding:16,marginBottom:20,textAlign:"left",maxWidth:480,margin:"0 auto 20px"}}>
        <div style={{fontSize:11,color:MUTED,marginBottom:8,fontFamily:"monospace"}}>EL BSC INCLUYE:</div>
        {["Objetivo vinculado · Perspectiva · Responsable","Frecuencia · Línea base · Meta · Unidad de medida","Fórmula de cálculo · Peso / Ponderación","Umbrales 🔴🟡🟢 · Semáforo automático","Períodos de resultado · Tendencia automática ↑↓→","Brecha vs meta · Notas · Acciones correctivas","Gráfico de evolución por indicador","Dashboard con resumen de las 4 perspectivas"].map((item,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
          <span style={{color:A,fontSize:10}}>✓</span>
          <span style={{fontSize:12,color:TEXT}}>{item}</span>
        </div>)}
      </div>
      <button onClick={()=>window.location.hash="#bsc"} style={{background:A,color:"#0A0F1E",border:"none",borderRadius:8,padding:"12px 28px",fontSize:14,fontWeight:"bold",cursor:"pointer",fontFamily:"inherit"}}>🎯 Abrir Cuadro de Mando Integral</button>
    </div>
  </div>;
}

// ── APP ───────────────────────────────────────────────────
const NAV=[
  {sec:"Análisis de Negocio",items:[{id:"dashboard",ic:"⊞",label:"Dashboard"},{id:"contexto",ic:"🏢",label:"Contexto"},{id:"marcos",ic:"🧭",label:"Marcos Estratégicos"},{id:"finanzas",ic:"📈",label:"Finanzas"},{id:"gtm",ic:"🚀",label:"Estrategia de Salida al Mercado"},{id:"competitivo",ic:"⚔️",label:"Análisis Competitivo"},{id:"pvs",ic:"💎",label:"Propuestas Únicas de Venta"},{id:"mvp",ic:"🗺",label:"Camino a un MVP"},{id:"cliente",ic:"👤",label:"Perfil del Cliente"}]},
  {sec:"Medición Estratégica",items:[{id:"bsc",ic:"🎯",label:"Cuadro de Mando Integral"}]},
  {sec:"Herramientas",items:[{id:"pitch",ic:"🎤",label:"Presentación de pitch",dis:true}]},
];


export {Competitivo,PVS,MVP,Cliente,BSC}
