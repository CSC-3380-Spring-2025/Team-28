"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Pencil,
  Settings,
  Timer,
  User,
  CalendarDays,
  Mail,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Dashboard() {
  //useStates
  //Set the randomly picked images to display in the carousel
  const [carouselImages, setCarouselImages] = useState<any[]>([]);
  //Set the tasks to be displayed in the To-Do
  const [tasks, setTasks] = useState<any[]>([]);
  //Setup router to redirect users to proper pages
  const router = useRouter();

  //Fetch data to display on dashboard on initial dashboard load
  const initPage = async () => {
    //Fetch and set three random images from the user's Collections tracker to display in the carousel
    const response = await axios.get("/api/dashboard/fetchRandomImages");
    setCarouselImages(response.data.images);
    //Fetch and set any tasks the user had previously set
    const response2 = await axios.get("/api/dashboard/taskFetch");
    setTasks(response2.data.tasks);
  };

  //Function that adds a task to the to-do list
  async function addToDo() {
    //Prompt user to input a task
    const task = prompt("Input a task to add to your to-do list");
    //Only add the task if there have not been a maximum of 3 tasks added...
    if (tasks.length < 3) {
      //...and the user does not submit an empty input
      if(task != null){
        //Tasks array will be updated in database...
          await axios.post("/api/dashboard/taskAdd", {
            task,
            email: process.env.LOGGED_IN_USER,
          })
        //...and the new task will be reflected on the client side as well
        setTasks((tasks) => [...tasks, task]);
      }
      else{
        alert("Not a valid input")
      }
      
    } else {
      alert("Max number of tasks added");
    }
  }

  //Function that deletes a task from the to-do list
  //It takes an input of task
  async function deleteToDo(task: any) {
    //Updates the user's tasks array to reflect the deleted task...
    await axios.post("/api/dashboard/taskDelete", { task, email: process.env.LOGGED_IN_USER })
    //...as well as update the client side to show this change
    setTasks(tasks => tasks.filter(validTask => validTask !== task))
  }

  //When the page first loads, call the function...
  //...which will fetch the needed data from the database for initialization
  useEffect(() => {
    initPage();
  }, []);

  return (
    <>
      <div className="px-10">
        {/*Page title*/}
        <div className="pt-[1.5vh] pb-[1.5vh]">
          <h1 className="font-bold text-2xl">Dashboard</h1>
        </div>
        <div className="grid grid-cols-3 gap-4 relative w-full max-w-full items-start">
          {/*Image carousel*/}
          {/*<div className="col-span-2 ">
            <Carousel className="w-full h-full">
              <CarouselContent className="h-full">
                {/*This maps each random image to its own card*/}
                {/*Array.from({ length: 3 }).map((_, index) => {
                  const image = carouselImages[index];
                  console.log(image)
                  console.log(image.hobby)
                  return (
                    <CarouselItem key={index} className="h-full">
                      <div className="h-full">
                        <Card>
                          {/*When you click on the image...*/}
                          {/*...it will redirect to its respective individual Collections page*/}
                          {/*<CardContent className="flex w-full h-[40vh] items-center justify-center">
                            {image && (
                              <img
                                src={image.imageURL}
                                className="cursor-pointer"
                                onClick={() => router.push(`/dashboard/hobby/${image.hobby}/collections/?url=${encodeURIComponent(image.imageURL)}`)}
                              />
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 p-2 rounded-full shadow-md" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 p-2 rounded-full shadow-md" />
            </Carousel>
          </div>
          {/*To-do list*/}
          <div className="col-span-1">
            <Card className="h-full">
              <CardContent className="max-h-full h-[40vh] flex flex-col">
                <div className="grid-cols-6w-full flex justify-between p-1">
                  <span className="col-span-1">To-Do</span>
                  <div className="col-span-4"></div>
                  {/*If the button is clicked, it will activate the function to add a task*/}
                  <Button
                    className="rounded-full h-6 w-6 p-0 flex place-items-center"
                    size={"icon"}
                    onClick={() => addToDo()}
                  >
                    +
                  </Button>
                </div>
                <Separator></Separator>
                <div className="col-span-3">
                  {/*This maps each task to display as its own separate div with its respective checkbox*/}
                  {/*When a checkbox is clicked, the function to delete a task will activate*/}
                  {tasks.map((task, index) => {
                    return (
                      <>
                        <div className="flex">
                          <input
                          className="mr-2"
                            type="checkbox"
                            key={index}
                            onClick={() => deleteToDo(task)}
                          ></input>
                          <div >{task}</div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-[2.5vh]">
          <div>
            {/*Tools - buttons to redirect to different parts of the web app*/}
            <div className="h-[45vh] border-none justify-items-start">
              <h3 className="font-bold text-md pb-[1vh]">Tools</h3>
              <div className="grid grid-cols-1">
                {/*Heads to hobby editor page*/}
                <div className="pb-[1vh]">
                  <Button
                    className="rounded-full w-3/5 justify-stretch"
                    onClick={() => router.push("/dashboard/hobby-editor")}
                  >
                    <Pencil></Pencil>
                    Hobby Editor
                  </Button>
                </div>
                {/*Heads to mascot editor page*/}
                <div className="pb-[1vh]">
                  <Button
                    className="rounded-full w-3/5 justify-stretch"
                    onClick={() => router.push("/dashboard/dressup")}
                  >
                    <User></User>
                    Mascot
                  </Button>
                </div>
                {/*Heads to calendar page*/}
                <div className="pb-[1vh]">
                  <Button
                    className="rounded-full w-3/5 justify-stretch"
                    onClick={() => router.push("/dashboard/calendar")}
                  >
                    <CalendarDays></CalendarDays>
                    Calendar
                  </Button>
                </div>
                {/*Heads to timer page*/}
                <div className="pb-[1vh]">
                  <Button
                    className="rounded-full w-3/5 justify-stretch"
                    onClick={() => router.push("/dashboard/timer")}
                  >
                    <Timer></Timer>
                    Timer
                  </Button>
                </div>
                {/*Heads to email reminders page*/}
                <div className="pb-[1vh]">
                  <Button
                    className="rounded-full w-3/5 justify-stretch"
                    onClick={() => router.push("/dashboard/email")}
                  >
                    <Mail></Mail>
                    Reminders
                  </Button>
                </div>
                {/*Heads to settings page*/}
                <div className="pb-[1vh]">
                  <Button
                    className="rounded-full w-3/5 justify-stretch"
                    onClick={() => router.push("/dashboard/settings")}
                  >
                    <Settings></Settings>
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/*Display user's customized mascot*/}
          {/*Will go to mascot editor on click*/}
          <div>
            <Link href="/dashboard/dressup">
              <Card className="h-[45vh]">
                <CardContent>
                  <div className="h-[45vh] relative">
                    <Image
                      src="/mascot.png"
                      alt="mascot"
                      layout="fill"
                      objectFit="contain"
                    ></Image>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
          {/*Calendar - displays today's date*/}
          {/*Will go to calendar on click*/}
          <div className="w-full col-span-1">
            <div className="w-full h-[45vh]flex items-center justify-center">
              <Link href="/dashboard/calendar">
                <Calendar
                  className="w-full h-[45vh] max-h-full border-black border-[1.5px] rounded-xl"
                  classNames={{
                    months:
                      "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                    month: "space-y-4 w-full flex flex-col",
                    table: "w-full border-collapse space-y-1",
                    head_row: "",
                    row: "w-full mt-2",
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
