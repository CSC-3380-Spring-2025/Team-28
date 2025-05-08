# [Hobby Tracker] : [Team 28]
# Members
Project Manager: [Nora Pray] (ny0o0om)
Communications Lead: [Khalil El-abbassi] (KhalilE792)
Git Master: [Joshua Harris] (Joshua4978)
Design Lead: [Helena Schuler] (hschuler13)
Quality Assurance Tester: [Lynn Casper] (Tcasperv)

# About Our Software

Hobby Tracker is a web-app to help encourage users to pursue and develop new hobbies while also helping them be consistent with their current hobbies. There are three main features of the app:
1) Mascot dressup: A mascot is present to give users a fun encouragement. The mascot can be dressed up and customized to the user's liking.
2) Time management tools: There is a pomodoro timer to manage time and give proper breaks in between hobby sessions, a page that adds events to a user's Google Calendar to remind user's of their hobby, and email reminders
to remind users weekly.
3) Hobby tracker pages: There are three available tracker page types: blog (posts of ), collections (), and 

## Platforms Tested on
- MacOS
- Windows

# Important Links
1) Kanban Board: [https://github.com/CSC-3380-Spring-2025/Team-28/issues] 
2) Designs: 
- MacBook Air Designs: [https://www.figma.com/proto/rHYLfUW2ZP1fctNyf5og8n/team-28---%E2%89%A7%E2%96%BD%E2%89%A6--?node-id=472-3&p=f&t=FxjdTcYn0CpN99cH-1&scaling=scale-down&content-scaling=fixed&page-id=472%3A2]
- Standard Desktop Designs: [https://www.figma.com/proto/rHYLfUW2ZP1fctNyf5og8n/team-28---%E2%89%A7%E2%96%BD%E2%89%A6--?node-id=472-1130&p=f&t=oMW40sXMmeIhhgp1-1&scaling=contain&content-scaling=fixed&page-id=472%3A1129] 
3) Styles Guide(s): [https://drive.google.com/file/d/1ABqHBj43B3vap2-06WOuVx5YNlzSm1pI/view?usp=sharing] 

# How to Run Dev and Test Environment

## Dependencies
- VS Code
- Node.js (v 22.14.0)
- npm (v 10.9.2)
- pnpm (v 10.8.1)
### Downloading Dependencies
- [VS Code Download](https://code.visualstudio.com/Download)
- [Node.js Download](https://nodejs.org/en/download)
- npm is already bundled with Node.js
- [pnpm Download](https://pnpm.io/installation) Instructions to install pnpm are already provided in the commands section, but this is the installation documentation for additional downloading help if needed.

## Commands
First, download Node.js via the given link. Npm should be bundled with it. Make sure you have VS Code downloaded and open the terminal inside VS Code. 
Run this command to check your Node.js version.
```sh
node -v
```
Then run this command to check your npm version
```sh
npm -v
```
The GitHub repository should be cloned. Open the terminal in VSCode, cd into the directory you want to hold the cloned repository. Then, run the
following command to clone the GitHub repository.
```sh
git clone https://github.com/CSC-3380-Spring-2025/Team-28.git
```
In the same directory you saved the cloned repository, cd into the newly created folder of the cloned repository
```sh
cd Team-28
```
After that, cd into the folder with-mongodb-app. This is where the code that will be run 
```sh
cd with-mongodb-app
```
Next, in that directory, install pnpm with npm using this command
```sh
npm install -g pnpm@latest-10
```
The dependencies must be installed with pnpm. Run this command to install them all at once
```sh
pnpm i
```
The imports of the dependencies will still throw an error despite them being installed already. Close VS Code and reopen to the same cloned repo. Use the cd command to get back
to the proper directory: (wherever you cloned your directory)/Team-28/with-mongodb-app

Now, add a .env.local file inside the with-mongodb-app folder. Format it like the following. Make sure to replace the placeholder values on the right side of the equals sign
with the actual keys. Leave the LOGGED_IN_USER field blank.
```sh
MONGODB_URI=YOUR_MONGODB_URI
EDGE_STORE_ACCESS_KEY=YOUR_EDGE_STORE_ACCESS_KEY
EDGE_STORE_SECRET_KEY=YOUR_EDGE_STORE_SECRET_KEY
NEXT_PUBLIC_AUTH_GOOGLE_ID=YOUR_NEXT_PUBLIC_AUTH_GOOGLE_ID
CLIENT_SECRET=YOUR_CLIENT_SECRET
LOGGED_IN_USER=
```
You are now ready to run the project! Make sure you cd into the with-mongodb-app directory. In the terminal, type this command:
```sh
pnpm dev
```
Follow the link given in the terminal after the command is entered (should be something like http://localhost:3000) and you will be able to access Hobby Helper.
