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
function Dashboard({data,go}){
  const prog=totalPct(data);
  const mods=[
    {label:"Contexto",pct:ctxPct(data),icon:"🏢",nav:"contexto"},
    ...MARCOS_TABS.map(t=>({label:t.label,pct:mrkPct(t.id,data),icon:"🧭",nav:"marcos"})),
    {label:"Finanzas",pct:finPct(data),icon:"📈",nav:"finanzas"},
    {label:"Estrategia GTM",pct:gtmPct(data),icon:"🚀",nav:"gtm"},
    {label:"Análisis Competitivo",pct:compPct(data),icon:"⚔️",nav:"competitivo"},
    {label:"Propuestas USP",pct:pvsPct(data),icon:"💎",nav:"pvs"},
    {label:"Camino a un MVP",pct:mvpPct(data),icon:"🗺",nav:"mvp"},
    {label:"Perfil del Cliente",pct:clientePct(data),icon:"👤",nav:"cliente"},
    {label:"Cuadro de Mando",pct:bscPct(data),icon:"🎯",nav:"bsc"},
  ];
  return <div>
    <h2 style={{color:A,marginTop:0,fontSize:22,marginBottom:20}}>Dashboard</h2>
    <div style={{background:CARD2,borderRadius:12,padding:22,marginBottom:22,border:`1px solid ${BORDER}`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <span style={{fontSize:13,color:MUTED}}>Progreso Total del Plan Estratégico</span>
        <span style={{fontSize:26,fontWeight:"bold",color:prog===100?GREEN:A}}>{prog}%</span>
      </div>
      <Bar pct={prog} h={10}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))",gap:12}}>
      {mods.map(m=><div key={m.label} onClick={()=>go(m.nav)} style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:10,padding:14,cursor:"pointer"}}
        onMouseEnter={e=>e.currentTarget.style.borderColor=A} onMouseLeave={e=>e.currentTarget.style.borderColor=BORDER}>
        <div style={{fontSize:18,marginBottom:6}}>{m.icon}</div>
        <div style={{fontSize:12,color:TEXT,marginBottom:8,fontWeight:"bold"}}>{m.label}</div>
        <Bar pct={m.pct}/>
        <div style={{fontSize:11,color:MUTED,marginTop:4,fontFamily:"monospace"}}>{m.pct}%</div>
      </div>)}
    </div>
  </div>;
}

// ── CONTEXTO ──────────────────────────────────────────────
function Contexto({data,set}){
  return <div>
    <h2 style={{color:A,marginTop:0,fontSize:22}}>Contexto</h2>
    {CTX_SECS.map(s=><div key={s.id} style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:20,marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><span style={{fontSize:20}}>{s.icon}</span><h3 style={{margin:0,color:s.color,fontSize:15}}>{s.title}</h3></div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {s.fields.map(f=><div key={f.id}><LB text={f.label}/><TA value={data[`ctx_${s.id}_${f.id}`]} onChange={v=>set(`ctx_${s.id}_${f.id}`,v)} placeholder={f.ph}/></div>)}
      </div>
    </div>)}
  </div>;
}

// ── MARCOS ────────────────────────────────────────────────
const PESTEL_F=[{id:"pol",t:"🏛 Político",ph:"Políticas comerciales, acuerdos bilaterales..."},{id:"eco",t:"💵 Económico",ph:"Volatilidad, cadenas de suministro..."},{id:"soc",t:"👥 Social",ph:"Transparencia, sostenibilidad..."},{id:"tec",t:"⚙️ Tecnológico",ph:"IA, blockchain, digitalización..."},{id:"amb",t:"🌿 Ambiental",ph:"Regulaciones ambientales, huella de carbono..."},{id:"leg",t:"⚖️ Legal",ph:"GDPR, antimonopolio..."}];
const CATWOE_F=[{id:"cli",t:"👤 C – Clientes",ph:"Agentes de carga independientes, PYMES..."},{id:"act",t:"🎭 A – Actores",ph:"Equipo Bling, desarrolladores..."},{id:"tra",t:"⚙️ T – Transformación",ph:"De agentes aislados a red global..."},{id:"vis",t:"🌍 W – Visión del Mundo",ph:"Confianza y colaboración como pilares..."},{id:"own",t:"🏛 O – Propietarios",ph:"Dirección y accionistas de Bling..."},{id:"env",t:"🌿 E – Restricciones",ph:"Regulaciones, competencia, tecnología..."}];
const PORTER_F=[{id:"nue",t:"→ Nuevos competidores",ph:"¿Qué tan fácil es entrar al mercado?"},{id:"sus",t:"⇄ Productos sustitutos",ph:"¿Qué alternativas tienen los FF?"},{id:"pro",t:"📦 Poder del proveedor",ph:"Poder de los agentes en la red..."},{id:"com",t:"🛒 Poder del comprador",ph:"Poder de los FF al elegir red..."},{id:"riv",t:"🔥 Rivalidad competitiva",ph:"Intensidad de la competencia..."}];

