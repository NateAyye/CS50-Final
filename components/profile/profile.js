import React from 'react'
import utilStyles from '/styles/utils.module.css'
import Link from 'next/link'

const Profile = () => {
  return (
    <div>
      <section className={utilStyles.headingMd}>
        <p>Hello, <br/>
        &emsp; My Name is Nathan Cuevas, I am an aspiring web developer. I have been really enjoying the front-end development process so far
        and I would like to see where it leads me. I have been inspired to make digital art weather that be in games or just in the models but I 
        want to be able to combine all these skills together one day. <br/>
        &emsp; Thank You,
        </p>
        <p>
          ( This is a sample website - you’ll be waiting building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <div className={utilStyles.bottomLink}>
          <Link href='/posts/first-post'>First Post</Link>
          <Link href='/calendar'>Calendar</Link>
        </div>
      </section>
    </div>
  )
}

export default Profile