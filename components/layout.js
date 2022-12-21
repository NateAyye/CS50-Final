import Head from 'next/head';
import Image from 'next/image';
import { Avatar, Navbar, useTheme } from '@nextui-org/react';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

export const name = 'Nathan Cuevas';
export const siteTitle = 'CS50 Final Project';

export default function Layout({ children, home, calendar, title, description }) {
  const {isDark} = useTheme()
  return (
    <div className={styles.layout}>
        <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className={styles.header}>
            
              <Link href={"/"}>
                <Avatar
                  priority
                  src="/images/profile.jpg"
                  className={styles.borderCircle}
                  height={60}
                  width={60}
                  alt=""
                />
              </Link>
             <div className={styles.middletitle}>
             <h1 className={styles.title}>{title}</h1>
             {description && <h3 className={styles.title}>{description}</h3>}
             </div>
             <div className={styles.togglebutton}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
             </div>
            
        </header>
        <main>{children}</main>
        {!home && (
            <div className={styles.backToHome}>
            <Link href="/">← Back to home</Link>
            </div>
        )}
    </div>
)
}