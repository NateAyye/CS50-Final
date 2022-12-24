import prisma from "/lib/prisma";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const data = await req.body;
    console.log(data.body.user.id);


    const events = await prisma.events.findMany({
      where: {
          userId: 1,
      }
    })
    res.status(200).send({ data: events });
  } else {
    res.status(404).json({ message: "Hello to the post message" });
  }
}
