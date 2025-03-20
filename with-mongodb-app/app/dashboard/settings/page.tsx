"use client";

import Form from "next/form";

import ColorPicker from "@/components/color-picker";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Heart, icons, Pencil } from "lucide-react";
import React from "react";
import Link from "next/link";

export default function Dashboard() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <>
      <div className="px-10">
        <div className="pt-[1.5vh] pb-[1.5vh]">
          <h1 className="font-bold text-2xl">Settings</h1>
        </div>
        <div className="grid grid-cols-3 gap-4 relative w-full max-w-full items-start">
          <h3 className="font-bold text-md pb-[1vh] col-span-3">Account</h3>
          <div className="grid grid-cols-1 col-span-1">
            <Button
              className="w-20 h-20 rounded-full border-[1.5px] border-black bg-sidebar-accent"
              size={"icon"}
            ><Pencil color="black"></Pencil></Button>
            Edit Profile
          </div>
          <div className="grid grid-cols-1 col-span-1">
            <Form action="" className="grid grid-cols-2">
              <span className="pb-[0.5vh] col-span-1">New Display Name: </span>
              <input
                name="text"
                className="rounded-sm border-[1.5px] border-black col-span-1"
              />
              <div className="pt-[0.5vh] col-span-2">
                <Button className="rounded-xl w-1/3">Change Name</Button>
              </div>
            </Form>
          </div>
            <div className="grid grid-cols-1 col-span-1">
              <div className="pb-[0.5vh]">
                <Button className="rounded-xl w-3/5">Reset Password</Button>
              </div>
              <div className="pb-[0.5vh]">
                <Button className="rounded-xl w-3/5">Change Email</Button>
              </div>
              <div className="pb-[0.5vh]">
                <Button className="rounded-xl w-3/5 bg-[#ED2727] hover:bg-red-900">
                  Delete Account
                </Button>
              </div>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-4 relative w-full max-w-full items-start pt-[2.5vh]">
          <h3 className="font-bold text-md pb-[1vh] col-span-3">
            Customization
          </h3>
          <div>
            <div className="grid grid-cols-1 col-span-1">
              <Form action="" className="grid grid-cols-2">
                  <span className="pb-[0.5vh] col-span-1">Primary Color:  </span>
                  <input
                    name="text"
                    className="rounded-sm border-[1.5px] pb-[0.5vh] border-black col-span-1"
                  />
                <div className="p-[0.5vh] col-span-2"></div>
                <span className="pb-[0.5vh] col-span-1">Accent Color 1: </span>
                <input
                  name="text"
                  className="rounded-sm border-[1.5px] pb-[0.5vh] border-black col-span-1"
                />
                <div className="p-[0.5vh] col-span-2"></div>
                <span className="pb-[0.5vh] col-span-1">Accent Color 2: </span>
                <input
                  name="text"
                  className="rounded-sm border-[1.5px] pb-[0.5vh] border-black col-span-1"
                />
                <div className="p-[0.5vh] col-span-2"></div>
              </Form>
              <div className="grid grid-cols-3 col-span-1">
                <div className="p-[0.5vh] col-span-1">
                  <Button className="rounded-xl w-full">Apply</Button>
                </div>
                <div className="p-[0.5vh] col-span-1">
                  <Button className="rounded-xl w-full bg-sidebar-accent hover:bg-gray-400">
                    Save
                  </Button>
                </div>
                <div className="p-[0.5vh] col-span-1">
                  <Button className="rounded-xl w-full bg-sidebar-accent hover:bg-gray-400">
                    Load
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 justify-items-center">
            <ColorPicker default_value="#1C9488" />
          </div>
          <div className="col-span-1">
            Default Theme:
            <div className="pb-[0.5vh]">
              <Button className="rounded-xl w-1/3">Dark Mode</Button>
            </div>
            <div className="pb-[0.5vh]">
              <Button className="rounded-xl w-1/3">Light Mode</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