function Marcos({data,set}){
  const[tab,setTab]=useState("estrategia");
  const gl=(k,def=[""])=>data[`mrk_${tab}_lists`]?.[k]||def;
  const gt=(k,def="")=>data[`mrk_${tab}_texts`]?.[k]||def;
  const sl=(k,v)=>set(`mrk_${tab}_lists`,{...(data[`mrk_${tab}_lists`]||{}),[k]:v});
  const st=(k,v)=>set(`mrk_${tab}_texts`,{...(data[`mrk_${tab}_texts`]||{}),[k]:v});

  return <div>
    <h2 style={{color:A,marginTop:0,fontSize:22}}>Marcos Estratégicos</h2>
    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
      {MARCOS_TABS.map(t=>{const on=t.id===tab;return <button key={t.id} onClick={()=>setTab(t.id)}
        style={{background:on?A:CARD2,color:on?DARK:TEXT,border:`1px solid ${on?A:BORDER}`,borderRadius:20,padding:"6px 14px",fontSize:12,cursor:"pointer",fontFamily:"inherit",fontWeight:on?"bold":"normal"}}>
        {t.label}{mrkPct(t.id,data)===100?" ✓":""}
      </button>;})}
    </div>

    {tab==="estrategia"&&<div>
      <SC title="Estrategias de Negocio"><DL items={gl("est",[""])} onChange={v=>sl("est",v)} placeholder="Estrategia" useTA add="+ Agregar estrategia"/></SC>
      <SC title="Marcos de Negocio"><DL items={gl("marc",[""])} onChange={v=>sl("marc",v)} placeholder="Marco" useTA add="+ Agregar marco"/></SC>
      <SC title="Análisis de Requisitos"><DL items={gl("req",[""])} onChange={v=>sl("req",v)} placeholder="Requisito" add="+ Agregar requisito"/></SC>
      <SC title="Fuentes de Ingresos"><DL items={gl("ing",[""])} onChange={v=>sl("ing",v)} placeholder="Fuente de ingreso" useTA add="+ Agregar fuente"/></SC>
    </div>}

    {tab==="swot"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      {[{k:"for",t:"💪 Fortalezas",c:GREEN,a:"+ Fortaleza"},{k:"deb",t:"⚠️ Debilidades",c:A,a:"+ Debilidad"},{k:"opp",t:"🌱 Oportunidades",c:BLUE,a:"+ Oportunidad"},{k:"ame",t:"🔥 Amenazas",c:RED,a:"+ Amenaza"}].map(g=>
        <div key={g.k} style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:16}}>
          <h3 style={{margin:"0 0 12px",color:g.c,fontSize:14}}>{g.t}</h3>
          <DL items={gl(g.k,[""])} onChange={v=>sl(g.k,v)} placeholder={g.t.replace(/[^\w\s]/gi,"").trim()} add={g.a}/>
        </div>
      )}
    </div>}

    {tab==="pestel"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      {PESTEL_F.map(f=><SC key={f.id} title={f.t}><LB text="Descripción"/><div style={{marginBottom:10}}><TA value={gt(f.id)} onChange={v=>st(f.id,v)} placeholder={f.ph}/></div><LB text="Puntos clave"/><DL items={gl(f.id,[""])} onChange={v=>sl(f.id,v)} placeholder="Punto clave" add="+ Agregar punto"/></SC>)}
    </div>}

    {tab==="porter"&&<div>{PORTER_F.map(f=><SC key={f.id} title={f.t}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><LB text="Nivel"/><SEL value={gt(`${f.id}_n`)} onChange={v=>st(`${f.id}_n`,v)}/></div>
      <LB text="Descripción"/><TA value={gt(f.id)} onChange={v=>st(f.id,v)} placeholder={f.ph}/>
      <div style={{marginTop:10}}><LB text="Acciones de respuesta"/><DL items={gl(f.id,[""])} onChange={v=>sl(f.id,v)} placeholder="Acción" add="+ Agregar acción"/></div>
    </SC>)}</div>}

    {tab==="catwoe"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      {CATWOE_F.map(f=><SC key={f.id} title={f.t}><LB text="Descripción"/><div style={{marginBottom:10}}><TA value={gt(f.id)} onChange={v=>st(f.id,v)} placeholder={f.ph}/></div><LB text="Elementos clave"/><DL items={gl(f.id,[""])} onChange={v=>sl(f.id,v)} placeholder="Elemento" add="+ Agregar elemento"/></SC>)}
    </div>}

    {tab==="idea"&&<div>
      <SC title="💡 La Idea Principal" color={GREEN}><TA value={gt("central")} onChange={v=>st("central",v)} placeholder="Orquestación Colaborativa Inteligente..." rows={5}/></SC>
      <SC title="Concepto y IA"><LB text="Nombre del concepto"/><div style={{marginBottom:10}}><TI value={gt("nombre")} onChange={v=>st("nombre",v)} placeholder="Logística Colaborativa Hiper-Personalizada..."/></div><LB text="Uso de IA"/><TA value={gt("ia")} onChange={v=>st("ia",v)} placeholder="¿Cómo utiliza la IA para crear valor?"/></SC>
      <SC title="Foco y Diferenciación"><LB text="Foco principal"/><div style={{marginBottom:10}}><TA value={gt("foco")} onChange={v=>st("foco",v)} placeholder="Democratizar el acceso..."/></div><LB text="Diferenciadores"/><DL items={gl("diff",[""])} onChange={v=>sl("diff",v)} placeholder="Diferenciador" add="+ Agregar diferenciador"/></SC>
    </div>}
  </div>;
}

