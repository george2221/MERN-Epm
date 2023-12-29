import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const AllAttendanceRequest = () => {
  const [allAttendanceRequest, setAllAttendanceRequest] = useState < any > ([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);


  const user: any = localStorage.getItem("user");
  const userData = JSON.parse(user)._id;

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

  const postRequestResolve = async (value: string, id: string) => {
    try {
      const resolvedData = await axios.put(
        `http://localhost:5000/api/v1/attendanceRequest/resolve/${id}`,
        {
          attendanceStatus: value,
          resolvedBy: userData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(`Attendance Request ${value}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allAttendanceRequest.slice(indexOfFirstPost, indexOfLastPost);
  const totalPosts = allAttendanceRequest.length;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers: any = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box sx={{ m: 2 }}>
      <Box
        sx={{
          textAlign: "center",
          textTransform: "uppercase",
          fontWeight: "bold",
          m: 2,
        }}
      >
        <Typography variant="h4">Attendance Request Status</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: "gray" }}>
            <TableRow>
              <TableCell align="center" sx={{ color: "white" }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Designation
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Email
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
              Attendance Duration
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
              Attendance Type
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
              Attendance Reason
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
              Attendance Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts?.map((row: any) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <>
                  <TableCell align="center">{row.employee.name}</TableCell>
                  <TableCell align="center">
                    {row.employee.designation}
                  </TableCell>
                  <TableCell align="center">{row.employee.email}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.attendanceRequestDate[0].slice(0, 10)} TO{" "}
                    {row.attendanceRequestDate[1].slice(0, 10)}
                  </TableCell>

                  <TableCell align="center">{row.attendanceType}</TableCell>

                  <TableCell align="center">{row.attendanceReason}</TableCell>
                  {row.attendanceStatus === "Pending" &&
                    row.employee._id !== userData ? (
                    <>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="success"
                          sx={{ m: 1 }}
                          onClick={() =>
                            postRequestResolve("Approved", row._id)
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="warning"
                          onClick={() =>
                            postRequestResolve("Rejected", row._id)
                          }
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell
                        align="center"
                        style={{
                          backgroundColor:
                            row.attendanceStatus === "Rejected" ? "red" : "green",
                          color: "white",
                          borderRadius: "5px",
                        }}
                      >
                        {row.attendanceStatus}
                      </TableCell>
                    </>
                  )}
                </>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={pageNumbers.length} onChange={(e, value) => paginate(value)} />
    </Box>
  );
};

export default AllAttendanceRequest;
