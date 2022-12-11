import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Nathan Cuevas';
export const siteTitle = 'CS50 Final Project';

export default function Layout({ children, home, calendar, title, description }) {
  return (
    <div>
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
            <>
             <Image
                priority
                src="/images/profile.jpg"
                className={styles.borderCircle}
                height={60}
                width={60}
                alt=""
             />
             <div className={styles.middletitle}>
             <h1 className={styles.title}>{title}</h1>
             {description && <h3 className={styles.title}>{description}</h3>}
             </div>
             <div className={styles.togglebutton}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
             </div>
            </>
        </header>
        <main className={styles.main}>{children}</main>
        {!home && (
            <div className={styles.backToHome}>
            <Link href="/">← Back to home</Link>
            </div>
        )}
    </div>
)
  // return (
  //   <div className={styles.container}>
  //     <Head>
  //       <link rel="icon" href="/favicon.ico" />
  //       <meta
  //         name="description"
  //         content="Learn how to build a personal website using Next.js"
  //       />
  //       <meta
  //         property="og:image"
  //         content={`https://og-image.vercel.app/${encodeURI(
  //           siteTitle,
  //         )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
  //       />
  //       <meta name="og:title" content={siteTitle} />
  //       <meta name="twitter:card" content="summary_large_image" />
  //     </Head>
  //     <header className={styles.header}>
  //       {home ? (
  //         <>
  //           <Image
  //             priority
  //             src="/images/profile.jpg"
  //             className={utilStyles.borderCircle}
  //             height={144}
  //             width={144}
  //             alt=""
  //           />
  //           <h1 className={utilStyles.heading2Xl}>{name}</h1>
  //         </>
  //       ) : (
  //         <>
  //           <Link href="/">
  //             <Image
  //               priority
  //               src="/images/profile.jpg"
  //               className={utilStyles.borderCircle}
  //               height={108}
  //               width={108}
  //               alt=""
  //             />
  //           </Link>
  //           <h2 className={utilStyles.headingLg}>
  //             <Link href="/" className={utilStyles.colorInherit}>
  //               {name}
  //             </Link>
  //           </h2>
  //         </>
  //       )}
  //     </header>
  //     <main>{children}</main>
  //     {!home && (
  //       <div className={styles.backToHome}>
  //         <Link href="/">← Back to home</Link>
  //       </div>
  //     )}
  //   </div>
  // );
}