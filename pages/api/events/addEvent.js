import prisma from '/lib/prisma'

export default async function handler(req, res) {
if (req.method == 'POST') {
  const {body} = await req.body;
  
  const start_hr_min = await body.startTime.split(':');
  const end_hr_min = await body.endTime.split(':');
  const shiftEnd = new Date()
  const shiftStart = new Date()
  shiftStart.setHours(start_hr_min[0])
  shiftStart.setMinutes(start_hr_min[1])
  shiftEnd.setHours(end_hr_min[0])
  shiftEnd.setMinutes(end_hr_min[1])
try {
    const event = await prisma.events.create({
    data: {
      title: body.title,
      description: body.description,
      eventStart: new Date(body.start),
      eventEnd: new Date(body.end),
      allDay: true,
      shiftStart: shiftStart,
      shiftEnd: shiftEnd,
      userUid: body.userUid,
    }
  })


  res.status(200).send({ data: event });
} catch (err) {
  console.log(err);
}
} else if (req.method == 'GET') {
  res.status(200).send({ message: 'You shouldnt be trying to access this page in this way.' });
}

}