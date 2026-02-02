"use client"

import { useEffect, useState } from "react"
import { supabaseBrowser } from "../lib/supabase/browser"

export function GoalEditor() {
    const [goalWeight, setGoalWeight ] = useState<number | ''>('')
    const [loading, setLoading ] = useState(true)
    const [saving, setSaving ] = useState(false);
    const [message, setMessage] = useState<string | null>(null)


    useEffect(() => {
    async function loadProfile() {
      const { data, error } = await supabaseBrowser
        .from('profiles')
        .select('goal_weight')
        .single()

      if (!error && data) {
        setGoalWeight(data.goal_weight ?? '')
      }

      setLoading(false)
    }

    loadProfile()
  }, [])



  async function saveGoal() {
    setSaving(true)
    setMessage(null)

    const {error} = await supabaseBrowser
    .from('profiles')
    .update({goal_weight: goalWeight})
    .eq('id', (await supabaseBrowser.auth.getUser()).data.user?.id)

    if(error) {
        setMessage('Failed to save goal')
    } else {
        setMessage('Goal saved 🎯')
    }

    setSaving(false)
  }

  if (loading) return <p className="mt-4 text-gray-400">Loading goal...</p>

  return (

    <div className="mt-6 max-w-sm space-y-3">
        <label className="block text-sm font-medium"> Goal Weight (kg)</label>

        <input 
          step="0.1"
          type="number" 
          className="w-full border rounded p-2"
          value={goalWeight}
          onChange={(e) => setGoalWeight(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder="e.g. 75"
          />



      <button onClick={saveGoal}
      disabled={saving}
      className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
       {saving ? 'Saving...' : 'save Goal'}
      </button>
         
         {message && (
            <p className="text-sm text-gray-500">{message}</p>
         )}
    </div>
  )


}