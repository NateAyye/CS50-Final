import prisma from "/lib/prisma";
import supabase from '/utils/supabase';

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await prisma.user.findMany();
      return res.status(200).json(data);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "could not conect to the database" });
    }
  } else if (req.method === "POST") {
    console.log(req.body);
    const { data, error } = await supabase.auth.signUp({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(data);
    return res.status(200).send({data: data});
  }
}
