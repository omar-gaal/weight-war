"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/src/lib/supabase/browser";
import { useRouter } from 'next/navigation'



export  default function LoginPage() {

const router = useRouter()
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState<string | null>(null)


async function handleLogin (e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const { error } = await supabaseBrowser.auth.signInWithPassword({
        email,
        password,
    })

    if(error) {
        setError(error.message)
        return
    }

    router.push('/')
}


return (
    <main className="p-6 max-w-sm mx-auto">
     <h1 className="text-2xl font-bold mb-4">Login</h1>

     <form onSubmit={handleLogin} className="space-y-4">
       <input 
         type="email" 
         placeholder="Email"
         className="w-full border p-2 rounded"
         value={email}
         onChange={ (e) => setEmail(e.target.value)}
         required
        />
      <input 
       type="password"
       placeholder="Password"
       className="w-full border p-2 rounded"
       value={password}
       onChange={ (e) => setPassword(e.target.value)}
       required
      />

      { error && <p className="text-red-500 text-sm">{error}</p>}
       
       <button className="w-full bg-black text-white p-2 rounded">Login</button>
     </form>
    </main>
)

}