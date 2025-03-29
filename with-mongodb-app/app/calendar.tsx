import React, { useRef, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { v4 as uuidv4 } from 'uuid';

interface Reminder {
  id: string;
  title: string;
  date: string;
}

const CalendarPage: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const handleDateClick = (arg: DateClickArg) => {
    const title = prompt('Enter reminder title:');
    if (title) {
      const newReminder = {
        id: uuidv4(),
        title,
        date: arg.dateStr,
      };
      setReminders((prev) => [...prev, newReminder]);
    }
  };

  return (
    <div className="flex flex-row p-4 space-x-6">
      {}//Calendar
      <div className="w-2/3">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={reminders.map(r => ({ title: r.title, start: r.date }))}
        />
      </div>

      {}//Reminders Sidebar
      <div className="w-1/3 bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Reminders</h2>
        {reminders.length === 0 ? (
          <p className="text-gray-500">No reminders yet.</p>
        ) : (
          <ul className="space-y-2">
            {reminders.map(reminder => (
              <li key={reminder.id} className="bg-white p-2 rounded shadow">
                <strong>{reminder.title}</strong> — <span>{reminder.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
