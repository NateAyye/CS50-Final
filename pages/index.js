import Head from "next/head";
import Layout, { siteTitle, name } from "../components/layout";
import Login from "/components/login/login";
import { useState } from "react";
import Footer from "/components/footer/footer";

export default function Home() {
  const [session, setSession] = useState(true);
  const title = siteTitle + " | By: " + name;
  var pageTitle = "Home Page";
  if (session) {
    pageTitle = "Login";
  } else {
    pageTitle = "Register";
  }
  return (
    <Layout home title={"Tip-Gro"} session={session} siteTitle={title}>
      <Head>
        <title>{title}</title>
      </Head>
      <Login />
      <Footer />
    </Layout>
  );
}
