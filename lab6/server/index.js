const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 4000
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors())
let users = []
let history = []

socketIO.on('connection', (socket) => {

    console.log(`⚡: ${socket.id} user just connected!`) 
    
    socket.on("newUser", data => {
      // Avoid adding duplicate users
      if (!users.some(user => user.socketID === data.socketID)) {
        users.push(data);
      }
      socketIO.emit("newUserResponse", users)
    })

     // Send the chat history to the newly connected user
    socket.emit("historyResponse", history);
    socket.on("message", data => {
      history.push(data);  // Save the message in history
      socketIO.emit("messageResponse", data)
    })

    socket.on("typing", data => (
      socket.broadcast.emit("typingResponse", data)
    ))

    
 
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
      users = users.filter(user => user.socketID !== socket.id)
      socketIO.emit("newUserResponse", users)
      socket.disconnect()
    });
});

app.get("/api", (req, res) => {
  res.json({message: "Hello"})
});

   
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});