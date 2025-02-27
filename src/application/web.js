require("dotenv").config();
require("../config/dbConnect.js");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const privateRouter = require("../routes/api.js");
const publicRouter = require("../routes/publicApi.js");
const errorMiddleware = require("../middlewares/errorMiddleware.js");

const web = express();

web.use(helmet());
web.use(morgan("dev"));
web.use(express.json());
web.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

web.use(publicRouter);
web.use(privateRouter);
web.use(errorMiddleware);

module.exports = web;
