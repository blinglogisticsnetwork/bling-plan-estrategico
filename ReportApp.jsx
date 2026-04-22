import React, { useState, useEffect } from 'react'

const LOGO_B64='data:image/png;base64,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'
const SUPABASE_URL='https://bokqsvfhhvqbynktbwjq.supabase.co'
const SUPABASE_KEY='sb_publishable_mA2iDsEPngMk_oxfh7GeHg__aGCT9Zs'

const A="#F59E0B",DARK="#0A0F1E",CARD="#111827",CARD2="#1A2235",BORDER="#2D3748",TEXT="#E2E8F0",MUTED="#64748B",GREEN="#10B981",BLUE="#3B82F6",RED="#EF4444",PURPLE="#A855F7"

// ── AUTH ─────────────────────────────────────────────────
async function signIn(email,password){
  const r=await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`,{method:'POST',headers:{'apikey':SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify({email,password})})
  return r.json()
}
async function loadData(token){
  try{
    // Load both plan data and BSC data
    const [r1,r2]=await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/plan_data?key=eq.bling_v4`,{headers:{'apikey':SUPABASE_KEY,'Authorization':`Bearer ${token}`}}),
      fetch(`${SUPABASE_URL}/rest/v1/plan_data?key=eq.bling_bsc`,{headers:{'apikey':SUPABASE_KEY,'Authorization':`Bearer ${token}`}})
    ])
    const [rows1,rows2]=await Promise.all([r1.json(),r2.json()])
    const planData=rows1?.[0]?.value?JSON.parse(rows1[0].value):{}
    const bscData=rows2?.[0]?.value?JSON.parse(rows2[0].value):[]
    return {...planData, __bsc_kpis: bscData}
  }catch{return{}}
}

