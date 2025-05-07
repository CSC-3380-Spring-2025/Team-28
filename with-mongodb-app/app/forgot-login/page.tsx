"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  //useStates
  //Set user email
  const [email, setEmail] = useState("");
  //Set changed user password
  const [password, setPassword] = useState("");
  //Set confirmed changed user password
  const [cPassword, setcPassword] = useState("");
  //Setup router to redirect users to proper pages
  const router = useRouter();

  //When user submits their email, new password, and confirmed new password...
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //...a popup will alert the user if their passwords aren't equal...
    if (cPassword !== password) {
      window.alert("The passwords are not the same");
    }
    //...otherwise, their password will be updated in the database...
    else {
      const response = await axios.post("/api/forgot-password", {
        email,
        password,
      });
      //...and they will be redirected to the login page to test out their shiny new password
      if (response.data.status == 201) {
        router.push("/");
      }
    }
  };
  return (
    <div className="flex items-center justify-center flex-col min-h-[100vh]">
      {/*The title of the page*/}
      <h1 className="font-bold text-7xl mb-9">Reset Password</h1>
      {/*Form for user input of email, new password, and confirmed new password*/}
      <form onSubmit={handleSubmit}>
        {/*Email input*/}
        <div>
          <h2 className="mt-2 mb-1">Email</h2>
          <input
            className="bg-[#D9D9D9] rounded-md text-black h-10 p-2 border-black border-2 border-solid"
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        {/*New password input*/}
        <div>
          <h2 className="mt-2 mb-1">Password</h2>
          <input
            className="bg-[#D9D9D9] rounded-md text-black h-10 p-2 border-black border-2 border-solid"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setcPassword(e.target.value)}
          ></input>
        </div>
        {/*Confirmed new password input*/}
        <div>
          <h2 className="mt-2 mb-1">Confirm Password</h2>
          <input
            className="bg-[#D9D9D9] rounded-md text-black h-10 p-2 border-black border-2 border-solid"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        {/*The submit button, will activate handleSubmit*/}
        <div className="flex items-center justify-center mt-10 mb-2">
          <button
            type="submit"
            className="hover:bg-gray-700 bg-black rounded-md text-white text-md h-10 w-40"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}
