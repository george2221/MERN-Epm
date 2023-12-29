import mongoose from "mongoose";

const attendanceReqSchema = new mongoose.Schema({
  attendanceRequestDate: {
    type: Array,
    required: true,
  },
  attendanceType: {
    type: String,
    required: true,
  },
  attendanceReason: {
    type: String,
  },
  attendanceStatus: {
    type: String,
    required: true,
    default: "Pending",
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

const AttendanceReq = mongoose.model("AttendanceReq", attendanceReqSchema);
export default AttendanceReq;