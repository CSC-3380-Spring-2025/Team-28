"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/dashboard");
      return;
    }
    setAccessToken(token);
  }, [router]);

  //add event

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let jsonData;
    try {
      const response1 = await axios.post("/api/calendar", {
        hobby,
        eventName,
        day,
        month,
        year,
        startHour,
        startMin,
        endHour,
        endMin,
        repeat,
      });
      console.log(response1);
      jsonData = response1.data.event;
      console.log(jsonData);
    } catch (err) {
      console.log(err);
    }

    const response2 = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: jsonData,
      }
    );
    const data = await response2.json();
    console.log(data);
  };

  //known bugs: you have to select an item, othewise it returns a default value
  //also, times are messed up (may have something to do with time zones)

  const [hobby, setHobby] = useState("");
  const [eventName, setEventName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [startHour, setStartHour] = useState("");
  const [startMin, setStartMin] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMin, setEndMin] = useState("");
  const [repeat, setRepeat] = useState("");

  const hobbies = [
    { label: "fishing", value: "fishing" },
    { label: "hunting", value: "hunting" },
    { label: "drawing", value: "drawing" },
  ];

  const days = [
    { label: "01", value: "01" },
    { label: "02", value: "02" },
    { label: "03", value: "03" },
    { label: "04", value: "04" },
    { label: "05", value: "05" },
    { label: "06", value: "06" },
    { label: "07", value: "07" },
    { label: "08", value: "08" },
    { label: "09", value: "09" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
    { label: "16", value: "16" },
    { label: "17", value: "17" },
    { label: "18", value: "18" },
    { label: "19", value: "19" },
    { label: "20", value: "20" },
    { label: "21", value: "21" },
    { label: "22", value: "22" },
    { label: "23", value: "23" },
    { label: "24", value: "24" },
    { label: "25", value: "25" },
    { label: "26", value: "26" },
    { label: "27", value: "27" },
    { label: "28", value: "28" },
    { label: "29", value: "29" },
    { label: "30", value: "30" },
    { label: "31", value: "31" },
  ];

  const months = [
    { label: "00", value: "00" },
    { label: "01", value: "01" },
    { label: "02", value: "02" },
    { label: "03", value: "03" },
    { label: "04", value: "04" },
    { label: "05", value: "05" },
    { label: "06", value: "06" },
    { label: "07", value: "07" },
    { label: "08", value: "08" },
    { label: "09", value: "09" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
  ];

  const years = [
    { label: "2025", value: "25" },
    { label: "2026", value: "26" },
    { label: "2027", value: "27" },
    { label: "2028", value: "28" },
    { label: "2029", value: "29" },
  ];

  const hours = [
    { label: "00", value: "00" },
    { label: "01", value: "01" },
    { label: "02", value: "02" },
    { label: "03", value: "03" },
    { label: "04", value: "04" },
    { label: "05", value: "05" },
    { label: "06", value: "06" },
    { label: "07", value: "07" },
    { label: "08", value: "08" },
    { label: "09", value: "09" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
    { label: "16", value: "16" },
    { label: "17", value: "17" },
    { label: "18", value: "18" },
    { label: "19", value: "19" },
    { label: "20", value: "20" },
    { label: "21", value: "21" },
    { label: "22", value: "22" },
    { label: "23", value: "23" },
  ];

  const mins = [
    { label: "00", value: "00" },
    { label: "15", value: "15" },
    { label: "30", value: "30" },
    { label: "45", value: "45" },
  ];

  const repetitions = [
    { label: "once a day", value: "DAILY" },
    { label: "once a week", value: "WEEKLY" },
    { label: "once a month", value: "MONTHLY" },
  ];

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Hobby</label>
        <select onChange={(e) => setHobby(e.target.value)}>
          {hobbies.map((hobby) => (
            <option value={hobby.value}>{hobby.label}</option>
          ))}
        </select>

        <label>First Date of Event</label>
        <select onChange={(e) => setDay(e.target.value)}>
          {days.map((day) => (
            <option value={day.value}>{day.label}</option>
          ))}
        </select>
        <select onChange={(e) => setMonth(e.target.value)}>
          {months.map((month) => (
            <option value={month.value}>{month.label}</option>
          ))}
        </select>
        <select onChange={(e) => setYear(e.target.value)}>
          {years.map((year) => (
            <option value={year.value}>{year.label}</option>
          ))}
        </select>

        <label>Event name</label>
        <input
          type="text"
          onChange={(e) => setEventName(e.target.value)}
        ></input>

        <label>Time Start</label>
        <select onChange={(e) => setStartHour(e.target.value)}>
          {hours.map((hour) => (
            <option value={hour.value}>{hour.label}</option>
          ))}
        </select>
        <select onChange={(e) => setStartMin(e.target.value)}>
          {mins.map((min) => (
            <option value={min.value}>{min.label}</option>
          ))}
        </select>

        <label>Time End</label>
        <select onChange={(e) => setEndHour(e.target.value)}>
          {hours.map((hour) => (
            <option value={hour.value}>{hour.label}</option>
          ))}
        </select>
        <select onChange={(e) => setEndMin(e.target.value)}>
          {mins.map((min) => (
            <option value={min.value}>{min.label}</option>
          ))}
        </select>

        <label>Repeats</label>
        <select onChange={(e) => setRepeat(e.target.value)}>
          {repetitions.map((repetition) => (
            <option value={repetition.value}>{repetition.label}</option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
