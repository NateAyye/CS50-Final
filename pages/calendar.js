import Head from "next/head";
import { Views } from "react-big-calendar";
import Layout from "../components/layout";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useCallback, useState, useRef, useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import enUS from 'date-fns/locale/en-US'
import Modal from '../components/modal/Modal'
import { globalizeLocalizer } from 'react-big-calendar'
import globalize from 'globalize'

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




export default function MyCalendar() {

    const [openModal, setOpenModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    function onSave() {
        const startTime = document.getElementById('startTime')
        const endTime = document.getElementById('endTime')
        const tips = document.getElementById('tips').value
        events.push({title: (`Tips: $${tips}`), start: Date.now(), end: Date.now(), allDay: true})
        setOpenModal(false)
    }
    
    function eventSelect() {
        setOpenModal(!openModal)
        setEditModal(!editModal)
    }
    

    const onSelectSlot = ({ action, slots /*, ...props */ }) => {
        console.log("onSelectSlot");
        if (action === "click") {
          console.log("click");
          console.log(window.screen.width)
          setOpenModal(!openModal)
        }

        if (action === "select") {
        }
        return false;
    };

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
                events={events}
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
            <button className="modalBtn" onClick={() => setOpenModal(!openModal)}>Modal</button>
            <Modal editModal={editModal} open={openModal} onSave={onSave} onClose={() => {
                setOpenModal(false)
                setEditModal(false)
                }}/>
        </Layout>
    )
}