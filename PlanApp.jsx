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
  {sec:"Documentos",items:[{id:"reportes",ic:"📄",label:"Reportes y PDF"}]},
  {sec:"Herramientas",items:[{id:"pitch",ic:"🎤",label:"Presentación de pitch",dis:true}]},
];

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
