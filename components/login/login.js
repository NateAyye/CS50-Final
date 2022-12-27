import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Profile from "/components/profile/profile";
import styles from '/components/login/login.module.css'

const LoginPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [data, setData] = useState();

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from("test").select("*");
      setData(data);
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);

  if (!user)
    return (
      <div className={styles.loginForm}>
        <Auth
          redirectTo="https://cs-50-final-nu.vercel.app/"
          appearance={{ theme: ThemeSupa }}
          supabaseClient={supabaseClient}
          providers={[]}
          socialLayout="horizontal"
        />
      </div>
    );

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <Profile />
    </>
  );
};

export default LoginPage;
