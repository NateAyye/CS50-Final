import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import '../styles/globals.css'


export default function App({ Component, pageProps }) {

    const [supabaseClient] = useState(() => createBrowserSupabaseClient())
    return (
        <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
        >
        <Component { ...pageProps} />
        </SessionContextProvider>
    )
}