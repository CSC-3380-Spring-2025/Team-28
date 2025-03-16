import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    let calendarEl = document.getElementById('calendar');

    if (calendarEl) {
        let calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin],
            initialView: 'dayGridMonth',
            events: [
                { title: 'Pomodoro Session', start: '2024-03-20' }
            ]
        });

        calendar.render();
    }
});
