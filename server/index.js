const http =require("http");
const cors = require("cors");
const express = require("express");
const app = express();
const socketIO = require("socket.io");
const server = http.createServer(app);
const PORT = 4500 || process.env.PORT
const users = [];
app.use(cors({
    origin: "https://baat-karo-zn84.vercel.app",
    credentials: true,
}));
app.get('/',(req,res)=>{
    res.send("Hello Gitesh")
})
const io = socketIO(server)
io.on("connection",(socket) =>{
    console.log("New connection")
socket.on(('joined'), ({user}) =>{
    users[socket.id] = user;
    socket.broadcast.emit('joinedUser',{user:"admin" , message:`${users[socket.id]} has joined`})
    socket.emit('join',{user:"admin" , message:`welcome to chat ${users[socket.id]}`})
})
socket.on('disconnect', () =>{
    socket.broadcast.emit('leave' , {user:"admin" , message:`${users[socket.id]} has left`})
    console.log(`user left`)
})
socket.on('message', ({message ,id}) =>{
    io.emit('sendmessage' , {user:users[id] , message , id})
})
});
server.listen(PORT ,() =>{
    console.log(`server is running at http://localhost:${PORT}/`)
})