// ── LOGIN ─────────────────────────────────────────────────
function Login({onLogin}){
  const[email,setEmail]=useState('')
  const[pass,setPass]=useState('')
  const[err,setErr]=useState('')
  const[loading,setLoading]=useState(false)
  const go=async()=>{
    setLoading(true);setErr('')
    const r=await signIn(email,pass)
    if(r.access_token){localStorage.setItem('bling_token',r.access_token);onLogin(r.access_token)}
    else setErr('Email o contraseña incorrectos')
    setLoading(false)
  }
  const inp={width:'100%',background:'#0D1526',border:`1px solid ${BORDER}`,borderRadius:8,color:TEXT,padding:'12px 14px',fontSize:14,outline:'none',boxSizing:'border-box',fontFamily:'inherit',marginBottom:14}
  return <div style={{background:DARK,minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Segoe UI',sans-serif"}}>
    <div style={{background:CARD,border:`1px solid ${BORDER}`,borderRadius:16,padding:40,width:'100%',maxWidth:400}}>
      <div style={{textAlign:'center',marginBottom:28}}>
        <div style={{width:52,height:52,background:A,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',color:DARK,fontSize:22,margin:'0 auto 14px'}}>B</div>
        <h2 style={{color:TEXT,margin:'0 0 4px',fontSize:20}}>Bling Logistics Network</h2>
        <p style={{color:A,margin:'0 0 2px',fontSize:11,fontFamily:'monospace',letterSpacing:2}}>REPORTES Y DOCUMENTOS</p>
      </div>
      <label style={{display:'block',fontSize:11,color:MUTED,marginBottom:5,fontFamily:'monospace',letterSpacing:1}}>EMAIL</label>
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com" style={inp} onKeyDown={e=>e.key==='Enter'&&go()}/>
      <label style={{display:'block',fontSize:11,color:MUTED,marginBottom:5,fontFamily:'monospace',letterSpacing:1}}>CONTRASEÑA</label>
      <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" style={{...inp,marginBottom:err?8:20}} onKeyDown={e=>e.key==='Enter'&&go()}/>
      {err&&<p style={{color:RED,fontSize:12,margin:'0 0 14px'}}>{err}</p>}
      <button onClick={go} disabled={loading} style={{width:'100%',background:A,color:DARK,border:'none',borderRadius:8,padding:'13px',fontWeight:'bold',cursor:'pointer',fontSize:14,fontFamily:'inherit'}}>
        {loading?'Entrando...':'Ingresar →'}
      </button>
    </div>
  </div>
}

// ── HELPERS ───────────────────────────────────────────────
const MODULES=[
  {id:'contexto',label:'Contexto',icon:'🏢',color:A,sections:[
    {title:'Acerca de Bling',fields:[{k:'ctx_acerca_mision',l:'Misión'},{k:'ctx_acerca_vision',l:'Visión'},{k:'ctx_acerca_valores',l:'Valores'},{k:'ctx_acerca_desc',l:'Descripción'}]},
    {title:'Perspectiva de la Industria',fields:[{k:'ctx_industria_global',l:'Contexto Global'},{k:'ctx_industria_dolor',l:'Dolores'},{k:'ctx_industria_oport',l:'Oportunidad'},{k:'ctx_industria_tend',l:'Tendencias'}]},
    {title:'Why Bling',fields:[{k:'ctx_why_ahora',l:'¿Por qué ahora?'},{k:'ctx_why_nosotros',l:'¿Por qué Bling?'},{k:'ctx_why_diff',l:'Diferencial Humano'},{k:'ctx_why_impacto',l:'Impacto'}]},
  ]},
  {id:'marcos',label:'Marcos Estratégicos',icon:'🧭',color:BLUE,tabs:[
    {id:'estrategia',label:'Estrategia',lists:['est','marc','req','ing'],listLabels:['Estrategias de Negocio','Marcos de Negocio','Requisitos','Fuentes de Ingreso']},
    {id:'swot',label:'SWOT',lists:['for','deb','opp','ame'],listLabels:['💪 Fortalezas','⚠️ Debilidades','🌱 Oportunidades','🔥 Amenazas'],colors:[GREEN,A,BLUE,RED]},
    {id:'pestel',label:'PESTEL',texts:['pol','eco','soc','tec','amb','leg'],textLabels:['Político','Económico','Social','Tecnológico','Ambiental','Legal']},
    {id:'porter',label:'5 Fuerzas de Porter',texts:['nue','sus','pro','com','riv'],nivelesKeys:['nue_n','sus_n','pro_n','com_n','riv_n'],textLabels:['Nuevos competidores','Sustitutos','Poder proveedor','Poder comprador','Rivalidad']},
    {id:'catwoe',label:'CATWOE',texts:['cli','act','tra','vis','own','env'],textLabels:['C – Clientes','A – Actores','T – Transformación','W – Visión del Mundo','O – Propietarios','E – Restricciones']},
    {id:'idea',label:'Idea Revolucionaria',texts:['central','nombre','ia','foco','impacto'],textLabels:['Idea Central','Nombre del Concepto','Uso de IA','Foco Principal','Impacto']},
  ]},
  {id:'finanzas',label:'Finanzas',icon:'📈',color:GREEN},
  {id:'gtm',label:'Estrategia GTM',icon:'🚀',color:PURPLE},
  {id:'competitivo',label:'Análisis Competitivo',icon:'⚔️',color:RED},
  {id:'pvs',label:'Propuestas Únicas de Venta',icon:'💎',color:A},
  {id:'mvp',label:'Camino a un MVP',icon:'🗺',color:GREEN},
  {id:'cliente',label:'Perfil del Cliente',icon:'👤',color:BLUE},
  {id:'bsc',label:'Cuadro de Mando Integral',icon:'🎯',color:A},
]

function val(data,key,def=''){return data?.[key]||def}
function lst(data,tab,key){return data?.[`mrk_${tab}_lists`]?.[key]||[]}
function txt(data,tab,key){return data?.[`mrk_${tab}_texts`]?.[key]||''}

// ── SECTION BLOCK ─────────────────────────────────────────
function Block({title,color=A,children}){
  return <div style={{marginBottom:24,breakInside:'avoid'}}>
    <h3 style={{color,fontSize:15,fontWeight:'bold',margin:'0 0 12px',paddingBottom:6,borderBottom:`2px solid ${color}44`}}>{title}</h3>
    {children}
  </div>
}

function Field({label,value}){
  if(!value)return null
  return <div style={{marginBottom:10}}>
    <div style={{fontSize:11,color:MUTED,fontFamily:'monospace',letterSpacing:1,marginBottom:3}}>{label.toUpperCase()}</div>
    <div style={{fontSize:13,color:TEXT,lineHeight:1.7,background:CARD2,borderRadius:6,padding:'10px 12px',whiteSpace:'pre-wrap'}}>{value}</div>
  </div>
}

function ListItems({label,items,color=A}){
  const filled=items.filter(i=>i?.trim())
  if(!filled.length)return null
  return <div style={{marginBottom:10}}>
    <div style={{fontSize:11,color:MUTED,fontFamily:'monospace',letterSpacing:1,marginBottom:6}}>{label.toUpperCase()}</div>
    <div style={{display:'flex',flexDirection:'column',gap:4}}>
      {filled.map((item,i)=><div key={i} style={{display:'flex',gap:8,alignItems:'flex-start',background:CARD2,borderRadius:6,padding:'8px 12px'}}>
        <span style={{color,fontSize:12,flexShrink:0,marginTop:1}}>✓</span>
        <span style={{fontSize:13,color:TEXT,lineHeight:1.6}}>{item}</span>
      </div>)}
    </div>
  </div>
}

// ── MODULE VIEWS ──────────────────────────────────────────
function ContextoView({data}){
  return <div>
    {[{id:'acerca',title:'Acerca de Bling',fields:[{k:'mision',l:'Misión'},{k:'vision',l:'Visión'},{k:'valores',l:'Valores'},{k:'desc',l:'Descripción'}]},
      {id:'industria',title:'Perspectiva de la Industria',fields:[{k:'global',l:'Contexto Global'},{k:'dolor',l:'Dolores de la Industria'},{k:'oport',l:'Oportunidad de Mercado'},{k:'tend',l:'Tendencias Clave'}]},
      {id:'why',title:'Why Bling',fields:[{k:'ahora',l:'¿Por qué ahora?'},{k:'nosotros',l:'¿Por qué Bling?'},{k:'diff',l:'El Diferencial Humano'},{k:'impacto',l:'Impacto Esperado'}]}
    ].map(s=><Block key={s.id} title={s.title} color={A}>
      {s.fields.map(f=><Field key={f.k} label={f.l} value={val(data,`ctx_${s.id}_${f.k}`)}/>)}
    </Block>)}
  </div>
}

function MarcosView({data}){
  const TABS=[
    {id:'estrategia',label:'Estrategia',content:()=><div>
      <ListItems label="Estrategias de Negocio" items={lst(data,'estrategia','est')} color={BLUE}/>
      <ListItems label="Marcos de Negocio" items={lst(data,'estrategia','marc')} color={GREEN}/>
      <ListItems label="Requisitos" items={lst(data,'estrategia','req')} color={A}/>
      <ListItems label="Fuentes de Ingreso" items={lst(data,'estrategia','ing')} color={PURPLE}/>
    </div>},
    {id:'swot',label:'Análisis SWOT',content:()=><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
      {[{k:'for',l:'💪 Fortalezas',c:GREEN},{k:'deb',l:'⚠️ Debilidades',c:A},{k:'opp',l:'🌱 Oportunidades',c:BLUE},{k:'ame',l:'🔥 Amenazas',c:RED}].map(g=>
        <div key={g.k} style={{background:CARD2,borderRadius:8,padding:14,border:`1px solid ${g.c}44`}}>
          <div style={{fontSize:13,fontWeight:'bold',color:g.c,marginBottom:8}}>{g.l}</div>
          {lst(data,'swot',g.k).filter(i=>i?.trim()).map((item,i)=><div key={i} style={{display:'flex',gap:6,marginBottom:5}}>
            <span style={{color:g.c,fontSize:11}}>✓</span><span style={{fontSize:12,color:TEXT}}>{item}</span>
          </div>)}
        </div>
      )}
    </div>},
    {id:'pestel',label:'Análisis PESTEL',content:()=><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
      {[{k:'pol',l:'🏛 Político'},{k:'eco',l:'💵 Económico'},{k:'soc',l:'👥 Social'},{k:'tec',l:'⚙️ Tecnológico'},{k:'amb',l:'🌿 Ambiental'},{k:'leg',l:'⚖️ Legal'}].map(f=>
        txt(data,'pestel',f.k)?<div key={f.k} style={{background:CARD2,borderRadius:8,padding:14}}>
          <div style={{fontSize:12,fontWeight:'bold',color:A,marginBottom:6}}>{f.l}</div>
          <div style={{fontSize:12,color:TEXT,lineHeight:1.6}}>{txt(data,'pestel',f.k)}</div>
        </div>:null
      )}
    </div>},
    {id:'porter',label:'5 Fuerzas de Porter',content:()=><div>
      {[{k:'nue',l:'→ Nuevos competidores'},{k:'sus',l:'⇄ Sustitutos'},{k:'pro',l:'📦 Poder proveedor'},{k:'com',l:'🛒 Poder comprador'},{k:'riv',l:'🔥 Rivalidad'}].map(f=>{
        const nivel=txt(data,'porter',`${f.k}_n`);const desc=txt(data,'porter',f.k);
        if(!nivel&&!desc)return null;
        const nc=nivel==='Alto'?RED:nivel==='Moderado'?A:GREEN;
        return <div key={f.k} style={{background:CARD2,borderRadius:8,padding:14,marginBottom:10,border:`1px solid ${nc}44`}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
            <span style={{fontSize:13,fontWeight:'bold',color:TEXT}}>{f.l}</span>
            {nivel&&<span style={{background:`${nc}22`,color:nc,border:`1px solid ${nc}55`,borderRadius:20,padding:'2px 10px',fontSize:11,fontWeight:'bold'}}>{nivel}</span>}
          </div>
          {desc&&<div style={{fontSize:12,color:TEXT,lineHeight:1.6}}>{desc}</div>}
        </div>
      })}
    </div>},
    {id:'catwoe',label:'Análisis CATWOE',content:()=><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
      {[{k:'cli',l:'👤 C – Clientes'},{k:'act',l:'🎭 A – Actores'},{k:'tra',l:'⚙️ T – Transformación'},{k:'vis',l:'🌍 W – Visión del Mundo'},{k:'own',l:'🏛 O – Propietarios'},{k:'env',l:'🌿 E – Restricciones'}].map(f=>
        txt(data,'catwoe',f.k)?<div key={f.k} style={{background:CARD2,borderRadius:8,padding:14}}>
          <div style={{fontSize:12,fontWeight:'bold',color:PURPLE,marginBottom:6}}>{f.l}</div>
          <div style={{fontSize:12,color:TEXT,lineHeight:1.6}}>{txt(data,'catwoe',f.k)}</div>
        </div>:null
      )}
    </div>},
    {id:'idea',label:'Idea Revolucionaria',content:()=><div>
      {txt(data,'idea','central')&&<div style={{background:`${GREEN}15`,border:`1px solid ${GREEN}44`,borderRadius:8,padding:16,marginBottom:12}}>
        <div style={{fontSize:12,fontWeight:'bold',color:GREEN,marginBottom:6}}>💡 La Idea Central</div>
        <div style={{fontSize:13,color:TEXT,lineHeight:1.7}}>{txt(data,'idea','central')}</div>
      </div>}
      {[{k:'nombre',l:'Nombre del Concepto'},{k:'ia',l:'Uso de IA'},{k:'foco',l:'Foco Principal'},{k:'impacto',l:'Impacto Esperado'}].map(f=>
        txt(data,'idea',f.k)?<Field key={f.k} label={f.l} value={txt(data,'idea',f.k)}/>:null
      )}
    </div>},
  ]
  const[tab,setTab]=useState('estrategia')
  return <div>
    <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:16}}>
      {TABS.map(t=>{const on=t.id===tab;return<button key={t.id} onClick={()=>setTab(t.id)} style={{background:on?A:CARD2,color:on?DARK:TEXT,border:`1px solid ${on?A:BORDER}`,borderRadius:20,padding:'5px 14px',fontSize:11,cursor:'pointer',fontFamily:'inherit',fontWeight:on?'bold':'normal'}}>{t.label}</button>})}
    </div>
    {TABS.find(t=>t.id===tab)?.content()}
  </div>
}

function FinanzasView({data}){
  const f=(k)=>data?.[`fin_${k}`]||''
  const gl=(k)=>data?.[`fin_list_${k}`]||[]
  return <div>
    {f('mercado_tam')&&<Block title="📊 Investigación de Mercado" color={BLUE}>
      <Field label="Tamaño del Mercado" value={f('mercado_tam')}/>
      <Field label="Segmento Objetivo" value={f('mercado_seg')}/>
      <Field label="USP" value={f('mercado_usp')}/>
      <ListItems label="Competidores" items={gl('comp')}/>
    </Block>}
    {(f('costo_min')||f('costo_max'))&&<Block title="💵 Costos Iniciales" color={A}>
      {(f('costo_min')&&f('costo_max'))&&<div style={{background:CARD2,borderRadius:8,padding:14,marginBottom:10,textAlign:'center'}}>
        <div style={{fontSize:11,color:MUTED}}>Rango de Inversión</div>
        <div style={{fontSize:20,fontWeight:'bold',color:A}}>${Number(f('costo_min')).toLocaleString()} – ${Number(f('costo_max')).toLocaleString()}</div>
      </div>}
      <Field label="Desglose" value={f('costos_det')}/>
    </Block>}
    {f('ing_anual')&&<Block title="📈 Proyecciones de Ingresos" color={GREEN}>
      <div style={{background:CARD2,borderRadius:8,padding:14,marginBottom:10,textAlign:'center'}}>
        <div style={{fontSize:11,color:MUTED}}>Ingreso Anual Proyectado</div>
        <div style={{fontSize:24,fontWeight:'bold',color:GREEN}}>${Number(f('ing_anual')).toLocaleString()}</div>
      </div>
      <Field label="Detalles" value={f('ing_det')}/>
    </Block>}
    {f('gasto_total')&&<Block title="🏦 Gastos Operativos" color={RED}>
      <div style={{background:CARD2,borderRadius:8,padding:14,marginBottom:10,textAlign:'center'}}>
        <div style={{fontSize:11,color:MUTED}}>Gasto Mensual Total</div>
        <div style={{fontSize:24,fontWeight:'bold',color:RED}}>${Number(f('gasto_total')).toLocaleString()}/mes</div>
      </div>
      <Field label="Desglose" value={f('gasto_det')}/>
    </Block>}
    {f('eq_sus')&&<Block title="⚖️ Punto de Equilibrio" color={PURPLE}>
      <div style={{background:CARD2,borderRadius:8,padding:14,marginBottom:10,textAlign:'center'}}>
        <div style={{fontSize:20,fontWeight:'bold',color:PURPLE}}>{f('eq_sus')} suscripciones anuales</div>
        <div style={{fontSize:12,color:MUTED}}>= ${(Number(f('eq_sus'))*Number(f('eq_precio'))).toLocaleString()} / mes</div>
      </div>
    </Block>}
    <Block title="📊 KPIs Financieros" color={A}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
        {[{k:'kpi_cac',l:'CAC',u:'$'},{k:'kpi_ltv',l:'LTV',u:'$'},{k:'kpi_churn',l:'Churn Rate',u:'%'},{k:'kpi_mrr',l:'MRR',u:'$'},{k:'kpi_margen',l:'Margen Bruto',u:'%'},{k:'kpi_rec',l:'Recuperación CAC',u:' meses'}].map(kp=>
          f(kp.k)?<div key={kp.k} style={{background:CARD2,borderRadius:8,padding:12,textAlign:'center'}}>
            <div style={{fontSize:10,color:MUTED,marginBottom:4}}>{kp.l}</div>
            <div style={{fontSize:16,fontWeight:'bold',color:A}}>{kp.u==='$'?'$':''}{Number(f(kp.k)).toLocaleString()}{kp.u!=='$'?kp.u:''}</div>
          </div>:null
        )}
      </div>
    </Block>
  </div>
}

function GTMView({data}){
  const f=(k)=>data?.[`gtm_${k}`]||''
  const gl=(k)=>data?.[`gtm_list_${k}`]||[]
  const FASES=[{id:'f1',t:'Fase 1: Pre-lanzamiento'},{id:'f2',t:'Fase 2: Lanzamiento'},{id:'f3',t:'Fase 3: Consolidación'},{id:'f4',t:'Fase 4: Optimización'},{id:'f5',t:'Fase 5: Liderazgo Global'}]
  return <div>
    <Field label="Introducción" value={f('intro')}/>
    <Block title="🗺 Hoja de Ruta — 5 Fases" color={GREEN}>
      {FASES.map(fase=>f(fase.id)?<div key={fase.id} style={{background:CARD2,borderRadius:8,padding:12,marginBottom:8}}>
        <div style={{fontSize:12,fontWeight:'bold',color:A,marginBottom:4}}>{fase.t}</div>
        <div style={{fontSize:12,color:TEXT,lineHeight:1.6}}>{f(fase.id)}</div>
      </div>:null)}
    </Block>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,marginBottom:16}}>
      {[{title:'🎯 Mercado Objetivo',items:gl('segs'),color:A},{title:'💲 Precios',items:gl('precios'),color:BLUE},{title:'🚚 Canales',items:gl('canales'),color:GREEN}].map(s=>
        s.items.filter(i=>i?.trim()).length?<div key={s.title} style={{background:CARD2,borderRadius:8,padding:12}}>
          <div style={{fontSize:12,fontWeight:'bold',color:s.color,marginBottom:8}}>{s.title}</div>
          {s.items.filter(i=>i?.trim()).map((item,i)=><div key={i} style={{fontSize:11,color:TEXT,marginBottom:4,display:'flex',gap:6}}><span style={{color:s.color}}>✓</span>{item}</div>)}
        </div>:null
      )}
    </div>
    <Field label="Propuesta de Valor" value={f('pv_dec')}/>
    <Field label="Conclusión" value={f('conclusion')}/>
  </div>
}

function CompetitivoView({data}){
  const recursos=data?.vrio_recursos||[]
  if(!recursos.length)return <div style={{color:MUTED,fontSize:13}}>Sin datos ingresados</div>
  return <div>
    <Field label="Introducción" value={data?.vrio_intro}/>
    {recursos.map((r,i)=><div key={i} style={{background:CARD2,borderRadius:10,padding:16,marginBottom:14,border:`1px solid ${BORDER}`}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
        <div style={{fontSize:14,fontWeight:'bold',color:TEXT}}>{r.nombre||'Sin nombre'}</div>
        {r.resultado&&<span style={{background:r.resultado==='Ventaja Competitiva Sostenible'?`${GREEN}22`:r.resultado==='Paridad Competitiva'?`${A}22`:`${RED}22`,color:r.resultado==='Ventaja Competitiva Sostenible'?GREEN:r.resultado==='Paridad Competitiva'?A:RED,border:`1px solid ${r.resultado==='Ventaja Competitiva Sostenible'?GREEN:A}55`,borderRadius:20,padding:'3px 12px',fontSize:11,fontWeight:'bold'}}>{r.resultado}</span>}
      </div>
      {r.desc&&<div style={{fontSize:12,color:MUTED,marginBottom:10}}>{r.desc}</div>}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        {['valor','rareza','imitabilidad','organizacion'].map(dim=>{
          const d=r.vrio?.[dim];if(!d?.desc)return null;
          return <div key={dim} style={{background:'#0D1526',borderRadius:6,padding:10,border:`1px solid ${d.aplica!==false?GREEN:RED}44`}}>
            <div style={{fontSize:11,fontWeight:'bold',color:d.aplica!==false?GREEN:RED,marginBottom:4,textTransform:'capitalize'}}>{d.aplica!==false?'✓':'✕'} {dim}</div>
            <div style={{fontSize:11,color:TEXT,lineHeight:1.5}}>{d.desc}</div>
          </div>
        })}
      </div>
      {r.conclusion&&<div style={{marginTop:10,fontSize:12,color:TEXT,lineHeight:1.6,fontStyle:'italic'}}>{r.conclusion}</div>}
    </div>)}
  </div>
}

function PVSView({data}){
  const f=(k)=>data?.[`pvs_${k}`]||''
  return <div>
    <Field label="Introducción" value={f('intro')}/>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,marginBottom:14}}>
      {[{k:'usp_ganadora',l:'✅ USP Ganadora',c:GREEN},{k:'usp_arriesgada',l:'⚠️ USP Arriesgada',c:A},{k:'usp_perdedora',l:'🚫 USP Perdedora',c:RED}].map(u=>
        f(u.k)?<div key={u.k} style={{background:`${u.c}15`,border:`1px solid ${u.c}44`,borderRadius:8,padding:14}}>
          <div style={{fontSize:12,fontWeight:'bold',color:u.c,marginBottom:6}}>{u.l}</div>
          <div style={{fontSize:12,color:TEXT,lineHeight:1.6}}>{f(u.k)}</div>
        </div>:null
      )}
    </div>
  </div>
}

