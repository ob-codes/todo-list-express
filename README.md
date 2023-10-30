Getting Started
Go to todo-list-express repository(https://github.com/100devs/todo-list-express) and click "Fork" on the top right. This is basically "Save As"ing the project to your own GitHub.

In your forked repository, click Code -> HTTPS -> copy the link

Choose a location on your local PC where you want to create a copy of these files to work on. Use the terminal to access that location, and type: git clone [paste link from previous step]

Now you can work on the code. The assignment is to comment every line. Probably start with server.js, then move to index.ejs, main.js, and style.css if you want.

Running the App
(Note: This technically isn't part of the assignment, but I'd like to get it working if possible...)

Orginal README said: run "npm install" -> run this command from the terminal, while in your repository's folder

Original README said: add DB_STRING to .env file -> create a file called ".env", and type DB_STRING=your MongoDB connection string.
Note: If you need help, follow along with this article to get the connection string: https://zellwk.com/blog/crud-express-mongodb/#setting-up-mongodb-atlas. Then, add the connection string to the .env file like:
DB_STRING=mongodb+srv://..... (continue with the full connection string. This is sensitive information, which is why it's being stored in the .env, and the .gitignore file lists ".env" so that it is not shared to the public github repository.)

Start the node server by running this command in terminal within repository folder: node server.js
Note: If running properly, the terminal will state:
"Server running on port 2121
Connected to todo Database"

Open the application by going to http://127.0.0.1:2121/ or http://localhost:2121/ (the server is running on port 2121 on your local machine, which has the address of 127.0.0.1 (or localhost) when referring to itself)