import prisma from "/lib/prisma";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const data = await req.body;
    console.log(data.body.user.email);


    const events = await prisma.events.findMany({
      where: {
          users: {
            email: data.body.user.email,
          },
      }
    })
    console.log(events);

    res.status(200).send({ data: events });
  } else {
    res.status(404).json({ message: "Hello to the post message" });
  }
}
