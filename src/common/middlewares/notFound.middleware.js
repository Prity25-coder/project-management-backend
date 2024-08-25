import STATUS_CODE from "../../constants/responseCode.js";

function notFoundHandler(req, res) {
  // todo
  return res.status(STATUS_CODE.NOT_ALLOWED).json({
    error: `API not found ${req.originalUrl}`,
  });
}

export default notFoundHandler;
