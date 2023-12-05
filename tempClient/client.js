/* This is a temporary client to test the websocket connection to the database.
Any updates to the user table in the discordgc_db will automatically update in the 
client browser. A websocket API doesn't have to be used for database connection. We
could just use a REST API instead.  
*/
import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";
  const socket = io("http://localhost:3000");

  let arry = [];

  socket.on("connect", () => {

    socket.on("getfirst", (data) => {
      if(data) {
        console.log(data);
        arry = data;
        updateDisplay();
      }
      console.log(socket.id);
      
    })

    socket.on("foo", (data) => {
      if(data) {
        console.log(data);
        arry = data.data;
        updateDisplay();
      }
    })
  });
  function updateDisplay() {
    let test = JSON.stringify(arry);
    document.getElementById("demo").innerHTML = test;
  }