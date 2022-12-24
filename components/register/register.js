import React from 'react'
import styles from '/components/login/login.module.css'
import supabase from '/utils/supabase'


const Register = () => {
  return (
    <div>
      <form className={styles.loginForm} action="/api/users" method="POST">
        <h1>Register</h1>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="cPassword">Confirm Password:</label>
        <input type="cPassword" name="cPassword" id="cPassword" />
        <button type="submit">Log-in</button>
      </form>
    </div>
  )
}

export default Register

export async function getServerSideProps() {
  const { data, error } = await supabase.auth.getSession()
  console.log(data)
}
