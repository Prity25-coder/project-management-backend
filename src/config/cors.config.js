import { CustomError } from "../common/middlewares/error.middleware.js";
import RESPONSE_CODE from "../constants/responseCode.js";

// get all whitelisted domains
const whitelist = [
  "http://localhost:4200",
  "http://localhost:5174",
  "https://project-management-frontend-lake.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("origin", origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(
        new CustomError("Not allowed by CORS", RESPONSE_CODE.NOT_ALLOWED)
      );
    }
  },
};

export default corsOptions;
