//The GA stands for Github Action, so the full file name is emailGithubAction.ts
//This file is ran by the GithubAction we have to send emails to users every week
require("dotenv").config();
import nodemailer from "nodemailer"
import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"
const nodeCron = require("node-cron");

async function run() {
  //Connect to database
  await connectionToDatabase();

  //Setup arrays
  //This one holds the emails to send to 
  let emailArr: string[] = [];
  //This one holds the messages that go with each email
  let messageArr: string[] = [];
  //This one holds the schedules of each email
  let scheduleArr: string[] = [];
  //This one holds the scheduled cron jobs to send out each email
  let cronArr: any[] = [];
  
  //Cancels the previous cron jobs from the last time 
  //(the GitHub Action is scheduled weekly, so I'm clearing it out just in case there are new emails to be sent or 
  //some people don't want emails every week anymore)
  cronArr.forEach(cron => cron.stop())

  //Find all the users who want emails, then push needed data into necessary arrays
    try {
    const userData = await User.find({sendEmail: true})
    for(var i = 0; i < userData.length; i++){
      emailArr.push(userData[i].email)
    }
    for(var i = 0; i < userData.length; i++){
      scheduleArr.push(userData[i].schedule)
    }
    for(var i = 0; i < userData.length; i++){
      messageArr.push(userData[i].reminder)
    }
    } 
  //Catch errors if there happen to be errors
    catch (err) {
      console.log(err);
    } 

    //For each email, schedule the weekly email reminder to be sent at the scheduled time...
    //...with the corresponding message
    //Save that job in the cronArr to cancel it the next week
    for (let i = 0; i < emailArr.length; i++) {
      cronArr[i] = nodeCron.schedule(scheduleArr[i], () => {
          sendEmail(emailArr[i], messageArr[i]);
      });
    }
}

//This is the function that actually sends the emails
async function sendEmail(email: any, message: string){
  //Setting up security stuff that allows the email to be sent
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.FROM_PASSWORD,
    },
  });

  //Format of the email to be sent
  await transporter.sendMail({
    from: process.env.FROM_EMAIL, 
    to: email, 
    subject: "HOBBY HELPER AUTOMATED WEEKLY REMINDER", 
    text: `${message}`
  });
}

//Run the code when called
run();


