import express, { request, response, Router } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { stringToHash, varifyHash } from "bcrypt-inzi";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import admin from "firebase-admin";
import crypto from "crypto";
var serviceAccount = {
  type: "service_account",
  project_id: "e-commerce-web-app-b529f",
  private_key_id: "ca3d3639342958192a58b3722bd028b689365daa",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDSSA2Cp6DsCF2V\nHTzKf0qiQcpVyypDmFL2zj1UYwI7r12oGpz0DSmlAt4gVyMMewSBFr0ITg6FYAH+\nou5i4AsNdkGGzPAr854U93dtVVoj7w1mkU2doHZMmFe7IKWdFIOrpny/G/tTt9gK\n14go6IKZYNMuLnzWZip5Bx2ou9hph1bJhLemb2+U10JhTSBaGMZo0CvOISYiSpre\njiqNYPmUElVKNeKfAiuZb1x+yGW8FRfy4MjwTJDq4b6pUhbzqlwHl9raN3jb6cs3\n/S2rE9J1YvAi1W5KkYdFiBA/GnngX2F8YDP2MPd6ZO1sddDBG1KkPLpXHEoR+95K\nL7Zw+L9lAgMBAAECggEALCm9zKbwASJwpRSS4+SABDvVBte4dKHVKsh90O9KVMar\n4NZWCFuLV4CWriwezEw50fK4mLnsCs7zHEuTzWhIafdgI7N+7XwowzaF+oxmdg2K\nvvPdXTGKJuQH6OEeZzMbxD0fDfQOgLKnyP8jNZQ/eX8AWz6gMVcbrHd2Hy30cZT9\nJ9lhQbpk9DGfigQrNB3Gs1IOulT769NmzMbVhFoq44Wb+SOeBwFbjveErSOF3mbR\nrpqrgZ/IcYD9Km/KYHjH9+ea2ygLYkrbt+COmgDFXAk/McZVMhAdTm+6UOHxy7/X\nYbJ8cqkbuIHq8CTvJ/lOfRZneKjtQPIx6kfF1ibHsQKBgQD9xAOsAS4qvKnuygoH\nBJMPEdfENQTS1Xy3CIhIdd6qo8QtTyuyoHj05Ty/QaI+NlbCQ87lFIjefVDO/ML6\ni89UajPy27YS6a8G9YTdmnFIhp8laSRTNZy5pW3F/27DelVsQfs23WtWGlvgYHgB\nBAFH3GQ6YXRYZoPwmuxMCjzm0wKBgQDUIgZ+O8Q7bBrOgFpv2jpyzLoFnCqRVQAi\nLWi2ztQ7yYkDeZi/YgQk6r90Tu0cQLC375DFpdcAck0JWgj1RJtpgis9IJmHrdEo\n8TktklINma47KEquKEZtriT9PIqOV204Oy2Y7+YsBWOtQnPRbtPXB7xxGPy4ko5E\ny22rwq1N5wKBgC0SO3S5YPHGQIhg6hcFAPmUObZnlEu+D0CTC2GTTdEQ9S72+NPp\nHJKihH+TsLVMAWzPjlexpf2eVFPvINJPMqvTkRZ5X4VMbAHYaZjSbXxsLKgAXKtK\nwmNWtoCMNagSekmYDn5YJVBNrjPT7nx/sZqJ0mNsG7X3v0dkvMNkrhxxAoGAORNC\njfpErPxEJiVwr8GWkka1EkdXSK0HESsIjo8NmVx7Kd0wlOWpWclzY7bMoxpgscya\nNiONuogGZCq+WEdyTSwBuDuqM1A4A30LtlA1FYWw1CfeGAesE1yUhTIh0XSCZWu+\ns/RwCI4WqIpFoSbhhmyFbiSb8ok0EBxv0JPbjycCgYABZxZ5vsjTPNy0et4RY/bS\nJquFW+8KiUWm/XQfTTzQPyNKfzjq9DY5kBxXSXOpK57O+76X8jHATcC3meMC/xgD\nIiN42p9dY8eaTG+Ts3rUViSqMAnIsjL3eeHQM0JECZA/BceMskKugICA96NULJV8\nuIQgeCavvPwXTtFJubYZvw==\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-f84xn@e-commerce-web-app-b529f.iam.gserviceaccount.com",
  client_id: "102049338874548601298",
  client_address: "adegheh",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-f84xn%40e-commerce-web-app-b529f.iam.gserviceaccount.com",
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-commerce-web-app-b529f.firebaseio.com",
});

