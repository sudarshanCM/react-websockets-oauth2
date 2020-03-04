const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const Sequelize = require("sequelize");
var http_port = 3007;
var formidable = require("express-formidable");
const model = require("./models");
const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketio(server);
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;

var users = [];
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

io.on("connection", socket => {
  // console.log('User has connected',socket.id);
  socket.on("user_connected", username => {
    users[username] = socket.id;
    console.log("hi", username);
    console.log("hey", users[username]);
    io.emit("user_connected", username);
  });

  // socket.on('join',({name,room},callback)=>{
  //   // console.log(name,room);
  //   const { error, user } = addUser({ id: socket.id, name, room });

  //   if(error) return callback(error);

  //   socket.join(user.room);

  //   // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

  //   callback();
  // });

  socket.on("sendMessage", (message, sender, receiver, callback) => {
    var socketId = users[sender];
    var socketId1 = users[receiver];
    // console.log(receiver);
    // console.log("asd",users[receiver]);
    console.log("sa", socketId);
    // var senderId = users[sender];
    io.to(socketId).emit("message", { user: sender, text: message });
    io.to(socketId1).emit("message", { user: sender, text: message });
    // io.to(senderId).emit('message', { user: sender, text: message });
    const userData = {
      sender: sender,
      receiver: receiver,
      message: message
    };
    model.messages.create(userData);
    // .then(res =>{

    //    res.send({code:200,message:"Success"})

    // })
    // .catch(err =>{
    //   res.send({code:400,message:"Error"})
    // })
    // const user = getUser(socket.id);

    // io.to(socket.id).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
  });
});

server.listen(5000, () => console.log("Server started on port 5000"));

var seq = new Sequelize("reactdb", "root", "root", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",
  opertorsAliases: false,
  timezone: "+05:30"
});

class App {
  constructor() {
    this.init();
  }

  init() {
    this.initdb();
  }
  initdb() {
    seq
      .authenticate()
      .then((req, res, next) => {
        console.log("Connection has been established successfully.");
        this.initHTTPServer();
        this.initControllers();
        this.initRoutes();
      })
      .catch(error => {
        console.error("Unable to connect to the database:", error);
      });
  }
  initHTTPServer() {
    app.use(formidable());
    app.use(cors());
    app.listen(http_port, function() {
      console.log("Listening on port" + " " + http_port);
    });
    app.use(passport.initialize());
  }
  initControllers() {
    this.userController = require("./Controllers/user_controller.js")();
  }

  initRoutes() {
    const userRoute = require("./routes/users_route.js")(this.userController);

    console.log("HUI");
    app.get("/", (req, res) => res.send("ok "));
    app.use("/user", userRoute.getRouter());

    app.get(
      "/auth/auth/facebook/callback",
      passport.authenticate("facebook", {
        failureRedirect: "/",
        session: false
      }),
      function(req, res) {
        var token = req.user.token;
        res.redirect("http://localhost:3007/user/join?join=" + token);
      }
    );
  }
}

const AppObj = new App();
