"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Heart, icons } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import Link from "next/link";

export default function Dashboard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <>
      <div className="px-10">
        <div className="pt-[1.5vh] pb-[1.5vh]">
          <h1 className="font-bold text-2xl">Dashboard</h1>
        </div>
        <div className="grid grid-cols-3 gap-4 relative w-full max-w-full items-start">
          <div className="col-span-2 ">
            <Carousel className="w-full h-full">
              <CarouselContent className="h-full">
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="h-full">
                    <div className="h-full">
                      <Card>
                        <CardContent className="flex w-full h-[40vh] items-center justify-center">
                          <span className="text-4xl font-semibold">
                            {index + 1}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 p-2 rounded-full shadow-md" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 p-2 rounded-full shadow-md" />
            </Carousel>
          </div>
          <div className="col-span-1">
            <Card className="h-full">
              <CardContent className="max-h-full h-[40vh] flex flex-col">
                <div className="grid-cols-6w-full flex justify-between p-1">
                  <span className="col-span-1">To-Do</span>
                  <div className="col-span-4"></div>
                  <Button
                    className="rounded-full h-6 w-6 p-0 flex items-center justify-center"
                    size={"icon"}
                  >
                    +
                  </Button>
                </div>
                <Separator></Separator>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-[2.5vh]">
          <div>
            <div className="h-[45vh] border-none justify-items-start">
              <h3 className="font-bold text-md pb-[1vh]">Tools</h3>
              <div className="grid grid-cols-1">
                <div className="pb-[1vh]">
                  <Button className="rounded-full w-3/5 justify-stretch">
                    <Heart></Heart>
                    Hobby Editor
                  </Button>
                </div>
                <div className="pb-[1vh]">
                  <Button className="rounded-full w-3/5 justify-stretch">
                    <Heart></Heart>
                    Mascot
                  </Button>
                </div>
                <div className="pb-[1vh]">
                  <Button className="rounded-full w-3/5 justify-stretch">
                    <Heart></Heart>
                    Calendar
                  </Button>
                </div>
                <div className="pb-[1vh]">
                  <Button className="rounded-full w-3/5 justify-stretch">
                    <Heart></Heart>
                    Timer
                  </Button>
                </div>
                <div className="pb-[1vh]">
                  <Button className="rounded-full w-3/5 justify-stretch">
                    <Heart></Heart>
                    Reminders
                  </Button>
                </div>
                <div className="pb-[1vh]">
                  <Button className="rounded-full w-3/5 justify-stretch">
                    <Heart></Heart>
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Link href="/mascot">
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
          <div className="w-full col-span-1">
            <div className="w-full h-[45vh]flex items-center justify-center">
              <Link href="/calendar">
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