// ── FINANZAS ──────────────────────────────────────────────
function Finanzas({data,set}){
  const f=(k,def="")=>data[`fin_${k}`]!==undefined?data[`fin_${k}`]:def;
  const s=(k,v)=>set(`fin_${k}`,v);
  const gl=(k,def=[""])=>data[`fin_list_${k}`]||def;
  const sl=(k,v)=>set(`fin_list_${k}`,v);
  const meses=["Ene","Feb","Mar","Abr","May","Jun"];
  const ingPts=meses.map((m,i)=>({x:m,y:f(`im${i}`,0)}));
  const gasArr=meses.map((_,i)=>f(`gm${i}`,0));
  const ingArr=meses.map((_,i)=>f(`im${i}`,0));

  return <div>
    <h2 style={{color:A,marginTop:0,fontSize:22,marginBottom:6}}>📈 Finanzas</h2>
    <p style={{color:MUTED,fontSize:13,marginBottom:22}}>Ingresa tus datos y los gráficos se generan automáticamente.</p>

    <SC title="📊 Investigación de Mercado">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div><LB text="Tamaño del Mercado"/><TI value={f("mercado_tam")} onChange={v=>s("mercado_tam",v)} placeholder="Ej: Decenas de miles de millones anuales"/></div>
        <div><LB text="Segmento Objetivo"/><TI value={f("mercado_seg")} onChange={v=>s("mercado_seg",v)} placeholder="PYMES freight forwarders LATAM"/></div>
      </div>
      <LB text="USP"/><div style={{marginBottom:12}}><TA value={f("mercado_usp")} onChange={v=>s("mercado_usp",v)} placeholder="Red global semiexclusiva, confianza, protección de pagos..."/></div>
      <LB text="Competidores"/><DL items={gl("comp",[""])} onChange={v=>sl("comp",v)} placeholder="Competidor" add="+ Agregar competidor"/>
      <div style={{marginTop:12}}><LB text="Detalles"/><TA value={f("mercado_det")} onChange={v=>s("mercado_det",v)} placeholder="Descripción detallada del mercado..." rows={3}/></div>
    </SC>

    <SC title="💵 Costos Iniciales">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div><LB text="Costo Mínimo ($)"/><NI value={f("costo_min")} onChange={v=>s("costo_min",v)} placeholder="100000"/></div>
        <div><LB text="Costo Máximo ($)"/><NI value={f("costo_max")} onChange={v=>s("costo_max",v)} placeholder="180000"/></div>
      </div>
      {f("costo_min",0)>0&&f("costo_max",0)>0&&<div style={{background:"#0D1526",borderRadius:8,padding:12,marginBottom:12,textAlign:"center"}}>
        <div style={{fontSize:11,color:MUTED,marginBottom:4}}>Rango de Inversión Inicial</div>
        <div style={{fontSize:20,fontWeight:"bold",color:A}}>${Number(f("costo_min",0)).toLocaleString()} – ${Number(f("costo_max",0)).toLocaleString()}</div>
      </div>}
      <LB text="Ítems de Costo (Nombre / Mín / Máx)"/>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:8}}>
        {gl("citems",[{n:"",min:"",max:""}]).map((it,i)=>(
          <div key={i} style={{display:"flex",gap:6}}>
            <div style={{flex:2}}><TI value={it.n} onChange={v=>{const l=[...gl("citems",[])];l[i]={...l[i],n:v};sl("citems",l);}} placeholder="Concepto"/></div>
            <div style={{flex:1}}><NI value={it.min} onChange={v=>{const l=[...gl("citems",[])];l[i]={...l[i],min:v};sl("citems",l);}} placeholder="Mín"/></div>
            <div style={{flex:1}}><NI value={it.max} onChange={v=>{const l=[...gl("citems",[])];l[i]={...l[i],max:v};sl("citems",l);}} placeholder="Máx"/></div>
            {gl("citems",[]).length>1&&<button onClick={()=>sl("citems",gl("citems",[]).filter((_,j)=>j!==i))} style={{background:"transparent",border:`1px solid ${BORDER}`,color:MUTED,borderRadius:6,padding:"8px 9px",cursor:"pointer",fontSize:11}}
              onMouseEnter={e=>{e.target.style.borderColor=RED;e.target.style.color=RED;}} onMouseLeave={e=>{e.target.style.borderColor=BORDER;e.target.style.color=MUTED;}}>✕</button>}
          </div>
        ))}
      </div>
      <button onClick={()=>sl("citems",[...gl("citems",[]),{n:"",min:"",max:""}])} style={{background:"transparent",border:`1px dashed ${A}`,color:A,borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}
        onMouseEnter={e=>e.target.style.background=`${A}15`} onMouseLeave={e=>e.target.style.background="transparent"}>+ Agregar ítem</button>
    </SC>

    <SC title="📈 Proyecciones de Ingresos">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:14}}>
        <div><LB text="Ingreso Anual ($)"/><NI value={f("ing_anual")} onChange={v=>s("ing_anual",v)} placeholder="600000"/></div>
        <div><LB text="Membresía Central ($)"/><NI value={f("memb_central")} onChange={v=>s("memb_central",v)} placeholder="1400"/></div>
        <div><LB text="Membresía Sucursal ($)"/><NI value={f("memb_suc")} onChange={v=>s("memb_suc",v)} placeholder="250"/></div>
      </div>
      <LB text="Ingresos por Mes ($)"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8,marginBottom:14}}>
        {meses.map((m,i)=><div key={i}><div style={{fontSize:10,color:MUTED,marginBottom:4,textAlign:"center"}}>{m}</div><NI value={f(`im${i}`)} onChange={v=>s(`im${i}`,v)} placeholder="0" prefix=""/></div>)}
      </div>
      {ingPts.some(p=>p.y>0)&&<div style={{background:"#0D1526",borderRadius:8,padding:14,marginBottom:12}}><div style={{fontSize:11,color:MUTED,marginBottom:8}}>PROYECCIÓN — 6 MESES</div><LineChart pts={ingPts}/></div>}
      <LB text="Detalles"/><TA value={f("ing_det")} onChange={v=>s("ing_det",v)} placeholder="Modelo de suscripción premium..." rows={3}/>
    </SC>

    <SC title="🏦 Gastos Operativos">
      <div style={{marginBottom:12}}><LB text="Gasto Mensual Total ($)"/><NI value={f("gasto_total")} onChange={v=>s("gasto_total",v)} placeholder="25000"/></div>
      <LB text="Líneas de Gasto (Concepto / Monto)"/>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:8}}>
        {gl("glineas",[{n:"",m:""}]).map((it,i)=>(
          <div key={i} style={{display:"flex",gap:6}}>
            <div style={{flex:3}}><TI value={it.n} onChange={v=>{const l=[...gl("glineas",[])];l[i]={...l[i],n:v};sl("glineas",l);}} placeholder="Concepto de gasto"/></div>
            <div style={{flex:1}}><NI value={it.m} onChange={v=>{const l=[...gl("glineas",[])];l[i]={...l[i],m:v};sl("glineas",l);}} placeholder="0"/></div>
            {gl("glineas",[]).length>1&&<button onClick={()=>sl("glineas",gl("glineas",[]).filter((_,j)=>j!==i))} style={{background:"transparent",border:`1px solid ${BORDER}`,color:MUTED,borderRadius:6,padding:"8px 9px",cursor:"pointer",fontSize:11}}
              onMouseEnter={e=>{e.target.style.borderColor=RED;e.target.style.color=RED;}} onMouseLeave={e=>{e.target.style.borderColor=BORDER;e.target.style.color=MUTED;}}>✕</button>}
          </div>
        ))}
      </div>
      <button onClick={()=>sl("glineas",[...gl("glineas",[]),{n:"",m:""}])} style={{background:"transparent",border:`1px dashed ${A}`,color:A,borderRadius:6,padding:"6px 12px",cursor:"pointer",fontSize:12,fontFamily:"inherit"}}
        onMouseEnter={e=>e.target.style.background=`${A}15`} onMouseLeave={e=>e.target.style.background="transparent"}>+ Agregar línea de gasto</button>
      <div style={{marginTop:12}}><LB text="Gastos por Mes ($)"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8,margin:"8px 0 14px"}}>
        {meses.map((m,i)=><div key={i}><div style={{fontSize:10,color:MUTED,marginBottom:4,textAlign:"center"}}>{m}</div><NI value={f(`gm${i}`)} onChange={v=>s(`gm${i}`,v)} placeholder="0" prefix=""/></div>)}
      </div></div>
      {gasArr.some(v=>v>0)&&<div style={{background:"#0D1526",borderRadius:8,padding:14,marginBottom:12}}><div style={{fontSize:11,color:MUTED,marginBottom:8}}>GASTOS VS INGRESOS</div><BarChart gastos={gasArr} ingresos={ingArr} labels={meses}/></div>}
      <LB text="Desglose narrativo"/><TA value={f("gasto_det")} onChange={v=>s("gasto_det",v)} placeholder="Descripción de gastos..." rows={3}/>
    </SC>

    <SC title="⚖️ Punto de Equilibrio">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:12}}>
        <div><LB text="Suscripciones necesarias"/><NI value={f("eq_sus")} onChange={v=>s("eq_sus",v)} placeholder="80" prefix="#"/></div>
        <div><LB text="Precio promedio ($)"/><NI value={f("eq_precio")} onChange={v=>s("eq_precio",v)} placeholder="1400"/></div>
        <div><LB text="Gasto fijo mensual ($)"/><NI value={f("eq_fijo")} onChange={v=>s("eq_fijo",v)} placeholder="25000"/></div>
      </div>
      {f("eq_sus",0)>0&&f("eq_precio",0)>0&&<div style={{background:"#0D1526",borderRadius:8,padding:14,marginBottom:12,textAlign:"center"}}>
        <div style={{fontSize:11,color:MUTED,marginBottom:4}}>Punto de Equilibrio Mensual</div>
        <div style={{fontSize:24,fontWeight:"bold",color:GREEN}}>{Number(f("eq_sus",0)).toLocaleString()} suscripciones</div>
        <div style={{fontSize:12,color:MUTED,marginTop:4}}>= ${(Number(f("eq_sus",0))*Number(f("eq_precio",0))).toLocaleString()} / mes</div>
      </div>}
      <LB text="Análisis"/><TA value={f("eq_det")} onChange={v=>s("eq_det",v)} placeholder="El punto de equilibrio implica..." rows={3}/>
    </SC>

    <SC title="🚨 Financiamiento y Riesgos">
      <LB text="Opciones de Financiamiento"/><div style={{marginBottom:14}}><DL items={gl("finan",[""])} onChange={v=>sl("finan",v)} placeholder="Opción" add="+ Agregar opción"/></div>
      <LB text="Riesgos Clave"/><div style={{marginBottom:14}}><DL items={gl("riesgos",[""])} onChange={v=>sl("riesgos",v)} placeholder="Riesgo" add="+ Agregar riesgo"/></div>
      <LB text="Detalles"/><TA value={f("fin_det")} onChange={v=>s("fin_det",v)} placeholder="Opciones de financiación y mitigación de riesgos..." rows={3}/>
    </SC>

    <SC title="📊 KPIs Financieros">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:14}}>
        {[{k:"kpi_cac",l:"CAC ($)",ph:"1250",pr:"$"},{k:"kpi_ltv",l:"LTV ($)",ph:"12000",pr:"$"},{k:"kpi_churn",l:"Churn Rate (%)",ph:"6.5",pr:"%"},{k:"kpi_mrr",l:"MRR ($)",ph:"50000",pr:"$"},{k:"kpi_margen",l:"Margen Bruto (%)",ph:"75",pr:"%"},{k:"kpi_rec",l:"Recuperación CAC (meses)",ph:"15",pr:"#"}].map(kp=>(
          <div key={kp.k} style={{background:"#0D1526",borderRadius:8,padding:14}}>
            <div style={{fontSize:10,color:MUTED,marginBottom:8,fontFamily:"monospace"}}>{kp.l.toUpperCase()}</div>
            <NI value={f(kp.k)} onChange={v=>s(kp.k,v)} placeholder={kp.ph} prefix={kp.pr}/>
            {f(kp.k,0)>0&&<div style={{fontSize:18,fontWeight:"bold",color:A,marginTop:8}}>{kp.pr!=="$"&&kp.pr!=="#"?kp.pr:kp.pr==="$"?"$":""}{Number(f(kp.k,0)).toLocaleString()}{kp.pr==="%"?"%":kp.k==="kpi_rec"?" meses":""}</div>}
          </div>
        ))}
      </div>
      <LB text="Análisis de KPIs"/><TA value={f("kpi_det")} onChange={v=>s("kpi_det",v)} placeholder="Análisis de los KPIs y su importancia..." rows={4}/>
    </SC>
  </div>;
}

