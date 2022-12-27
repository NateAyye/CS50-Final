import Script from 'next/script'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import { useState } from 'react'

export default function FirstPost() {
    const [comment, setComment] = useState('')

    const submitComment = async () => {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment }),
        })
    }
    return (
    <Layout>
        <Script
            src='https://connect.facebook.net/en_US/sdk.js'
            strategy='lazyOnLoad'
            onLoad={() => console.log('script loaded correctly, window.FB has been populated')}
        />
        <input 
            type={'text'}
            value={comment}
            onChange={(e) => setComment(e.target.value)} 
        />
        <button onClick={submitComment}>Submit</button>
        <h1>First Post</h1>
        <h2>
            <Link href="/">Back to Home</Link>
        </h2>
    </Layout>
    )
}