require("dotenv").config();
import nodemailer from "nodemailer"
import connectionToDatabase from "@/lib/mongoose"
import User from "@/models/user"

async function run() {
  console.log("test");

  await connectionToDatabase();

  let arr: any[] = [];
    try {
    await User.find({})
    .then((docs: any[]) => {
      docs.forEach((doc: { email: any; }) => {
        sendEmail(doc.email)
        arr.push(doc.email);
        console.log(arr)
      });
    })
    .catch((err: any) => console.error(err));
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
      console.log(err);
    } finally {
    }
  console.log(arr.join(","));

  
}

async function sendEmail(email: any){
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.FROM_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.FROM_EMAIL, 
    to: email, 
    subject: "HOBBY HELPER AUTOMATED WEEKLY REMINDER", 
    text: `hi`, 
    html: `<b>hi<b>`
  });
}

run();