// ── GTM ───────────────────────────────────────────────────
function GTM({data,set}){
  const f=(k,def="")=>data[`gtm_${k}`]||def;
  const s=(k,v)=>set(`gtm_${k}`,v);
  const gl=(k,def=[""])=>data[`gtm_list_${k}`]||def;
  const sl=(k,v)=>set(`gtm_list_${k}`,v);
  const FASES=[{id:"f1",t:"Fase 1",sub:"Pre-lanzamiento y Piloto",ic:"🔬"},{id:"f2",t:"Fase 2",sub:"Lanzamiento Oficial",ic:"🚀"},{id:"f3",t:"Fase 3",sub:"Consolidación Regional",ic:"🌎"},{id:"f4",t:"Fase 4",sub:"Optimización y Fidelización",ic:"⚙️"},{id:"f5",t:"Fase 5",sub:"Liderazgo Global",ic:"🏆"}];

  return <div>
    <h2 style={{color:A,marginTop:0,fontSize:22,marginBottom:6}}>🚀 Estrategia de Salida al Mercado</h2>
    <p style={{color:MUTED,fontSize:13,marginBottom:20}}>Define tu estrategia Go-To-Market completa.</p>

    <SC title="📋 Introducción"><TA value={f("intro")} onChange={v=>s("intro",v)} placeholder="Una estrategia GTM bien definida es crucial para el lanzamiento exitoso de Bling..." rows={4}/></SC>

    {/* 5 FASES */}
    <div style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:20,marginBottom:14}}>
      <h3 style={{margin:"0 0 16px",color:A,fontSize:14}}>🗺 Hoja de Ruta — 5 Fases</h3>
      <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:8}}>
        {FASES.map((fase,i)=><div key={fase.id} style={{flex:"0 0 175px",background:"#0D1526",border:`1px solid ${BORDER}`,borderRadius:10,padding:14,position:"relative"}}>
          <div style={{width:34,height:34,borderRadius:"50%",border:`2px solid ${GREEN}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,marginBottom:8}}>{fase.ic}</div>
          <div style={{fontSize:10,color:A,fontWeight:"bold",marginBottom:3,fontFamily:"monospace"}}>{fase.t}</div>
          <div style={{fontSize:11,color:TEXT,fontWeight:"bold",marginBottom:8}}>{fase.sub}</div>
          <TA value={f(fase.id)} onChange={v=>s(fase.id,v)} placeholder={`Descripción ${fase.t}...`} rows={3}/>
          {i<FASES.length-1&&<div style={{position:"absolute",right:-12,top:"35%",color:A,fontSize:14,zIndex:1}}>→</div>}
        </div>)}
      </div>
    </div>

    {/* FILA 1: 3 columnas */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
      <div style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:16}}>
        <h3 style={{margin:"0 0 12px",color:A,fontSize:13}}>🎯 Mercado Objetivo</h3>
        <LB text="Segmentos"/><div style={{marginBottom:10}}><DL items={gl("segs",[""])} onChange={v=>sl("segs",v)} placeholder="Segmento" useTA add="+ Agregar segmento"/></div>
        <LB text="Detalles de investigación"/><TA value={f("mkt_det")} onChange={v=>s("mkt_det",v)} placeholder="La investigación de mercado..." rows={3}/>
      </div>
      <div style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:16}}>
        <h3 style={{margin:"0 0 12px",color:GREEN,fontSize:13}}>💚 Propuesta de Valor</h3>
        <LB text="Declaración de valor"/><div style={{marginBottom:8}}><TA value={f("pv_dec")} onChange={v=>s("pv_dec",v)} placeholder='"Bling democratiza el acceso..."' rows={3}/></div>
        <LB text="Posicionamiento"/><div style={{marginBottom:8}}><TA value={f("pv_pos")} onChange={v=>s("pv_pos",v)} placeholder="Bling se posicionará como..." rows={2}/></div>
        <LB text="Reforzando la posición"/><TA value={f("pv_ref")} onChange={v=>s("pv_ref",v)} placeholder="Proceso de verificación de miembros..." rows={2}/>
      </div>
      <div style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:16}}>
        <h3 style={{margin:"0 0 12px",color:BLUE,fontSize:13}}>💲 Estrategia de Precios</h3>
        <LB text="Puntos clave"/><div style={{marginBottom:10}}><DL items={gl("precios",[""])} onChange={v=>sl("precios",v)} placeholder="Punto de precio" add="+ Agregar punto"/></div>
        <LB text="Detalles"/><TA value={f("precios_det")} onChange={v=>s("precios_det",v)} placeholder="Modelo de suscripción anual premium..." rows={3}/>
      </div>
    </div>

    {/* FILA 2: 3 columnas */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:14}}>
      <div style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:16}}>
        <h3 style={{margin:"0 0 12px",color:A,fontSize:13}}>🚚 Canales de Distribución</h3>
        <LB text="Canales principales"/><div style={{marginBottom:10}}><DL items={gl("canales",[""])} onChange={v=>sl("canales",v)} placeholder="Canal" add="+ Agregar canal"/></div>
        <LB text="Estrategia de Canal"/><TA value={f("canales_det")} onChange={v=>s("canales_det",v)} placeholder="Enfoque híbrido..." rows={3}/>
      </div>
      <div style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:16}}>
        <h3 style={{margin:"0 0 12px",color:GREEN,fontSize:13}}>📣 Plan de Marketing</h3>
        <LB text="Tácticas"/><div style={{marginBottom:10}}><DL items={gl("mkt_tac",[""])} onChange={v=>sl("mkt_tac",v)} placeholder="Táctica" add="+ Agregar táctica"/></div>
        <LB text="Estrategia de Marketing"/><TA value={f("mkt_det")} onChange={v=>s("mkt_det",v)} placeholder="Marketing de contenidos, campañas digitales..." rows={3}/>
      </div>
      <div style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:16}}>
        <h3 style={{margin:"0 0 12px",color:BLUE,fontSize:13}}>💼 Estrategia de Ventas</h3>
        <LB text="Tácticas"/><div style={{marginBottom:10}}><DL items={gl("ventas_tac",[""])} onChange={v=>sl("ventas_tac",v)} placeholder="Táctica" add="+ Agregar táctica"/></div>
        <LB text="Enfoque de Ventas"/><TA value={f("ventas_det")} onChange={v=>s("ventas_det",v)} placeholder="Enfoque consultivo y relacional..." rows={3}/>
      </div>
    </div>

    {/* FILA 3: 2 columnas */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
      <div style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:16}}>
        <h3 style={{margin:"0 0 12px",color:A,fontSize:13}}>🤝 Asociaciones y Colaboraciones</h3>
        <DL items={gl("alianzas",[""])} onChange={v=>sl("alianzas",v)} placeholder="Asociación estratégica" add="+ Agregar asociación"/>
      </div>
      <div style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:16}}>
        <h3 style={{margin:"0 0 12px",color:GREEN,fontSize:13}}>📊 KPIs de GTM</h3>
        <DL items={gl("kpis",[""])} onChange={v=>sl("kpis",v)} placeholder="KPI" add="+ Agregar KPI"/>
      </div>
    </div>

    <SC title="✅ Conclusión"><TA value={f("conclusion")} onChange={v=>s("conclusion",v)} placeholder="La estrategia GTM de Bling se cimenta en la diferenciación por valor y confianza..." rows={4}/></SC>
  </div>;
}

// ── ANÁLISIS COMPETITIVO (VRIO) ───────────────────────────
const VRIO_ITEMS=["valor","rareza","imitabilidad","organizacion"];
const VRIO_ICONS={valor:"💎",rareza:"✨",imitabilidad:"🔒",organizacion:"🏛"};
const RESULTADOS=["Ventaja Competitiva Sostenible","Ventaja Competitiva Temporal","Paridad Competitiva","Desventaja Competitiva"];
const RESULTADO_COLORS={"Ventaja Competitiva Sostenible":GREEN,"Ventaja Competitiva Temporal":BLUE,"Paridad Competitiva":A,"Desventaja Competitiva":RED};

function VRIOCard({recurso,idx,onChange,onRemove}){
  const upd=(k,v)=>onChange({...recurso,[k]:v});
  const updV=(dim,k,v)=>onChange({...recurso,vrio:{...recurso.vrio,[dim]:{...(recurso.vrio?.[dim]||{}),[k]:v}}});

  return <div style={{background:CARD2,border:`1px solid ${BORDER}`,borderRadius:12,padding:20,marginBottom:16}}>
    {/* Header */}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
      <div style={{flex:1,marginRight:12}}>
        <LB text={`Recurso ${idx+1} — Nombre`}/>
        <TI value={recurso.nombre||""} onChange={v=>upd("nombre",v)} placeholder="Ej: Red de Confianza Global Semiexclusiva"/>
      </div>
      <button onClick={onRemove} style={{background:"transparent",border:`1px solid ${BORDER}`,color:MUTED,borderRadius:6,padding:"8px 10px",cursor:"pointer",fontSize:12,flexShrink:0,marginTop:18}}
        onMouseEnter={e=>{e.target.style.borderColor=RED;e.target.style.color=RED;}} onMouseLeave={e=>{e.target.style.borderColor=BORDER;e.target.style.color=MUTED;}}>✕ Eliminar</button>
    </div>
    <div style={{marginBottom:14}}>
      <LB text="Descripción del recurso"/>
      <TA value={recurso.desc||""} onChange={v=>upd("desc",v)} placeholder="Describe qué es este recurso o capacidad..." rows={2}/>
    </div>

    {/* VRIO Grid */}
    <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
      {VRIO_ITEMS.map(dim=>{
        const d=recurso.vrio?.[dim]||{};
        const aplica=d.aplica!==false;
        return <div key={dim} style={{background:"#0D1526",borderRadius:8,padding:14,border:`1px solid ${aplica?`${GREEN}44`:`${RED}44`}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
            <button onClick={()=>updV(dim,"aplica",!aplica)} style={{width:22,height:22,borderRadius:"50%",border:`2px solid ${aplica?GREEN:RED}`,background:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:aplica?GREEN:RED,flexShrink:0}}>
              {aplica?"✓":"✕"}
            </button>
            <span style={{fontSize:13,fontWeight:"bold",color:aplica?GREEN:RED,textTransform:"capitalize"}}>{VRIO_ICONS[dim]} {dim.charAt(0).toUpperCase()+dim.slice(1)}</span>
          </div>
          <TA value={d.desc||""} onChange={v=>updV(dim,"desc",v)} placeholder={`Análisis de ${dim} para este recurso...`} rows={2}/>
        </div>;
      })}
    </div>

    {/* Resultado */}
    <div style={{marginBottom:10}}>
      <LB text="Resultado del análisis VRIO"/>
      <select value={recurso.resultado||""} onChange={e=>upd("resultado",e.target.value)}
        style={{background:"#0D1526",border:`1px solid ${BORDER}`,borderRadius:6,color:recurso.resultado?RESULTADO_COLORS[recurso.resultado]||TEXT:MUTED,padding:"8px 12px",fontSize:13,fontFamily:"inherit",outline:"none",cursor:"pointer",width:"100%",fontWeight:"bold"}}>
        <option value="">Seleccionar resultado...</option>
        {RESULTADOS.map(r=><option key={r} value={r} style={{color:RESULTADO_COLORS[r]||TEXT}}>{r}</option>)}
      </select>
    </div>
    {recurso.resultado&&<div style={{display:"inline-block",background:`${RESULTADO_COLORS[recurso.resultado]}22`,border:`1px solid ${RESULTADO_COLORS[recurso.resultado]}`,borderRadius:20,padding:"4px 14px",fontSize:12,color:RESULTADO_COLORS[recurso.resultado],fontWeight:"bold",marginBottom:10}}>
      {recurso.resultado}
    </div>}
    <LB text="Conclusión del recurso"/>
    <TA value={recurso.conclusion||""} onChange={v=>upd("conclusion",v)} placeholder="Explica por qué este recurso genera (o no) una ventaja competitiva sostenible..." rows={3}/>
  </div>;
}

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

