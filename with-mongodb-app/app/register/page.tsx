"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  //useStates
  //Set new user name
  const [name, setName] = useState("");
  //Set new user email
  const [email, setEmail] = useState("");
  //Set new user password
  const [password, setPassword] = useState("");
  //Setup router to redirect users to proper pages
  const router = useRouter();

  //When user submits their name, email, and password, data will be sent to database...
  //...and create a new user in the User Collection
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await axios.post("/api/register", {
      name,
      email,
      password,
    });
    //Push the user to the login page to put their new account to use
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-[100vh]">
      {/*The title of the page*/}
      <h1 className="font-bold text-7xl mb-9">Create Account</h1>
      {/*Form for user input of name, email, and password*/}
      <form onSubmit={handleSubmit}>
        {/*Name input*/}
        <h2 className="mt-2 mb-1">Name</h2>
        <div>
          <input
            className="bg-[#D9D9D9] rounded-md text-black h-10 p-2 border-black border-2 border-solid"
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        {/*Email input*/}
        <h2 className="mt-2 mb-1">Email</h2>
        <div>
          <input
            className="bg-[#D9D9D9] rounded-md text-black h-10 w-15 p-2 border-black border-2 border-solid"
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        {/*Password input*/}
        <h2 className="mt-2 mb-1">Password</h2>
        <div>
          <input
            className="bg-[#D9D9D9] rounded-md text-black h-10 w-15 p-2 border-black border-2 border-solid"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        {/*The submit button, will activate handleSubmit*/}
        <div className="flex items-center justify-center mt-10 mb-1">
          <button
            type="submit"
            className="bg-black rounded-md text-white text-md h-10 w-20"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
