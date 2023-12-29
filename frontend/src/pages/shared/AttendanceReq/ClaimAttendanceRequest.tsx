import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { Box, Button, Grid, InputLabel, MenuItem, Select, TextField, Typography, Card, useMediaQuery, useTheme } from "@mui/material";
import { DateRange } from "@mui/x-date-pickers-pro/DateRangePicker";

import { Dayjs } from "dayjs";
import { toast } from "react-toastify";
import DateRangePick from "../../../components/DateRangePick";
import animatedPlane from "../../../assets/images/paper-plane.gif";

const ClaimAttendanceRequest = () => {
  const params = useParams();
  const employeeId = params.id;
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [attendanceDurationValue, setAttendanceDurationValue] = React.useState <
    DateRange < Dayjs >
  > ([null, null]);

  const [attendanceRequest, setAttendanceRequest] = React.useState < any > ({
    attendanceType: "",
    attendanceReason: "",
    attendanceDuration: [] || attendanceDurationValue,
  });

  const handleAttendanceRequest = (e: any) => {
    attendanceRequest.attendanceDuration = attendanceDurationValue;
    setAttendanceRequest({ ...attendanceRequest, [e.target.name]: e.target.value });
  };

  const postAttendanceRequest = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/v1/attendanceRequest",
        {
            attendanceRequestDate: attendanceRequest.attendanceDuration,
            attendanceType: attendanceRequest.attendanceType,
            attendanceReason: attendanceRequest.attendanceReason,
          employee: employeeId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Attendance Request Submitted");
      navigate("/attendanceReqStatus");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {
        !isMobile && !isTablet && (
          <Grid item sm={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", p: 2 }}>
            <Box sx={{ display: "flex" }}>
              <img src={animatedPlane} alt="animated_plane" style={{ width: "15%" }} />
              <Card sx={{ p: 2, border: 1, borderColor: "grey", boxShadow: "initial", zIndex: 1 }}>
              <Typography variant="h3" sx={{ textAlign: "center", fontFamily: "fantasy" }} >
                  Mark your Attendance regularly
                </Typography>
                <Box sx={{ p: 2, fontFamily: "fantasy", fontSize: "2rem" }}>
                  <p><b>Just keep some points in mind before marking attendance</b></p>
                  <br />
                  <ul>
                    <li>Please inform your Manager after applying attendance</li>
                    <li>Double check the information before clicking on submit</li>
                    <li>We will not responsible if get loss of pay</li>
                   
                  </ul>

                  <Typography variant="h3" sx={{ textAlign: "center", fontFamily: "fantasy", p: 2 }} >
                     Be smart work Hard 
                  </Typography>
                </Box>

              </Card>
            </Box>

          </Grid>
        )
      }
      <Grid item xs={12} sm={12} md={6} sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray",

      }}>
        <Box
          sx={{
            backgroundColor: "#A5C9CA",
            p: 2,
            m: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: 2,
            boxShadow: 3,
            transform: "translate(-50, -50)",
          }}
          className="project-form"
        >
          <Typography variant="h4" sx={{ textAlign: "center", fontFamily: "serif" }} >
            Claim Your Attendance
          </Typography>
          <br />
          <br />
          <form onSubmit={(e) => postAttendanceRequest(e)}>
            <DateRangePick
              id="duration"
              name="duration"
              value={attendanceDurationValue}
              ProjectDurationValue={attendanceDurationValue}
              setProjectDurationValue={setAttendanceDurationValue}
            />
            <br />
            <InputLabel id="attendanceType">Duration</InputLabel>
            <Select
              labelId="attendanceType"
              id="attendanceType"
              name="attendanceType"
              label="attendanceType"
              value={attendanceRequest.attendanceType}
              onChange={handleAttendanceRequest}
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              <MenuItem value="ShortTerm">ShortTerm</MenuItem>
              <MenuItem value="LongTerm">LongTerm</MenuItem>
              
            </Select>
            <TextField
              fullWidth
              id="attendanceReason"
              name="attendanceReason"
              label="Attendance Reason"
              value={attendanceRequest.attendanceReason}
              onChange={handleAttendanceRequest}
              sx={{ marginBottom: 2 }}
            />
            <br />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Grid>

    </Grid>
  );
};

export default ClaimAttendanceRequest;
