import supabase from '/utils/supabase'

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { data, error } = await supabase.auth.signUp({
      email: req.body.email,
      password: req.body.password,
    });
    const { data2, error2 } = await supabase.auth.signIn({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(data2);
    
  const { data1, error1 } = await supabase.auth.getSession()

    console.log(data1);
    res.status(200).send(data);
  }
}
