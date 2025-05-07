"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  //useStates
  //Used to set the access token to access user's Google Calendar
  const [accessToken, setAccessToken] = useState<string | null>(null);
  //Used to store the hobbies of the user
  const [userHobbies, setUserHobbies] = useState<String[]>([])
  //Displays hobbies of the user to be picked
  const [hobby, setHobby] = useState("");
  //Stores user input of what the calendar event should be named
  const [eventName, setEventName] = useState("hobby");
  //Stores the day, month, and year an event should start (respectively)
  const [day, setDay] = useState("01");
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("2025");
  //Stores the hour and minute to start an event (respectively)
  const [startHour, setStartHour] = useState("00");
  const [startMin, setStartMin] = useState("00");
  //Stores the hour and minute to end an event (respectively)
  const [endHour, setEndHour] = useState("01");
  const [endMin, setEndMin] = useState("00");
  //Stores the how often to repeat an event
  const [repeat, setRepeat] = useState("DAILY");
  //Setup router to redirect users to proper pages
  const router = useRouter();

  //This will fetch the user's hobbies from the database...
  //...and set the userHobbies constant so user can select from them for their calendar event
  const fetchHobbies = async () => {
    try{
      const response = await axios.get("/api/hobbyFetch")
      setUserHobbies(response.data.hobbies)
    } catch(err){
      //Log any errors stumbled upon
      console.log(err);
    }
  }

  useEffect(() => {
    //Pull access token from local storage
    const token = localStorage.getItem("accessToken");
    //If there is no access token, redirect user to the dashboard
    if (!token) {
      router.push("/dashboard");
      return;
    }
    //Otherwise, set the access token as normal
    setAccessToken(token);
    //Fetch hobbies of the user
    fetchHobbies()
  }, [router]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let jsonData;
    //Turn submitted form data into a json object...
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
      //...then store it in a variable
      jsonData = response1.data.event;
    } catch (err) {
      //Log any errors stumbled upon
      console.log(err);
    }

    //Send the event json to the user's Google Calendar
    await fetch(
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
  };

  //These constants are used to display the options for a user to pick from on a dropdown box
  //This one is populated with the hobbies recieved from user's document in the User collection
  const hobbies: any[] = [];
  for(let i = 0; i < userHobbies.length; i++){
    hobbies.push({label: userHobbies[i], value:userHobbies[i]})
  }
  //Pick a day from the 1st to the 30th
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
  //Pick a month from January to December
  const months = [
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
  //Pick a year from 2025 to 2029
  //(This is just an arbitrary range I picked)
  const years = [
    { label: "2025", value: "25" },
    { label: "2026", value: "26" },
    { label: "2027", value: "27" },
    { label: "2028", value: "28" },
    { label: "2029", value: "29" },
  ];
  //Pick an hour from 12AM to 11PM
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
  //Pick the quarter of the hour
  const mins = [
    { label: "00", value: "00" },
    { label: "15", value: "15" },
    { label: "30", value: "30" },
    { label: "45", value: "45" },
  ];
  //Pick how often an event should repeat
  const repetitions = [
    { label: "Once a day", value: "DAILY" },
    { label: "Once a week", value: "WEEKLY" },
    { label: "Once a month", value: "MONTHLY" },
  ];

  return (
    <>
      <div className="px-10">
        {/*Title of page*/}
        <div className="pt-[1.5vh] pb-[1.5vh]">
          <h1 className="font-bold text-black text-2xl">Calendar</h1>
        </div>
        {/*Form to submit data needed to create a calendar event*/}
        <div>
          <form onSubmit={handleSubmit}>
            {/*Hobby input*/}
            <div className="pt-[1.5vh] pb-[1.5vh]">
              <div>
                <label className="font-normal text-black text-lg">Hobby:</label>
              </div>
              <div>
                <select
                  className="border-black border-2 border-solid rounded-sm p-[0.5vh]"
                  onChange={(e) => setHobby(e.target.value)}
                >
                  {hobbies.map((hobby) => (
                    <option value={hobby.value}>{hobby.label}</option>
                  ))}
                </select>
              </div>
            </div>
            {/*Date input*/}
            <div className="pb-[1.5vh]">
              <div>
                <label className="font-normal text-black text-lg">
                  First Date of Event:
                </label>
              </div>
              <div>
                {/*Day subinput*/}
                <select
                  className="border-black border-2 border-solid rounded-sm p-[0.5vh] mr-[1.5vh]"
                  onChange={(e) => setDay(e.target.value)}
                >
                  {days.map((day) => (
                    <option value={day.value}>{day.label}</option>
                  ))}
                </select>
                {/*Month subinput*/}
                <select
                  className="border-black border-2 border-solid rounded-sm p-[0.5vh] mr-[1.5vh]"
                  onChange={(e) => setMonth(e.target.value)}
                >
                  {months.map((month) => (
                    <option value={month.value}>{month.label}</option>
                  ))}
                </select>
                {/*Year subinput*/}
                <select
                  className="border-black border-2 border-solid rounded-sm p-[0.5vh]"
                  onChange={(e) => setYear(e.target.value)}
                >
                  {years.map((year) => (
                    <option value={year.value}>{year.label}</option>
                  ))}
                </select>
              </div>
            </div>
            {/*Event input*/}
            <div className="pb-[1.5vh]">
              <div>
                <label className="font-normal text-black text-lg">
                  Event name:
                </label>
              </div>
              <div>
                <input
                  className="border-black border-2 border-solid rounded-sm p-[0.5vh] bg-gray-200"
                  type="text"
                  onChange={(e) => setEventName(e.target.value)}
                ></input>
              </div>
            </div>
            {/*Start time input*/}
            <div className="pb-[1.5vh]">
              <div>
                <label className="font-normal text-black text-lg">
                  Time Start:
                </label>
              </div>
              <div>
                {/*Hour subinput*/}
                <select
                  className="border-black border-2 border-solid rounded-sm p-[0.5vh] mr-[1.5vh]"
                  onChange={(e) => setStartHour(e.target.value)}
                >
                  {hours.map((hour) => (
                    <option value={hour.value}>{hour.label}</option>
                  ))}
                </select>
                {/*Minute subinput*/}
                <select
                  className="border-black border-2 border-solid rounded-sm p-[0.5vh]"
                  onChange={(e) => setStartMin(e.target.value)}
                >
                  {mins.map((min) => (
                    <option value={min.value}>{min.label}</option>
                  ))}
                </select>
              </div>
            </div>
            {/*End time input*/}
            <div className="pb-[1.5vh]">
              <div>
                <label className="font-normal text-black text-lg">
                  Time End:
                </label>
              </div>
              <div>
                {/*Hour subinput*/}
                <select
                  className="border-black border-2 border-solid rounded-sm p-[0.5vh] mr-[1.5vh]"
                  onChange={(e) => setEndHour(e.target.value)}
                >
                  {hours.map((hour) => (
                    <option value={hour.value}>{hour.label}</option>
                  ))}
                </select>
                {/*Minute subinput*/}
                <select
                  className="border-black border-2 border-solid rounded-sm p-[0.5vh]"
                  onChange={(e) => setEndMin(e.target.value)}
                >
                  {mins.map((min) => (
                    <option value={min.value}>{min.label}</option>
                  ))}
                </select>
              </div>
            </div>
            {/*Event repetitions input*/}
            <div className="pb-[1.5vh]">
              <div>
                <label className="font-normal text-black text-lg">
                  Repeats:
                </label>
              </div>
              <div>
                <select
                  className="border-black border-2 border-solid rounded-sm p-[0.5vh]"
                  onChange={(e) => setRepeat(e.target.value)}
                >
                  {repetitions.map((repetition) => (
                    <option value={repetition.value}>{repetition.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="pt-[1.5vh]">
              {/*Submit button - submits data to database and moves user back to the dashboard*/}
              <button
                type="submit"
                onClick={() => router.push("/dashboard")}
                className="p-[1.5vh] bg-black text-white rounded-md font-bold mr-[1.5vh]"
              >
                Submit
              </button>
              {/*Cancel button - moves user back to dashboard page without submitting data*/}
              <button onClick={() => router.push("/dashboard")} className="p-[1.5vh] bg-gray-200 text-black rounded-md font-bold ">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
