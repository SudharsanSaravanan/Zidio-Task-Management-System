import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import UserSidebar from "./UserSidebar";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Fetch tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    const taskEvents = storedTasks.map((task) => ({
      title: task.title,
      start: new Date(task.deadline), 
      end: new Date(task.deadline), 
      type: "deadline",
    }));

    setEvents(taskEvents);
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt("Enter event title:");
    if (title) {
      const isDeadline = window.confirm("Is this a deadline? Click OK for Yes, Cancel for No.");
      setEvents([...events, { title, start, end, type: isDeadline ? "deadline" : "event" }]);
    }
  };

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: event.type === "deadline" ? "rgb(239, 68, 68)" : "rgb(59, 130, 246)",
      borderRadius: "5px",
      opacity: 0.9,
      color: "white",
      padding: "5px",
      border: "none",
    };
    return { style };
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Calendar Content */}
      <div className="flex-1 p-4 md:p-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">📅 Task & Deadline Calendar</h2>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            style={{ height: 500 }}
            className="border rounded-lg shadow-sm"
            date={currentDate}
            onNavigate={handleNavigate}
            eventPropGetter={eventStyleGetter}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
