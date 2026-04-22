import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import PlanApp from './PlanApp.jsx'
import BSCApp from './BSCApp.jsx'

const SUPABASE_URL = 'https://bokqsvfhhvqbynktbwjq.supabase.co'
const SUPABASE_KEY = 'sb_publishable_mA2iDsEPngMk_oxfh7GeHg__aGCT9Zs'

const A="#F59E0B", DARK="#0A0F1E", CARD="#111827", BORDER="#2D3748", TEXT="#E2E8F0", MUTED="#64748B", RED="#EF4444", GREEN="#10B981"

// Auth helpers
async function signIn(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  return res.json()
}

async function signOut(token) {
  await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
    method: 'POST',
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${token}` }
  })
}

// Storage with auth
function makeStorage(token) {
  return {
    get: async (key) => {
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/plan_data?key=eq.${encodeURIComponent(key)}`, {
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        if (data?.[0]) return { key, value: data[0].value }
        const local = localStorage.getItem(key)
        return local ? { key, value: local } : null
      } catch {
        const local = localStorage.getItem(key)
        return local ? { key, value: local } : null
      }
    },
    set: async (key, value) => {
      try {
        localStorage.setItem(key, value)
        await fetch(`${SUPABASE_URL}/rest/v1/plan_data`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify({ key, value })
        })
        return { key, value }
      } catch {
        localStorage.setItem(key, value)
        return { key, value }
      }
    }
  }
}

// Login screen
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const result = await signIn(email, password)
    if (result.access_token) {
      localStorage.setItem('bling_token', result.access_token)
      localStorage.setItem('bling_user', email)
      onLogin(result.access_token, email)
    } else {
      setError('Email o contraseña incorrectos')
    }
    setLoading(false)
  }

  const inp = { width:'100%', background:'#0D1526', border:`1px solid ${BORDER}`, borderRadius:8, color:TEXT, padding:'12px 14px', fontSize:14, outline:'none', boxSizing:'border-box', fontFamily:'inherit', marginBottom:14 }

  return (
    <div style={{background:DARK, minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Segoe UI', sans-serif"}}>
      <div style={{background:CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:40, width:'100%', maxWidth:400}}>
        <div style={{textAlign:'center', marginBottom:32}}>
          <div style={{width:52, height:52, background:A, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold', color:DARK, fontSize:22, margin:'0 auto 16px'}}>B</div>
          <h2 style={{color:TEXT, margin:'0 0 6px', fontSize:22}}>Bling Logistics Network</h2>
          <p style={{color:MUTED, margin:0, fontSize:13}}>Plan Estratégico 2026</p>
        </div>
        <div>
          <label style={{display:'block', fontSize:11, color:MUTED, marginBottom:6, fontFamily:'monospace', letterSpacing:1}}>EMAIL</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com" style={inp}
            onKeyDown={e=>e.key==='Enter'&&handleLogin()}/>
          <label style={{display:'block', fontSize:11, color:MUTED, marginBottom:6, fontFamily:'monospace', letterSpacing:1}}>CONTRASEÑA</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" style={{...inp, marginBottom:error?8:20}}
            onKeyDown={e=>e.key==='Enter'&&handleLogin()}/>
          {error && <p style={{color:RED, fontSize:12, margin:'0 0 16px'}}>{error}</p>}
          <button onClick={handleLogin} disabled={loading} style={{width:'100%', background:A, color:DARK, border:'none', borderRadius:8, padding:'13px', fontWeight:'bold', cursor:'pointer', fontSize:14, fontFamily:'inherit', transition:'opacity 0.2s', opacity:loading?0.7:1}}>
            {loading ? 'Entrando...' : 'Ingresar →'}
          </button>
        </div>
        <p style={{color:MUTED, fontSize:11, textAlign:'center', marginTop:20}}>Acceso restringido — solo usuarios autorizados</p>
      </div>
    </div>
  )
}

function Router() {
  const [token, setToken] = useState(localStorage.getItem('bling_token'))
  const [user, setUser] = useState(localStorage.getItem('bling_user'))
  const [page, setPage] = useState(window.location.hash === '#bsc' ? 'bsc' : 'plan')

  useEffect(() => {
    const onHash = () => setPage(window.location.hash === '#bsc' ? 'bsc' : 'plan')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const handleLogin = (t, u) => {
    window.storage = makeStorage(t)
    setToken(t)
    setUser(u)
  }

  const handleLogout = async () => {
    await signOut(token)
    localStorage.removeItem('bling_token')
    localStorage.removeItem('bling_user')
    setToken(null)
    setUser(null)
  }

  if (!token) return <LoginScreen onLogin={handleLogin} />

  window.storage = makeStorage(token)
  window.__logout = handleLogout
  window.__user = user

  return page === 'bsc' ? <BSCApp /> : <PlanApp />
}

ReactDOM.createRoot(document.getElementById('root')).render(<Router />)
