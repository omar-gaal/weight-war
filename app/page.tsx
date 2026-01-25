import { SessionDebug } from "@/src/components/SessionDebug"
import { supabase } from "@/src/lib/supabase/client"


export default async function Home() {
  const { data: {session}, } = await supabase.auth.getSession()

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Weight War 🏋️‍♂️</h1>
      {!session ? (

        <div className="mt-4 space-x-4">
          <a href="/login" className="underline">Login</a>
          <a href="/signup" className="underline">Signup</a>
        </div>
      ) : (
      <SessionDebug />
      )
    
    }
    </main>
  )
}
