"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation"

export default function Email() {
  //useStates
  //Used to check if user would like to recieve emails
  const [recieveEmails, setRecieveEmails] = useState("");
  //Stores day, hour, and minute user would like to recieve a reminder each week
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  //Stores message user wants to send in their email
  const [message, setMessage] = useState("");
  //Used to flag whether or not user wants emails in a boolean representation
  let recieveEmailsFlag = false
  //Setup router to redirect users to proper pages
  const router = useRouter();

  const recieved = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  //Pick a day from Monday to Sunday
  const days = [
    { label: "Monday", value: "1" },
    { label: "Tuesday", value: "2" },
    { label: "Wednesday", value: "3" },
    { label: "Thursday", value: "4" },
    { label: "Friday", value: "5" },
    { label: "Saturday", value: "6" },
    { label: "Sunday", value: "7" },
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //If recieveEmails is set to yes, set the boolean flag to true...
    if(recieveEmails){
      recieveEmailsFlag = true
    }
    //...otherwise, set it to false
    else{
      recieveEmailsFlag = false
    }
    //Send the information to the database and update the user's preferences
    await axios.post("/api/email", {
      recieveEmails: recieveEmailsFlag,
      day,
      hour,
      min,
      message,
    });
  };

    //NOTICE: You have to make a selection on all the dropdowns. It will not accept default values. Otherwise, the input will not be accepted by the database
  return (
    <>
      <div className="px-10">
        {/*Title of page*/}
        <div className="pt-[1.5vh] pb-[1.5vh]">
          <h1 className="font-bold text-black text-2xl">Email Reminders</h1>
        </div>
        {/*Form to submit data needed to schedule user's weekly emails*/}
        <form onSubmit={handleSubmit}>
          <div>
            {/*Accept or decline weekly email reminder input*/}
            <div className="pt-[1.5vh] pb-[1.5vh]">
              <div>
                <label className="font-normal text-black text-lg">
                  Recieve Weekly Email Reminders?:
                </label>
              </div>
              <div>
                <select
                  className="border-black border-2 border-solid rounded-sm p-[0.5vh]"
                  onChange={(e) => setRecieveEmails(e.target.value)}
                >
                  {recieved.map((recieve) => (
                    <option value={recieve.value}>{recieve.label}</option>
                  ))}
                </select>
              </div>
            </div>
            {/*Day input*/}
            <div className="pb-[1.5vh]">
              <div>
                <label className="font-normal text-black text-lg">
                  Day to Remind:
                </label>
              </div>
              <div>
                <select
                  className="border-black border-2 border-solid rounded-sm p-[0.5vh]"
                  onChange={(e) => setDay(e.target.value)}
                >
                  {days.map((day) => (
                    <option value={day.value}>{day.label}</option>
                  ))}
                </select>
              </div>
            </div>
            {/*Time input*/}
            <div className="pb-[1.5vh]">
              <div>
                <label className="font-normal text-black text-lg">
                  Time to Remind:
                </label>
              </div>
              <div>
                {/*Hour subinput*/}
                <select
                  className="border-black border-2 border-solid rounded-sm p-[0.5vh] mr-[1.5vh]"
                  onChange={(e) => setHour(e.target.value)}
                >
                  {hours.map((hour) => (
                    <option value={hour.value}>{hour.label}</option>
                  ))}
                </select>
                {/*Minute subinput*/}
                <select
                  className="border-black border-2 border-solid rounded-sm p-[0.5vh]"
                  onChange={(e) => setMin(e.target.value)}
                >
                  {mins.map((min) => (
                    <option value={min.value}>{min.label}</option>
                  ))}
                </select>
              </div>
            </div>
            {/*Message input*/}
            <div className="pb-[1.5vh]">
              <div>
                <label className="font-normal text-black text-lg">
                  Message:
                </label>
              </div>
              <div>
                <textarea
                  className="border-black border-2 border-solid rounded-sm pt-[1.5vh] pb-[1.5vh] w-1/2 bg-gray-200"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="pt-[1.5vh]">
            {/*Submit button - submits data to database and moves user back to the dashboard*/}
            <button
              onClick={() => router.push("/dashboard")}
              type="submit"
              className="p-[1.5vh] bg-black text-white rounded-md font-bold mr-[1.5vh]"
            >
              Submit
            </button>
            {/*Cancel button - moves user back to dashboard page without submitting data*/}
            <button className="p-[1.5vh] bg-gray-200 text-black rounded-md font-bold ">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
