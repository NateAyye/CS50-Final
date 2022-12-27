import prisma from "/lib/prisma";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const data = await req.body;


    const events = await prisma.events.findMany({
      where: {
          userUid: data.body.user.id,
      }
    })

    res.status(200).send({ data: events });
  } else {
    res.status(404).json({ message: "Hello to the post message" });
  }
}
