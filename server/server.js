const express = require("express");
const cors = require("cors");
const jwtService = require("./libs/jwtService.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;

const users = {
  userEmail1: {
    password: "userPassword1",
    name: "userName1",
    birthday: "01.10.1999",
  },
  userEmail2: {
    password: "userPassword2",
    name: "userName2",
    birthday: "02.10.1999",
  },
  userEmail3: {
    password: "userPassword3",
    name: "userName3",
    birthday: "03.10.1999",
  },
};

function start() {
  try {
    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          throw "";
        }
        if (!users[email] || users[email]?.password !== password.trim()) {
          return res.status(400).json({
            message: "The email address or password is incorrect.",
          });
        }

        const token = await jwtService.generateAccessToken({
          email,
          password,
        });

        return res.status(200).json({ token });
      } catch (e) {
        return res.status(400).json({
          message: "The email address and password can't be empty.",
        });
      }
    });

    app.get("/userinfo", async (req, res) => {
      try {
        const token = req.headers?.authorization;
        const TOKEN_INCORRECT_MSG = "Token is incorrect";

        if (!token) {
          return res.status(400).send("Token can't be empty");
        }

        try {
          tokenBody = await jwtService.verifyAccessToken(token);
        } catch (e) {
          return res.status(400).send(TOKEN_INCORRECT_MSG);
        }

        const { email, password } = tokenBody;

        if (!users[email] || users[email]?.password !== password) {
          return res.status(400).json({
            message: TOKEN_INCORRECT_MSG,
          });
        }

        const user = {
          email,
          ...users[email],
        };

        delete user.password;

        return res.status(200).json(user);
      } catch (e) {
        console.error(e);
        return res.status(400).send(TOKEN_INCORRECT_MSG);
      }
    });
    app.listen(PORT, () => {
      console.log("server running on port: ", PORT);
    });
  } catch (err) {
    console.error(err);
  }
}
start();
