"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@fullcalendar/core");
const daygrid_1 = __importDefault(require("@fullcalendar/daygrid"));
// Ensure the DOM is fully loaded before running
document.addEventListener('DOMContentLoaded', () => {
    let calendarEl = document.getElementById('calendar');
    if (calendarEl) {
        let calendar = new core_1.Calendar(calendarEl, {
            plugins: [daygrid_1.default],
            initialView: 'dayGridMonth',
            events: [
                { title: 'Pomodoro Session', start: new Date().toISOString().split('T')[0] }
            ]
        });
        calendar.render();
    }
});
