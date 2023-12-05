const express = require("express");
const PORT = 3000;
const { createServer } = require("http");
const { Server } = require("socket.io");
const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: true,
    origin: ["http://localhost:3000"]
  
});

app.use(express.static('../tempClient'));
app.get('/', (req, res) => {
  res.sendFile("index.html");
})

// Instatiate and create database connection using preexisting connection
io.on("connection", async(socket) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: "discordgc_db"
  });

  const instance = new MySQLEvents(connection, {
    startAtEnd: true,
  });

  // Start function ensures that MySQL is connected before resolving its promise
  await instance.start();

  // Adds a trigger for the given expression/statement and calls the onEvent function when the event happens.
  instance.addTrigger({
    name: 'TEST',
    expression: 'discordgc_db.user', // This can be changed to wait for any schema, table, or column event. Could also use "*".
    statement: MySQLEvents.STATEMENTS.ALL,
    onEvent: (event) => {
      console.log(event);
      if(event) {
        const sql = "SELECT * from user";
        connection.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          socket.emit("foo", {data:result})
        });
        console.log("user connected");
      }
    },
  });

  instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
  instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);

  const sql = "SELECT * from user";
        connection.query(sql, (err, result) => {
          if(err) throw err;
          console.log(result);
          socket.emit("getfirst", result);
        })
  console.log("user connected");
})

httpServer.listen(PORT, ()=> {
  console.log(`Server listening on http://localhost:${PORT}`)
});