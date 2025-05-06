"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  //useStates
  //Set user email
  const [email, setEmail] = useState("");
  //Set user password
  const [password, setPassword] = useState("");
  //Setup router to redirect users to proper pages
  const router = useRouter();

  //Router redirects
  //Redirects user to the register page
  const redirectRegister = () => {
    router.push("/register");
  };
  //Redirects user to the forgotten password page
  const forgotPassword = () => {
    router.push("/forgot-login");
  };

  //When user submits their email and password, data will be sent to the corresponding API route... 
  //...to check if the email and password were correctly inputted
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await axios.post("/api/login", { email, password });
    //If the api returns a 201 status, that means the email and password have confirmed to be correct
    if (response.data.status == 201) {
      //Allow user to proceed to the dashboard page (redirect them to there)
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-[100vh]">
      {/*The title of our project, tell user what they're getting into*/}
      <h1 className="font-bold text-7xl mb-9">Hobby Helper</h1>
       {/*Form to accept user input of email and password*/}
      <form onSubmit={handleSubmit}>
        {/*Email input*/}
        <h2 className="mt-2 mb-1">Email</h2>
        <div>
          <input
            className="bg-[#D9D9D9] rounded-md text-black h-10 p-2"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        {/*Password input*/}
        <h2 className="mt-2 mb-1">Password</h2>
        <div>
          <input
            className="bg-[#D9D9D9] rounded-md text-black h-10  p-2 "
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {/*The submit button, will activate handleSubmit*/}
          <button
            className="hover:bg-gray-700 bg-black rounded-md text-white h-10 w-10 p-2 ml-2"
            type="submit"
          >
            →
          </button>
          {/*Click this and go to the forgot password page*/}
          <h3
            onClick={forgotPassword}
            className="text-xs mb-10 hover:text-sky-700 cursor-pointer"
          >
            Forgot Password?
          </h3>
        </div>
      </form>
      {/*Click the button and go to the register page*/}
      <h3>New to Hobby Helper?</h3>
      <button
        onClick={redirectRegister}
        className="hover:bg-gray-700 bg-black rounded-md text-white text-md h-10 w-20 justify-center my-3 "
      >
        Sign up
      </button>
    </div>
  );
}