export default function PlanApp(){
  const[active,setActive]=useState("dashboard");
  const[data,setData]=useState({});
  const[saved,setSaved]=useState(false);
  const[loading,setLoading]=useState(true);
  const[menuOpen,setMenuOpen]=useState(false);
  const[isMobile,setIsMobile]=useState(window.innerWidth<=768);

  useEffect(()=>{
    const onResize=()=>setIsMobile(window.innerWidth<=768);
    window.addEventListener('resize',onResize);
    return()=>window.removeEventListener('resize',onResize);
  },[]);

  useEffect(()=>{(async()=>{try{const r=await window.storage.get("bling_v4");if(r?.value)setData(JSON.parse(r.value));}catch(_){}setLoading(false);})();},[]);

  const handleChange=(k,v)=>setData(p=>({...p,[k]:v}));
  const handleSave=async()=>{try{await window.storage.set("bling_v4",JSON.stringify(data));setSaved(true);setTimeout(()=>setSaved(false),2500);}catch(_){}};

  if(loading)return <div style={{background:DARK,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:A,fontFamily:"monospace"}}>Cargando...</div>;

  const prog=totalPct(data);
  const wide=active==="gtm"||active==="finanzas";
  const navTo=(id)=>{setActive(id);setMenuOpen(false);};

  return <div style={{background:DARK,minHeight:"100vh",display:"flex",flexDirection:"column",fontFamily:"'Segoe UI',sans-serif",color:TEXT}}>

    {/* TOPBAR */}
    <div style={{background:CARD,borderBottom:`1px solid ${BORDER}`,padding:"10px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,zIndex:99,position:"relative"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        {isMobile&&<button onClick={()=>setMenuOpen(!menuOpen)} style={{background:"transparent",border:`1px solid ${BORDER}`,color:TEXT,borderRadius:6,padding:"6px 10px",cursor:"pointer",fontSize:18,lineHeight:1,marginRight:4}}>☰</button>}
        <div style={{width:28,height:28,background:A,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",color:DARK,fontSize:15,flexShrink:0}}>B</div>
        {!isMobile&&<div><div style={{fontSize:13,fontWeight:"bold",color:TEXT}}>Bling Logistics Network</div><div style={{fontSize:10,color:MUTED,fontFamily:"monospace",letterSpacing:1}}>PLAN ESTRATÉGICO 2026</div></div>}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        {!isMobile&&<div style={{display:"flex",alignItems:"center",gap:6}}>
          <div style={{width:80,height:5,background:"#1e3a5f",borderRadius:3}}><div style={{width:`${prog}%`,height:"100%",background:prog===100?GREEN:A,borderRadius:3,transition:"width 0.4s"}}/></div>
          <span style={{fontSize:12,color:A,fontFamily:"monospace"}}>{prog}%</span>
        </div>}
        {isMobile&&<span style={{fontSize:12,color:A,fontFamily:"monospace",fontWeight:"bold"}}>{prog}%</span>}
        <button onClick={handleSave} style={{background:saved?GREEN:A,color:DARK,border:"none",borderRadius:6,padding:"7px 12px",fontWeight:"bold",cursor:"pointer",fontSize:12,fontFamily:"monospace",transition:"background 0.3s",whiteSpace:"nowrap"}}>
          {saved?"✓":isMobile?"💾":"💾 GUARDAR"}
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
        </div>
      </div>
    </div>
  </div>;
}