function MVPView({data}){
  const f=(k)=>data?.[`mvp_${k}`]||''
  const gl=(k)=>data?.[`mvp_list_${k}`]||[]
  const hitos=data?.mvp_hitos||[]
  return <div>
    <Field label="Introducción" value={f('intro')}/>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
      <Block title="⚙️ Funcionalidades Principales" color={GREEN}><ListItems label="" items={gl('funcionalidades')}/></Block>
      <Block title="✅ Validación de Mercado" color={BLUE}><ListItems label="" items={gl('validacion')}/></Block>
    </div>
    {hitos.filter(h=>h.desc?.trim()).length>0&&<Block title="📅 Cronograma e Hitos" color={A}>
      {hitos.filter(h=>h.desc?.trim()).map((h,i)=><div key={i} style={{display:'flex',gap:12,alignItems:'center',background:CARD2,borderRadius:8,padding:12,marginBottom:8}}>
        <div style={{width:26,height:26,borderRadius:'50%',background:A,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',color:DARK,fontSize:12,flexShrink:0}}>{i+1}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:12,color:TEXT}}>{h.desc}</div>
          <div style={{marginTop:6,height:4,background:'#1e3a5f',borderRadius:2}}><div style={{width:`${h.pct||0}%`,height:'100%',background:GREEN,borderRadius:2}}/></div>
        </div>
        <span style={{fontSize:12,fontWeight:'bold',color:GREEN,flexShrink:0}}>{h.pct||0}%</span>
      </div>)}
    </Block>}
    <Block title="📣 Marketing" color={PURPLE}>
      <ListItems label="Estrategia" items={gl('mkt_estrategia')}/>
      <ListItems label="Eslóganes" items={gl('slogans')}/>
      <ListItems label="Canales" items={gl('canales')}/>
    </Block>
  </div>
}

function ClienteView({data}){
  const personas=data?.clientes_personas||[]
  if(!personas.length)return <div style={{color:MUTED,fontSize:13}}>Sin perfiles ingresados</div>
  return <div>
    <Field label="Introducción" value={data?.clientes_intro}/>
    {personas.map((p,i)=><div key={i} style={{background:CARD2,borderRadius:10,padding:18,marginBottom:16,border:`1px solid ${BLUE}44`}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
        <div style={{width:36,height:36,borderRadius:'50%',background:`${A}22`,border:`2px solid ${A}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>👤</div>
        <div>
          <div style={{fontSize:14,fontWeight:'bold',color:TEXT}}>{p.nombre||'Sin nombre'}</div>
          <div style={{fontSize:12,color:MUTED}}>{p.cargo||''}</div>
        </div>
        <span style={{marginLeft:'auto',background:`${GREEN}22`,color:GREEN,border:`1px solid ${GREEN}55`,borderRadius:20,padding:'3px 10px',fontSize:11}}>Customer persona #{i+1}</span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:12}}>
        {[{k:'antecedentes',l:'📋 Antecedentes'},{k:'desafios',l:'⚠️ Desafíos',list:true},{k:'metas',l:'🎯 Metas',list:true},{k:'objeciones',l:'❓ Objeciones',list:true},{k:'ofreces',l:'💡 ¿Qué ofreces?',list:true},{k:'identificadores',l:'🔍 Identificadores',list:true}].map(s=>
          <div key={s.k} style={{background:'#0D1526',borderRadius:8,padding:12}}>
            <div style={{fontSize:11,fontWeight:'bold',color:A,marginBottom:6}}>{s.l}</div>
            {s.list?(p[s.k]||[]).filter(v=>v?.trim()).map((v,j)=><div key={j} style={{fontSize:11,color:TEXT,marginBottom:3,display:'flex',gap:5}}><span style={{color:GREEN}}>✓</span>{v}</div>):
            <div style={{fontSize:11,color:TEXT,lineHeight:1.5}}>{p[s.k]||''}</div>}
          </div>
        )}
      </div>
      {(p.genero||p.edad||p.ingresos)&&<div style={{background:'#0D1526',borderRadius:8,padding:12,marginBottom:10}}>
        <div style={{fontSize:11,fontWeight:'bold',color:A,marginBottom:8}}>👥 Demografía</div>
        <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
          {[{k:'genero',l:'Género'},{k:'edad',l:'Edad'},{k:'ingresos',l:'Ingresos'},{k:'educacion',l:'Educación'},{k:'ubicacion',l:'Ubicación'}].map(d=>
            p[d.k]?<div key={d.k}><div style={{fontSize:10,color:MUTED}}>{d.l}</div><div style={{fontSize:12,color:TEXT,fontWeight:'bold'}}>{p[d.k]}</div></div>:null
          )}
        </div>
      </div>}
      {(p.citas||[]).filter(c=>c?.trim()).length>0&&<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
        {(p.citas||[]).filter(c=>c?.trim()).map((c,j)=><div key={j} style={{background:`${GREEN}12`,border:`1px solid ${GREEN}44`,borderRadius:8,padding:10,fontStyle:'italic',fontSize:11,color:TEXT}}>"{c}"</div>)}
      </div>}
    </div>)}
  </div>
}

function KPIChart({kpi,color}){
  const pts=(kpi.periodos||[]).filter(p=>p.valor!=="")
  const actual=pts.slice(-1)[0]?.valor||""
  const type=kpi.chart_type||"line"
  if(!pts.length)return null

  if(type==="donut"&&actual&&kpi.meta){
    const pct=Math.min(100,Math.round(+actual/+kpi.meta*100))
    const r=28,cx=40,cy=40,circ=2*Math.PI*r,dash=circ*(pct/100)
    return <div style={{display:"flex",alignItems:"center",gap:14,margin:"10px 0"}}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e3a5f" strokeWidth="8"/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}/>
        <text x={cx} y={cy+1} textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="12" fontWeight="bold">{pct}%</text>
      </svg>
      <div><div style={{fontSize:11,color:MUTED}}>Logrado vs Meta</div><div style={{fontSize:14,fontWeight:"bold",color:TEXT}}>{actual} / {kpi.meta} {kpi.unidad}</div></div>
    </div>
  }

  if(type==="bar"){
    const max=Math.max(...pts.map(p=>+p.valor))||1,h=60
    return <div style={{margin:"10px 0"}}>
      <div style={{display:"flex",alignItems:"flex-end",gap:4,height:h}}>
        {pts.map((p,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end",height:"100%"}}>
          <div style={{width:"100%",background:color,borderRadius:"3px 3px 0 0",height:`${(+p.valor/max)*(h-16)}px`}}/>
        </div>)}
      </div>
      <div style={{display:"flex",gap:4,marginTop:4}}>
        {pts.map((p,i)=><div key={i} style={{flex:1,fontSize:9,color:MUTED,textAlign:"center"}}>{p.label||i+1}</div>)}
      </div>
    </div>
  }

  // Line chart (default)
  if(pts.length<2)return null
  const vals=pts.map(p=>+p.valor)
  const mx=Math.max(...vals),mn=Math.min(...vals),rng=mx-mn||1,h=60,w=100/(pts.length-1)
  const points=vals.map((v,i)=>`${i*w},${h-((v-mn)/rng)*(h-8)-4}`).join(" ")
  return <div style={{margin:"10px 0"}}>
    <svg width="100%" height={h} viewBox={`0 0 100 ${h}`} preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth="2" points={points} vectorEffect="non-scaling-stroke"/>
      {vals.map((v,i)=><circle key={i} cx={i*w} cy={h-((v-mn)/rng)*(h-8)-4} r="1.8" fill={color} vectorEffect="non-scaling-stroke"/>)}
    </svg>
    <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
      {pts.map((p,i)=><span key={i} style={{fontSize:9,color:MUTED}}>{p.label||i+1}</span>)}
    </div>
  </div>
}

function BSCView({data}){
  const kpis=data?.__bsc_kpis||[]
  const PERSP=[{id:"fin",l:"💰 Financiera",c:GREEN},{id:"cli",l:"👥 Clientes",c:BLUE},{id:"pro",l:"⚙️ Procesos Internos",c:A},{id:"apr",l:"🌱 Crecimiento y Aprendizaje",c:PURPLE}]
  const semCol=(k)=>{
    const actual=(k.periodos||[]).filter(p=>p.valor!=="").slice(-1)[0]?.valor||""
    if(!actual||!k.meta)return MUTED
    const v=+actual,m=+k.meta,r=+k.umbral_rojo,a=+k.umbral_amarillo
    if(k.polaridad==="up"){if(v>=m)return GREEN;if(r&&v<=r)return RED;if(a&&v<=a)return A;return GREEN}
    else{if(v<=m)return GREEN;if(r&&v>=r)return RED;if(a&&v>=a)return A;return GREEN}
  }
  const semLbl=(c)=>c===GREEN?"🟢 En meta":c===A?"🟡 En riesgo":c===RED?"🔴 Crítico":"⚪ Sin datos"
  const trend=(ps)=>{const vs=(ps||[]).filter(p=>p.valor!=="").map(p=>+p.valor);if(vs.length<2)return"→";return vs[vs.length-1]>vs[vs.length-2]?"↑":vs[vs.length-1]<vs[vs.length-2]?"↓":"→";}
  if(!kpis.length)return <div style={{color:MUTED,fontSize:13,padding:20,textAlign:'center'}}>Sin KPIs ingresados en el CMI</div>

  // Summary cards
  const cnt=(c)=>kpis.filter(k=>semCol(k)===c).length

  return <div>
    {/* Global summary */}
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:10,marginBottom:20}}>
      {[{c:GREEN,l:"🟢 En Meta"},{c:A,l:"🟡 En Riesgo"},{c:RED,l:"🔴 Crítico"},{c:MUTED,l:"⚪ Sin datos"}].map(s=>(
        <div key={s.c} style={{background:CARD2,border:`1px solid ${s.c}44`,borderRadius:8,padding:14,textAlign:'center'}}>
          <div style={{fontSize:24,fontWeight:'bold',color:s.c}}>{cnt(s.c)}</div>
          <div style={{fontSize:11,color:MUTED,marginTop:4}}>{s.l}</div>
        </div>
      ))}
    </div>

    {/* KPIs by perspective */}
    {PERSP.map(p=>{
      const ks=kpis.filter(k=>k.perspectiva===p.id)
      if(!ks.length)return null
      return <Block key={p.id} title={p.l} color={p.c}>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
            <thead><tr style={{background:'#0D1526'}}>
              {['Est.','Indicador','Responsable','Frecuencia','Meta','Resultado','Tendencia','Brecha'].map(h=>(
                <th key={h} style={{padding:'8px 10px',textAlign:'left',color:MUTED,fontSize:10,borderBottom:`1px solid ${BORDER}`,whiteSpace:'nowrap'}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{ks.map((k,i)=>{
              const col=semCol(k)
              const actual=(k.periodos||[]).filter(p=>p.valor!=="").slice(-1)[0]?.valor||""
              const brecha=actual&&k.meta?(+k.meta - +actual).toFixed(1):"—"
              const tr=trend(k.periodos)
              return <tr key={i} style={{borderBottom:`1px solid ${BORDER}`}}>
                <td style={{padding:'8px 10px'}}><div style={{width:8,height:8,borderRadius:'50%',background:col}}/></td>
                <td style={{padding:'8px 10px',color:TEXT,fontWeight:'bold'}}>{k.nombre||`KPI ${i+1}`}</td>
                <td style={{padding:'8px 10px',color:MUTED}}>{k.responsable||"—"}</td>
                <td style={{padding:'8px 10px',color:MUTED}}>{k.frecuencia||"—"}</td>
                <td style={{padding:'8px 10px',color:p.c,fontWeight:'bold'}}>{k.meta||"—"} {k.unidad}</td>
                <td style={{padding:'8px 10px',color:col,fontWeight:'bold'}}>{actual||"—"}{actual?` ${k.unidad}`:""}</td>
                <td style={{padding:'8px 10px',fontSize:14,color:tr==="↑"?GREEN:tr==="↓"?RED:A}}>{tr}</td>
                <td style={{padding:'8px 10px',color:col}}>{brecha}</td>
              </tr>
            })}</tbody>
          </table>
        </div>
        {/* KPI details */}
        {ks.map((k,i)=><div key={i} style={{background:'#0D1526',borderRadius:6,padding:12,marginTop:8}}>
          <div style={{fontSize:11,fontWeight:'bold',color:p.c,marginBottom:6}}>{k.nombre}</div>
          <KPIChart kpi={k} color={semCol((k.periodos||[]).filter(pp=>pp.valor!=="").slice(-1)[0]?.valor||"",k.meta,k.umbral_rojo,k.umbral_amarillo,k.polaridad)}/>
          {k.formula&&<div style={{fontSize:11,color:MUTED,marginBottom:4}}><span style={{color:A}}>Fórmula:</span> {k.formula}</div>}
          {k.notas&&<div style={{fontSize:11,color:MUTED,marginBottom:4}}><span style={{color:A}}>Notas:</span> {k.notas}</div>}
          {k.acciones&&<div style={{fontSize:11,color:MUTED}}><span style={{color:RED}}>Acciones correctivas:</span> {k.acciones}</div>}
        </div>)}
      </Block>
    })}
  </div>
}

// ── MAIN APP ──────────────────────────────────────────────
const MODULE_VIEWS={
  contexto:ContextoView,
  marcos:MarcosView,
  finanzas:FinanzasView,
  gtm:GTMView,
  competitivo:CompetitivoView,
  pvs:PVSView,
  mvp:MVPView,
  cliente:ClienteView,
  bsc:BSCView,
}

function ReportApp(){
  const[data,setData]=useState(null)
  const[active,setActive]=useState('contexto')
  const[loading,setLoading]=useState(true)
  const[printMode,setPrintMode]=useState(null)

  useEffect(()=>{
    const token=localStorage.getItem('bling_token')
    if(!token){window.location.hash='';return}
    loadData(token).then(d=>{setData(d);setLoading(false)})
  },[])

  const logout=()=>{localStorage.removeItem('bling_token');localStorage.removeItem('bling_user');window.location.hash=''}
  const printAll=async(mode)=>{setPrintMode(mode);setTimeout(()=>{window.print();setTimeout(()=>setPrintMode(null),1000)},300)}

  if(loading)return <div style={{background:DARK,minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:A,fontFamily:'monospace'}}>Cargando datos...</div>

  const ActiveView=MODULE_VIEWS[active]
  const isExec=printMode==='executive'

  // PRINT STYLES
  if(printMode){
    const bg=isExec?'#ffffff':DARK
    const textC=isExec?'#1a1a1a':TEXT
    const cardBg=isExec?'#f8f9fa':CARD2
    const borderC=isExec?'#e0e0e0':BORDER
    const mutedC=isExec?'#666':MUTED
    return <div style={{background:bg,color:textC,fontFamily:"'Segoe UI',sans-serif",padding:'0',minHeight:'100vh'}}>
      <style>{`
        @media print {
          @page { margin: 15mm; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
        }
      `}</style>
      {/* Cover page */}
      <div style={{textAlign:'center',padding:'60px 40px',background:isExec?'#f8f9fa':CARD,marginBottom:40,borderRadius:isExec?0:12}}>
        <div style={{width:64,height:64,background:A,borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',color:DARK,fontSize:28,margin:'0 auto 20px'}}>B</div>
        <h1 style={{fontSize:28,fontWeight:'bold',color:isExec?'#1a1a1a':A,marginBottom:8}}>Bling Logistics Network</h1>
        <h2 style={{fontSize:18,color:isExec?'#444':MUTED,fontWeight:'normal',marginBottom:4}}>Plan Estratégico 2026</h2>
        <p style={{color:isExec?'#888':MUTED,fontSize:12}}>{new Date().toLocaleDateString('es-ES',{year:'numeric',month:'long',day:'numeric'})}</p>
      </div>
      {/* All modules */}
      {MODULES.map((mod,idx)=>{
        const View=MODULE_VIEWS[mod.id]
        if(!View)return null
        return <div key={mod.id} className={idx>0?'page-break':''} style={{padding:'30px 40px',marginBottom:20}}>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20,paddingBottom:12,borderBottom:`3px solid ${mod.color}44`}}>
            <span style={{fontSize:24}}>{mod.icon}</span>
            <h2 style={{fontSize:20,fontWeight:'bold',color:isExec?'#1a1a1a':mod.color,margin:0}}>{mod.label}</h2>
          </div>
          <View data={data}/>
        </div>
      })}
    </div>
  }

  return <div style={{background:DARK,minHeight:'100vh',display:'flex',flexDirection:'column',fontFamily:"'Segoe UI',sans-serif",color:TEXT}}>
    {/* TOPBAR */}
    <div style={{background:CARD,borderBottom:`1px solid ${BORDER}`,padding:'10px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0}}>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <img src={LOGO_B64} alt="Bling" style={{height:28,objectFit:'contain'}}/>
        <div>
          <div style={{fontSize:13,fontWeight:'bold'}}>Bling Logistics Network</div>
          <div style={{fontSize:10,color:MUTED,fontFamily:'monospace',letterSpacing:1}}>REPORTES Y DOCUMENTOS — 2026</div>
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <a href="#" onClick={e=>{e.preventDefault();window.location.hash='';}} style={{color:MUTED,fontSize:11,fontFamily:'monospace',textDecoration:'none'}}
          onMouseEnter={e=>e.target.style.color=A} onMouseLeave={e=>e.target.style.color=MUTED}>← Plan Estratégico</a>
        <button onClick={()=>printAll('executive')} style={{background:'#ffffff',color:'#1a1a1a',border:'none',borderRadius:6,padding:'7px 14px',fontWeight:'bold',cursor:'pointer',fontSize:12,fontFamily:'monospace'}}>📄 Reporte Ejecutivo</button>
        <button onClick={()=>printAll('visual')} style={{background:A,color:DARK,border:'none',borderRadius:6,padding:'7px 14px',fontWeight:'bold',cursor:'pointer',fontSize:12,fontFamily:'monospace'}}>🎨 Presentación Visual</button>
        <button onClick={logout} style={{background:'transparent',border:`1px solid ${BORDER}`,color:MUTED,borderRadius:6,padding:'7px 10px',cursor:'pointer',fontSize:11}}
          onMouseEnter={e=>{e.target.style.borderColor=RED;e.target.style.color=RED}} onMouseLeave={e=>{e.target.style.borderColor=BORDER;e.target.style.color=MUTED}}>Salir</button>
      </div>
    </div>

    <div style={{display:'flex',flex:1,overflow:'hidden'}}>
      {/* SIDEBAR */}
      <div style={{width:220,background:'#0D1526',borderRight:`1px solid ${BORDER}`,overflowY:'auto',flexShrink:0,padding:'12px 0'}}>
        <div style={{fontSize:10,color:MUTED,fontFamily:'monospace',letterSpacing:1.5,padding:'8px 14px 6px',textTransform:'uppercase'}}>Módulos del Plan</div>
        {MODULES.map(mod=>{const on=active===mod.id;return(
          <div key={mod.id} onClick={()=>setActive(mod.id)} style={{padding:'10px 14px',display:'flex',alignItems:'center',gap:8,cursor:'pointer',background:on?`${mod.color}15`:'transparent',borderLeft:on?`3px solid ${mod.color}`:'3px solid transparent',transition:'all 0.15s'}}>
            <span style={{fontSize:14}}>{mod.icon}</span>
            <span style={{fontSize:12,color:on?mod.color:TEXT}}>{mod.label}</span>
          </div>
        )})}
        <div style={{borderTop:`1px solid ${BORDER}`,margin:'14px 0',padding:'10px 14px 0'}}>
          <div style={{fontSize:10,color:MUTED,fontFamily:'monospace',letterSpacing:1.5,marginBottom:8}}>EXPORTAR TODO</div>
          <button onClick={()=>printAll('executive')} style={{width:'100%',background:'#ffffff',color:'#1a1a1a',border:'none',borderRadius:6,padding:'8px',fontWeight:'bold',cursor:'pointer',fontSize:11,marginBottom:6}}>📄 Reporte Ejecutivo</button>
          <button onClick={()=>printAll('visual')} style={{width:'100%',background:A,color:DARK,border:'none',borderRadius:6,padding:'8px',fontWeight:'bold',cursor:'pointer',fontSize:11}}>🎨 Presentación Visual</button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{flex:1,overflowY:'auto',padding:'24px 32px'}}>
        <div style={{maxWidth:860}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20}}>
            <span style={{fontSize:24}}>{MODULES.find(m=>m.id===active)?.icon}</span>
            <h2 style={{margin:0,fontSize:22,color:MODULES.find(m=>m.id===active)?.color||A}}>{MODULES.find(m=>m.id===active)?.label}</h2>
          </div>
          {ActiveView&&<ActiveView data={data}/>}
        </div>
      </div>
    </div>
  </div>
}

export default ReportApp
