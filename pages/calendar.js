import { Views } from "react-big-calendar";
import Layout from "../components/layout";
import React, { useState, useMemo } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import enUS from "date-fns/locale/en-US";
import Modal from "../components/modal/Modal";
import { globalizeLocalizer } from "react-big-calendar";
import globalize from "globalize";
const localizer = globalizeLocalizer(globalize);
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";

const locales = { "en-US": enUS, };

export async function getServerSideProps(ctx) {
  var results = [];
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {data: { session } } = await supabase.auth.getSession();

  try {
    //* Make a post request to our own internal API and send the user session data with it to grab all the events to that user
    const response = await axios.post(
      "https://cs-50-final-nu.vercel.app/api/events",
      {
        body: session,
      }
    );
    results = response.data.data;
  } catch (error) {
    console.error(error.response);
  }

  return {
    props: {
      data: results,
      session,
    },
  };
}

export default function MyCalendar({ data, session }) {
  const userEvents = data;
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [tipAmount, setTipAmount] = useState();
  const [eventSelectStart, setEventSelectStart] = useState(Date());
  const [eventSelectEnd, setEventSelectEnd] = useState(Date());

  async function onEventSave() {
    setStartTime(document.getElementById("startTime"));
    setEndTime(document.getElementById("endTime"));
    const tips = document.getElementById("tips").value;
    var events = [];
    try {
      const response = await axios.post(
        "https://cs-50-final-nu.vercel.app/api/events/addEvent",
        {
          body: {
            userUid: session.user.id,
            title: `Tips: $${tips}`,
            description: " ",
            start: Date(),
            end: Date(),
            allDay: true,
            startTime: startTime.value,
            endTime: endTime.value,
          },
        }
      );
      // console.log(response.data.data);
      events = response.data.data;
      console.log(events);
      setOpenModal(false);
      location.reload();
    } catch (error) {
      console.error(error.response);
    }
  }

  function eventSelect({ id, title, start, end, startTime, endTime }) {
    setEventSelectEnd(end);
    setEventSelectStart(start);
    if (startTime) {
      console.log(startTime.value);
    }
    setOpenModal(!openModal);
    setEditModal(!editModal);
  }

  const onSelectSlot = ({ action, slots, start, end /*, ...props */ }) => {
    const today = new Date().getDate();
    const eventDay = new Date(start).getDate();
    if (action === "click") {
      if (today === eventDay) {
        setOpenModal(!openModal);
      }
    }
    if (action === "select") {
      if (today === eventDay) {
        setOpenModal(!openModal);
      }
    }

    return false;
  };

  function onModalClose() {
    setOpenModal(false);
    setEditModal(false);
  }

  function editingModal() {
    setEditModal(false);
  }

  const { formats } = useMemo(
    () => ({
      formats: {
        weekdayFormat: (date, culture, localizer) =>
          localizer.format(date, "ddd", culture),
      },
    }),
    []
  );

  return (
    <Layout calendar title={"Calendar"} siteTitle={"Tip-Gro | Calendar"}>
      <Calendar
        formats={formats}
        views={[Views.MONTH, Views.AGENDA]}
        localizer={localizer}
        events={userEvents.map((event) => {
          return {
            id: event.id,
            title: event.title,
            description: event.description,
            start: Date.parse(event.eventStart),
            end: Date.parse(event.eventEnd),
            allDay: event.allDay,
            shiftStart: event.shiftStart,
            shiftEnd: event.shiftEnd,
            userId: event.userId,
          };
        })}
        startAccessor="start"
        endAccessor="end"
        className="calendar"
        longPressThreshold={10}
        style={{
          height: 600,
          margin: "5px",
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
        onSave={onEventSave}
        onClose={onModalClose}
      />
    </Layout>
  );
}
