import React, { useEffect } from "react";
import axios from "axios";

import AttendanceReqDataTable from "../../../components/AttendanceReqDataTable";

const AttendanceReqStatus = () => {
  const [allAttendanceRequest, setAllAttendanceRequest] = React.useState < any > ([]);

  useEffect(() => {
    fetchAllAttendanceRequest();
  }, []);

  const fetchAllAttendanceRequest = async () => {
    try {
      const attendanceData = await axios.get(
        "http://localhost:5000/api/v1/attendanceRequest",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAllAttendanceRequest(attendanceData?.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <AttendanceReqDataTable allAttendanceRequest={allAttendanceRequest} />
    </div>
  );
};

export default AttendanceReqStatus;
