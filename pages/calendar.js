import Head from "next/head";
import { Views } from "react-big-calendar";
import Layout from "../components/layout";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffext, useCallback, useState, useRef, useMemo, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import enUS from 'date-fns/locale/en-US'
import Modal from '../components/modal/Modal'
import { globalizeLocalizer } from 'react-big-calendar'
import globalize from 'globalize'
import { set } from "date-fns";
import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

const localizer = globalizeLocalizer(globalize)

const locales = {
  'en-US': enUS,
}


// const localizer = dateFnsLocalizer({
//     format,
//     parse,
//     startOfWeek,
//     getDay,
//     locales,
// });


const events = [
    {
        title: "Confrence",
        start: new Date(2022, 11, 20),
        end: new Date(2022, 11, 25)
    },
    {
        title: "working",
        start: new Date(2022, 11, 20),
        end: new Date(2022, 11, 25)
    },
    {
        title: "Meeting",
        start: new Date(2022, 11, 10),
        end: new Date(2022, 11, 15)
    },
    {
        title: "Christmas",
        allDay: false,
        start: new Date(2022,11,25),
        end: new Date(2022, 11, 25)
    },
    {
        title: "Christmas",
        allDay: false,
        start: new Date(2022,11,25),
        end: new Date(2022, 11, 25)
    },
    {
        title: "Christmas",
        allDay: false,
        start: new Date(2022,11,25),
        end: new Date(2022, 11, 25)
    }
]



export async function getServerSideProps() {
    const events = await prisma.events.findMany();
    console.log(events)

    return {
        props: {
            events: JSON.stringify(events)
        }
    }
}

export default function MyCalendar({events}) {

    const [openModal, setOpenModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [tipAmount, setTipAmount] = useState()
    const [eventSelectStart, setEventSelectStart] = useState(Date())
    const [eventSelectEnd, setEventSelectEnd] = useState(Date())
    const [event, setEvent] = useState(events)
    
    console.log(JSON.parse(events))
    
    async function onSave(data, e) {
        setStartTime(document.getElementById('startTime'))
        setEndTime(document.getElementById('endTime'))
        const tips = document.getElementById('tips').value
        setTipAmount(tips)
        const events1 = JSON.stringify(event)
        setEvent([...events1, {title: (`Tips: $${tips}`),description: "hello everyone", start: Date.now(), end: Date.now(), allDay: true, startTime: startTime, endTime: endTime}])
        setOpenModal(false)
    }
    
    function eventSelect({ id, title, start, end, startTime, endTime}) {
        setEventSelectEnd(end)
        setEventSelectStart(start)
        if(startTime) {
            console.log(startTime.value)
        }
        setOpenModal(!openModal)
        setEditModal(!editModal)
    }
    

    const onSelectSlot = ({ action, slots, start, end /*, ...props */ }) => {
        const today = new Date().getDate()
        const eventDay = new Date(start).getDate()
        if (action === "click") {
            if(today === eventDay) {
                setOpenModal(!openModal)
            }
        }

        return false;
    };

    function onModalClose() {
        setOpenModal(false)
        setEditModal(false)
    }

    function editingModal() {
        setEditModal(false)
    }

    const { formats } = useMemo(
        () => ({
          formats: {
            weekdayFormat: (date, culture, localizer) =>
              localizer.format(date, 'ddd', culture),
          },
        }),
        []
      )

      



    return (
        <Layout
            calendar
            title={"Calendar"}
            >
            <Head>
                <title>Tip Calendar</title>
            </Head>
            <Calendar 
                formats={formats}
                views={[Views.MONTH, Views.AGENDA]}
                localizer={localizer}
                events={JSON.parse(events)}
                startAccessor="start"
                endAccessor="end" 
                className="calendar"
                longPressThreshold={10}
                style={{
                    height: 600,
                    margin:"5px",
                    }}
                popup
                onSelectSlot={onSelectSlot}
                onSelectEvent={eventSelect}
                selectable
            />
            <Modal 
                editingModal={editingModal} 
                eventSelectStart={eventSelectStart} 
                eventSelectEnd={eventSelectEnd} 
                startTime={startTime} 
                endTime={endTime} 
                tipAmount={tipAmount} 
                editModal={editModal} 
                open={openModal} 
                onSave={onSave} 
                onClose={onModalClose}
            />
        </Layout>
    )
}