const dbURI =
  process.env.MONGODBURI ||
  "mongodb+srv://saribghouri:445500@cluster0.x5dbsrc.mongodb.net/serverDatabase?retryWrites=true&w=majority";
const SECRET = process.env.SECRET || "topsecret";
const port = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
    credentials: true,
  })
);

const restaurentSchema = new mongoose.Schema({
  ResName: { type: String },
  Tagline: { type: String, required: true },
  email: { type: String, required: true },
  TimeZone: { type: String, required: true },
  RestaurentContact: { type: String, required: true },
  Restaurentaddress: { type: String, required: true },
  age: { type: Number, min: 17, max: 65, default: 18 },
  createdOn: { type: Date, default: Date.now },
});
const restaurentModel = mongoose.model("restaurent", restaurentSchema);
const userSchema = new mongoose.Schema({
  contact: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  name: { type: String },
  res_id: { type: String },
  userType: { type: String, required: true },
  Otp: { type: String },
  emailToken: { type: String },
  isVerified: { type: Boolean, required: true, default: false },
});
const userModel = mongoose.model("user", userSchema);

const CategorySchema = new mongoose.Schema({
  CategoryName: { type: String },

  // createdOn: { type: Date, default: Date.now },
  category,
});
const CategoryModel = mongoose.model("Category", CategorySchema);
app.post("/verifyOtp", async (req, res) => {
  console.log(req.body);
  userModel.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.status(500).send({
        message: "somthing went wrong",
      });
    }
    if (user.Otp === req.body.pin) {
      const update = { Otp: null, isVerified: true };
      userModel
        .findOneAndUpdate({ email: req.body.email }, update, { new: true })
        .exec()
        .then(() => {
          res.send({
            massage: "email is verify",
          });
        })
        .catch(() => {
          res.status(500).send({
            message: "somthing went wrong",
          });
        });
    } else {
      res.status(500).send({
        message: "please enter correct Otp",
      });
    }
  });
});

app.post("/login", (req, res) => {
  let body = req.body;

  if (!body.email || !body.password) {
    res.status(400).send(
      `required fields missing, request example: 
                {
                    "email": "abc@abc.com",
                    "password": "12345"
                }`
    );
    return;
  }

  userModel.findOne(
    { email: body.email },

    "email ResName Tagline TimeZone  Restaurentaddress password RestaurentContact isVerified",
    (err, user) => {
      if (!err) {
        console.log("ageqg:", user.isVerified);
        if (user) {
          // user found
          varifyHash(body.password, user.password).then((isMatched) => {
            console.log("isMatched: ", isMatched);
            if (isMatched && user.isVerified) {
              var token = jwt.sign(
                {
                  _id: user._id,
                  email: user.email,
                  address: user.address,
                  iat: Math.floor(Date.now() / 1000) - 30,
                  exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                },
                SECRET
              );

              console.log("token: ", token);

              res.cookie("Token", token, {
                maxAge: 86_400_000,
                httpOnly: true, // https only cookies are the most secure one
              });

              res.send({
                message: "login successful",
                profile: {
                  email: user.email,
                  ResName: user.ResName,
                  lastName: user.lastName,
                  address: user.address,
                  age: user.age,
                  _id: user._id,
                },
              });
              return;
            } else {
              console.log("user not found");
              res.status(401).send({ message: "Incorrect email or password" });
              return;
            }
          });
        } else {
          // user not already exist
          console.log("user not found");
          res.status(401).send({ message: "Incorrect email or password" });
          return;
        }
      } else {
        console.log("db error: ", err);
        res.status(500).send({ message: "login failed, please try later" });
        return;
      }
    }
  );
});

