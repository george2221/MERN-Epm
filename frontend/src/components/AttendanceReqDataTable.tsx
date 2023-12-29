import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination
} from "@mui/material";

const AttendanceReqDataTable = ({ allAttendanceRequest }: any) => {
  const [attendanceData, setAttendanceData] = useState < any > ([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = React.useState(5);


  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      const data = allAttendanceRequest.filter(
        (data: any) => data.employee._id === userData._id
      );
      setAttendanceData(data);
    }
  }, [allAttendanceRequest]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = attendanceData.slice(indexOfFirstPost, indexOfLastPost);
  const totalPosts = attendanceData.length;
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
              <TableCell sx={{ color: "white" }}>Attendance Duration</TableCell>
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
            {currentPosts.length ? currentPosts.map((row: any) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <>
                  <TableCell component="th" scope="row">
                    {row.attendanceRequestDate[0].slice(0, 10)} TO{" "}
                    {row.attendanceRequestDate[1].slice(0, 10)}
                  </TableCell>

                  <TableCell align="center">{row.attendanceType}</TableCell>

                  <TableCell align="center">{row.attendanceReason}</TableCell>
                  <TableCell
                    align="center"
                    style={{
                      backgroundColor:
                        row.attendanceStatus === "Rejected" ? "red" : row.attendanceStatus === "Pending" ? "wheat" : "green",
                      color:
                        row.employeeStatus === "Rejected" ? "white" : "inherit",
                      borderRadius: "5px",
                    }}
                  >
                    {row.attendanceStatus}
                  </TableCell>
                </>
              </TableRow>
            )) : <Box sx={{ width: "100vh", textAlign: "center" }}>No Data Available</Box>}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={pageNumbers.length} onChange={(e, page) => paginate(page)} />
    </Box>
  );
};

export default AttendanceReqDataTable;
