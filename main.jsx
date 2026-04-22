import React from 'react'
import ReactDOM from 'react-dom/client'
import PlanApp from './PlanApp.jsx'
import BSCApp from './BSCApp.jsx'

const SUPABASE_URL = 'https://bokqsvfhhvqbynktbwjq.supabase.co'
const SUPABASE_KEY = 'sb_publishable_mA2iDsEPngMk_oxfh7GeHg__aGCT9Zs'

async function supabaseRequest(method, key, value = null) {
  const url = `${SUPABASE_URL}/rest/v1/plan_data?key=eq.${encodeURIComponent(key)}`
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': method === 'POST' ? 'resolution=merge-duplicates' : ''
  }
  if (method === 'GET') {
    const res = await fetch(url, { headers })
    const data = await res.json()
    return data?.[0] || null
  }
  if (method === 'POST') {
    await fetch(`${SUPABASE_URL}/rest/v1/plan_data`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ key, value })
    })
    return { key, value }
  }
}

window.storage = {
  get: async (key) => {
    try {
      const row = await supabaseRequest('GET', key)
      if (row) return { key, value: row.value }
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
      await supabaseRequest('POST', key, value)
      return { key, value }
    } catch {
      localStorage.setItem(key, value)
      return { key, value }
    }
  }
}

function Router() {
  const [page, setPage] = React.useState(window.location.hash === '#bsc' ? 'bsc' : 'plan')
  React.useEffect(() => {
    const onHash = () => setPage(window.location.hash === '#bsc' ? 'bsc' : 'plan')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return page === 'bsc' ? <BSCApp /> : <PlanApp />
}

ReactDOM.createRoot(document.getElementById('root')).render(<Router />)