app.post("/logout", (req, res) => {
  res.cookie("Token", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.send({ message: "Logout successful" });
});

app.post("/SetUp", (req, res) => {
  const Otp = `${Math.floor(1000 + Math.random() * 9000)}`;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sarib.ghouri92@gmail.com",
      pass: "qkwllinomqjgmpcb",
    },
  });

  let body = req.body;

  if (
    !body.ResName ||
    !body.Tagline ||
    !body.TimeZone ||
    !body.RestaurentContact ||
    !body.email ||
    !body.password ||
    !body.Intrested ||
    !body.Restaurentaddress
  ) {
    res.status(400).send(
      `required fields missing, request example: 
                {
                    "ResName": "John",
                    "TimeZone": "TimeZone",
                    "email": "abc@abc.com",
                    "Tagline": "Tagline",
                    "RestaurentContact": "RestaurentContact",
                    "Restaurentaddress": "Restaurentaddress",               
                    "password": "12345"
                    "Intrested": "Intrested"
                }`
    );
    return;
  }

  // check if user already exist // query email user
  restaurentModel.findOne({ email: body.email }, (err, user) => {
    if (!err) {
      console.log("user: ", user);

      if (user) {
        // user already exist
        console.log("user already exist: ", user);
        res.status(400).send({
          message: "user already exist,, please try a different email",
        });

        return;
      } else {
        // user not already exist

        stringToHash(body.password).then((hashString) => {
          console.log({
            ResName: body.ResName,
            TimeZone: body.TimeZone,
            Tagline: body.Tagline,
            RestaurentContact: body.RestaurentContact,
            email: body.email.toLowerCase(),
            Restaurentaddress: body.Restaurentaddress.toLowerCase(),
          });

          restaurentModel.create(
            {
              ResName: body.ResName,
              TimeZone: body.TimeZone,
              Tagline: body.Tagline,
              RestaurentContact: body.RestaurentContact,
              email: body.email.toLowerCase(),
              Restaurentaddress: body.Restaurentaddress.toLowerCase(),
            },

            (err, result) => {
              // const restaurentId = result._id;
              console.log(result, "err");

              if (!err) {
                console.log("data saved: ", result);

                userModel.create({
                  email: body.email.toLowerCase(),
                  password: hashString,
                  res_id: result?._id,
                  userType: "MASTER",
                  verification: false,
                  Otp,
                  Intrested: body.Intrested.toLowerCase(),
                });
                if (!err) {
                  res.status(201).send({ message: "user is created" });
                }
                let mailOptions = {
                  from: ' "verify your email <sarib.ghouri92@gmail.com>" ',
                  to: body.email,
                  subject: "saribghouri - verify your email",
                  html: `<h2> ${Otp} thanks for  registering on our site</h2>
                <h4> please verify your email to continue... </h4>
                <a href="https://{req.header.host}/user/verify-email?token=">verify your Email</a>
                `,
                };

                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log("error", error);
                  } else {
                    console.log(
                      "verification email is sent to your gmail.account"
                    );
                  }
                });
              } else {
                console.log("db error: ", err);
                res.status(500).send({ message: "internal server error" });
              }
            }
          );
        });
      }
    } else {
      console.log("db error: ", err);
      res.status(500).send({ message: "db error in query" });
      return;
    }
  });
});

app.use(function (req, res, next) {
  console.log("req.cookies: ", req.cookies);

  if (!req.cookies.Token) {
    res.status(401).send({
      message: "include http-only credentials with every request",
    });
    return;
  }
  jwt.verify(req.cookies.Token, SECRET, function (err, decodedData) {
    if (!err) {
      console.log("decodedData: ", decodedData);

      const nowDate = new Date().getTime() / 1000;

      if (decodedData.exp < nowDate) {
        res.status(401).send("token expired");
      } else {
        console.log("token approved");

        req.body.token = decodedData;
        next();
      }
    } else {
      res.status(401).send("invalid token");
    }
  });
});

app.get("/profile", async (req, res) => {
  console.log("req.body.token._id", req.body.token._id);
  try {
    let user = await userModel.findOne({ _id: req.body.token._id }).exec();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error getting users" });
  }
});

