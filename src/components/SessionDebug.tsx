'use client'

import { useEffect, useState } from 'react'
import { supabaseBrowser } from '../lib/supabase/browser' 



export function SessionDebug() {
  const [session, setSession] = useState<any>(null)


  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })
  }, [])

  if (!session) return <p className="mt-4 text-gray-400">No session</p>

  return (
    <pre className="mt-4 text-sm text-gray-400">
      {JSON.stringify(session.user, null, 2)}
    </pre>
  )
}
