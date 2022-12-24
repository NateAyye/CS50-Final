import supabase from '/utils/supabase'

export default async function handler(req, res) {
  const { data1, error1 } = await supabase.auth.getSession()
  console.log(data1);

}