// app.delete("/eventDelete/:id", async (req, res) => {
//   console.log("product received: ", req.body);

//   try {
//     let deleted = await eventModel.deleteOne({ _id: req.params.id });
//     console.log("event deleted: ", deleted);

//     res.send({
//       message: "event deleted",
//       data: deleted,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: "failed to delete event",
//     });
//   }
// });

// app.get("/event", async (req, res) => {
//   try {
//     let events = await eventModel.find({}).exec();
//     console.log("all events : ", events);

//     res.send({
//       message: "all events",
//       data: events,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: "failed to get product",
//     });
//   }
// });

// app.post("/event", async (req, res) => {
//   console.log(req.body, "req.body");

//   try {
//     const response = await eventModel.create({
//       title: req.body.title,
//       description: req.body.description,
//       address: req.body.address,
//       event: req.body.event,
//       startdate: req.body.startdate,
//       enddate: req.body.enddate,
//     });
//     console.error(response, "response");

//     await response.save();
//     try {
//       res.send({
//         message: "event added",
//         data: "event created successfully",
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).send({
//       message: "faild to added event",
//     });
//   }
// });

app.put("/profile/:id", async (req, res) => {
  console.log("profile to be edited: ");

  const update = {};
  if (req.body.name) update.name = req.body.name;
  if (req.body.contact) update.contact = req.body.contact;

  console.log("🚀 ~ file: server.mjs ~ line 112 ~ app.put ~ update", update);

  try {
    const updated = await userModel
      .findOneAndUpdate({ _id: req.params.id }, update, { new: true })
      .exec();
    console.log("updated profile: ", updated);

    res.send({
      message: "profile updated successfuly",
      data: updated,
    });
  } catch (error) {
    console.log("🚀 ~ file: server.mjs:487 ~ app.put ~ error", error);
    res.status(500).send({
      message: "faild to upadate profile",
    });
  }
});

app.get("/profile", async (req, res) => {
  try {
    let users = await restaurentModel
      .findOne({ _id: req.body.token._id })
      .exec();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: "error getting users" });
  }
});

app.get("/getreatuarentdetails/:id", async (req, res) => {
  console.log("🚀 ~ file: server.mjs:468 ~ app.get ~ users", req.params.id);
  try {
    let users = await restaurentModel.findOne({ _id: req.params.id }).exec();
    res.send(users);
  } catch (error) {
    console.log("🚀 ~ file: server.mjs:471 ~ app.get ~ error", error);
    res.status(500).send({ message: "error getting users" });
  }
});

app.put("/settings/:id", async (req, res) => {
  console.log("restaurent to be edited: ");

  const update = {};
  if (req.body.ResName) update.ResName = req.body.ResName;
  if (req.body.Tagline) update.Tagline = req.body.Tagline;
  if (req.body.TimeZone) update.TimeZone = req.body.TimeZone;
  if (req.body.RestaurentContact)
    update.RestaurentContact = req.body.RestaurentContact;
  if (req.body.Restaurentaddress)
    update.Restaurentaddress = req.body.Restaurentaddress;

  console.log("🚀 ~ file: server.mjs ~ line 112 ~ app.put ~ update", update);

  try {
    const updated = await restaurentModel
      .findOneAndUpdate({ _id: req.params.id }, update, { new: true })
      .exec();
    console.log("updated restaurent: ", updated);

    res.send({
      message: "restaurent updated successfuly",
      data: updated,
    });
  } catch (error) {
    res.status(500).send({
      message: "faild to upadate restaurent",
    });
  }
});

app.use((req, res) => {
  res.status(404).send("404 not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(dbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on("connected", function (err) {
  //connected
  console.log(err, "Mongoose is connected");
});

mongoose.connection.on("disconnected", function (err) {
  //disconnected
  console.log(err, "Mongoose is disconnected");
  // process.exit(1);
});

mongoose.connection.on("error", function (err) {
  //any error
  console.log("Mongoose connection error: ", err);
  // process.exit(1);
});

process.on("SIGINT", function () {
  /////this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(function () {
    console.log("Mongoose default connection closed");
    process.exit(0);
  });
});
