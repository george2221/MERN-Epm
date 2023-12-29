import AttendanceReq from "../models/attendanceReqModel";
import { Request, Response } from "express";
import mongoose from "mongoose";

const addAttendanceRequest = async (req: Request, res: Response): Promise<void> => {
  const { attendanceRequestDate, attendanceType, attendanceReason, employee } = req.body;
  const newAttendanceReq = await AttendanceReq.create({
    attendanceRequestDate,
    attendanceType,
    attendanceReason,
    employee: employee,
  });

  if (newAttendanceReq) {
    res.status(201).json(newAttendanceReq);
  } else {
    res.status(400);
    throw new Error("Invalid attendance request data");
  }
};

const resolveAttendanceRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { attendanceStatus, resolvedBy } = req.body;
  const attendanceReq = await AttendanceReq.findById(req.params.id);
  if (attendanceReq) {
    attendanceReq.attendanceStatus = attendanceStatus;
    attendanceReq.resolvedBy = resolvedBy;
    const updatedAttendanceReq = await attendanceReq.save();
    res.json(updatedAttendanceReq);
  } else {
    res.status(404);
    throw new Error("Attendance request not found");
  }
};

const getAttendanceRequests = async (req: Request, res: Response): Promise<void> => {
  const attendanceRequests = await AttendanceReq.find({}).populate("employee");
  res.json(attendanceRequests);
};

export { addAttendanceRequest, resolveAttendanceRequest, getAttendanceRequests };