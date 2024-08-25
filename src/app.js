// importing config to have the access of env variable all over the app
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import notFoundHandler from "./common/middlewares/notFound.middleware.js";
import errorHandler from "./common/middlewares/error.middleware.js";
import corsOptions from "./config/cors.config.js";

import { authRouter } from "./app/auth/index.js";
import { projectRouter } from "./app/project/index.js";

// create app
const app = express();

// parse json of incoming request body
app.use(express.json({ limit: "17kb" }));

// configure urlencoded data
app.use(express.urlencoded({ limit: "17kb", extended: true }));

// configure cookie-parser
app.use(cookieParser());

// todo configure cors
app.use(cors(corsOptions));

// auth routes
app.use("/api/v1/auth", authRouter);

// projects routes
app.use("/api/v1/projects", projectRouter);

// Task routes
// app.use('/api/v1/task'); // todo

// handle if not route found
app.use("*", notFoundHandler);

// handle if error occurred at global level
app.use(errorHandler);

export default app;
