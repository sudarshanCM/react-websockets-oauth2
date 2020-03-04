const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const _ = require("lodash");
const model = require("../models");
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

class UserRoutes {
  constructor(userController) {
    this.controller = userController;
    this.init();
  }

  init() {
    // router.use("/", async (req, res, next) => {
    //   console.log(req.path);
    //   next();
    //   return;
    // });
    router.get("/", async (req, res, next) => {
      res.send("/user/");
      console.log(req.path);
      return;
    });

    router.post("/register", async (req, res) => {
      try {
        console.log(req.fields);
        const data = req.fields;
        const response = await this.controller.register(data);

        res.send(response);
      } catch (err) {
        console.log(err);
        res.json({
          status: "error",
          message: err
        });
      }
    });

    router.post("/login", async (req, res) => {
      try {
        const data = req.fields;
        const response = await this.controller.login(data);

        // console.log(JSON.stringify(response));
        res.send(JSON.stringify(response));
      } catch (err) {
        console.log(err);
        res.json({
          status: "error",
          message: err
        });
      }
    });

    router.get("/question", async (req, res) => {
      try {
        const response = await this.controller.question();
        var arr = [];
        var length = response.res.length;
        // console.log(response.res[0].dataValues);
        // console.log("H",length);
        for (var i = 0; i < length; i++) {
          var questions = response.res[i].dataValues;

          // console.log(JSON.parse(questions.options));
          questions.options = JSON.parse(questions.options);
          // console.log("He", questions);
          arr.push(questions);
          // console.log(questions);
        }
        res.send(arr);
        // console.log("yES",response);
        // res.send(JSON.stringify(response));
      } catch (err) {
        console.log(err);
        res.json({
          status: "error",
          message: err
        });
      }
    });

    router.post("/score", async (req, res) => {
      try {
        const data = req.fields;
        // console.log("HJHK",data);
        const response = await this.controller.score(data);

        // console.log(JSON.stringify(response));
        res.send(JSON.stringify(response));
      } catch (err) {
        console.log(err);
        res.json({
          status: "error",
          message: err
        });
      }
    });

    router.post("/secret", async (req, res) => {
      try {
        const data = req.fields;
        console.log("HJHK", data);
        const response = await this.controller.secret(data);

        // console.log(JSON.stringify(response));
        res.send(JSON.stringify(response));
      } catch (err) {
        console.log(err);
        res.json({
          status: "error",
          message: err
        });
      }
    });

    router.post("/history", async (req, res) => {
      try {
        const data = req.fields;
        console.log("HJHK", data);
        const response = await this.controller.history(data);
        // console.log("asdf",response);
        // console.log(JSON.stringify(response));
        res.send(JSON.stringify(response.arr));
      } catch (err) {
        console.log(err);
        res.json({
          status: "error",
          message: err
        });
      }
    });

    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    passport.deserializeUser(function(user, done) {
      done(null, user);
    });

    passport.use(
      new FacebookStrategy(
        {
          clientID: 1111033332578658,
          clientSecret: "4d359102d1abecc8c67dfff368c0ad01",
          callbackURL: "auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, done) {
          console.log("HUI");
          var userData = {
            email: profile.emails[0].value,
            name: profile.displayName,
            token: accessToken
          };
          console.log("bh", userData);
          done(null, userData);
        }
      )
    );

    // console.log("HU")
    router.get("/auth/facebook", passport.authenticate("facebook"));

    router.get("/getAll", async (req, res) => {
      try {
        const response = await this.controller.getAll();

        // console.log(JSON.stringify(response));
        res.send(JSON.stringify(response));
      } catch (err) {
        console.log(err);
        res.json({
          status: "error",
          message: err
        });
      }
    });

    router.post("/getMessages", async (req, res) => {
      try {
        const data = req.fields;
        // console.log("HJHK",data);
        const response = await this.controller.getMessages(data);

        // console.log(JSON.stringify(response));
        res.send(JSON.stringify(response));
      } catch (err) {
        console.log(err);
        res.json({
          status: "error",
          message: err
        });
      }
    });
  } //endofinit

  getRouter() {
    return router;
  }
} //endofclass

module.exports = controller => {
  return new UserRoutes(controller);
};
