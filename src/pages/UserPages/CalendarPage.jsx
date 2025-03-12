import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import UserSidebar from "./UserSidebar"; // Import Sidebar

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [events, setEvents] = useState([
    { title: "Project Deadline", start: new Date(2025, 2, 10), end: new Date(2025, 2, 10) },
    { title: "Team Meeting", start: new Date(2025, 2, 15), end: new Date(2025, 2, 15) },
  ]);

  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt("Enter event title:");
    if (title) {
      setEvents([...events, { title, start, end }]);
    }
  };

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Calendar Content */}
      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Calendar</h2>
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
            onNavigate={handleNavigate} // Enables month navigation
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
