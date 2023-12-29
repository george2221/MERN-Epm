import express from "express";
import {
  addAttendanceRequest,
  getAttendanceRequests,
  resolveAttendanceRequest,
} from "../controllers/AttendanceRequest.controllers";
import auth from "../middlewires/auth";
import admin from "../middlewires/admin";

const router = express.Router();

router.route("/").post(auth, addAttendanceRequest);
router.route("/").get(auth, getAttendanceRequests);
router.route("/resolve/:id").put(auth, admin, resolveAttendanceRequest);

export default router;