import prisma from '/lib/prisma'

export default async function handler(req, res) {
  if (req.method == 'GET') {
    const {title} = req.body
    const events = await prisma.events.findMany({
      where: {
          userId: 1,
      }
    })
    res.status(200).json({data: events})
  } else {
    res.status(404).json({ message: 'Hello to the post message'})
  }
}