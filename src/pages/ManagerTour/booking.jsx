import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import Navbar from "../../components/Navbar/Navbar";
import ManagerTour from "../../components/Navbar/ManagerTour";
import Admin from "../../components/Navbar/Admin";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Swal from "sweetalert2";
import moment from "moment";
import "moment/locale/vi"; // Import Vietnamese locale

export default function Booking() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [tourDetails, setTourDetails] = useState({}); // Thêm dòng này để khởi tạo state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const filterData = (v) => {
    if (v) {
      setBookings([v]);
    } else {
      fetchProfile();
    }
  };
  const sortedBookings = bookings?.slice().sort((a, b) => {
    console.log(bookings);
    const dateA = new Date(a.bookAt);
    const dateB = new Date(b.bookAt);
    return dateB - dateA;
  });
  const formatDateTime = (dateTime) => {
    return moment(dateTime).format("HH:mm DD/MM/YYYY");
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${BASE_URL}/booking/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Response data:", data);
      setBookings(data.data || []); // Đảm bảo rằng bookings luôn là mảng
    } catch (error) {
      console.error("Failed to fetch profile data", error);
      setBookings([]); // Đảm bảo rằng bookings luôn là mảng ngay cả khi có lỗi
    }
  };
  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  useEffect(() => {
    const fetchTourDetails = async () => {
      const details = {};
      for (const booking of bookings) {
        try {
          const res = await fetch(`${BASE_URL}/tours/${booking.tourId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();
          details[booking.tourId] = data.data || {};
          console.log("da goi", details[booking.tourId]);
        } catch (error) {
          console.error(
            `Failed to fetch details for tour ID ${booking.tourId}`,
            error
          );
        }
      }
      setTourDetails(details);
    };

    if (bookings) {
      fetchTourDetails();
    }
  }, [bookings]);
  const formatNumber = (num) => {
    console.log("tien", num);
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const isAdmin = () => {
    console.log("bbb");
    return user && user.role.toLowerCase() === "admin";
  };
  const isManager = () => {
    console.log("aa");
    console.log(user.role);

    return user && user.role.toLowerCase() === "tourmanager";
  };
  return (
    <>
      <Navbar />
      <Box sx={{ height: { xs: 10, sm: 20, md: 40 } }}  />
      <Box sx={{ display: "flex" }}>
        {isAdmin() && (
          <>
            <Admin />
          </>
        )}
        {isManager() && (
          <>
            <ManagerTour />
          </>
        )}
        {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container>
            <Row className="profile">
              <Col lg="12">
                <div className="booking__history">
                  <h3>Quản lý booking</h3>
                  {bookings.length === 0 ? (
                    <p>Không có dữ liệu</p>
                  ) : (
                    <ListGroup>
                      {bookings.map((booking) => (
                        <ListGroupItem key={booking._id}>
                           <p><strong><Link to={`/history/${booking.tourId}`}>Tên tour</Link></strong> {tourDetails[booking.tourId]?.tieude || 'Loading...'}</p>
                           <p><strong>Tên khách hàng:</strong> {booking.fullName}</p>

                          <p><strong>Ngày khởi hành:</strong> {tourDetails[booking.tourId]?.departureDate || 'Loading...'} ₫</p>
                         <p><strong>Ngày đăt tour:</strong> {booking.bookAt}</p>
                         <p><strong>Số người tham gia:</strong> {booking.guestSize}</p>

                        <p><strong>Tổng tiền:</strong> {booking.guestSize*tourDetails[booking.tourId]?.price}</p>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </Box> */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* <ShowTour/> */}
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ padding: "20px" }}
            >
              Quản Lý Booking
            </Typography>
            <Divider />
            <Box height={10} />
            <Stack direction="row" spacing={2} className="my-2 mb-2">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={bookings}
                sx={{ width: 300 }}
                onChange={(e, v) => filterData(v)}
                getOptionLabel={(bookings) => bookings.phone || ""}
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Tìm kiếm số điện thoại" />
                )}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>
            </Stack>
            <Box height={10} />
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow key="rowww">
                    <TableCell
                      align="left"
                      style={{ minWidth: "100px" }}
                      key="title"
                    >
                      Tên khách hàng
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ minWidth: "100px" }}
                      key="place-of-departure"
                    >
                      Số điện thoại
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ minWidth: "100px" }}
                      key="departure-date"
                    >
                      Ngày đặt tour
                    </TableCell>

                    <TableCell
                      align="left"
                      style={{ minWidth: "100px" }}
                      key="remaining-seats"
                    >
                      Tên chuyến đi
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ minWidth: "100px" }}
                      key="numberofbooking"
                    >
                      Ngày khởi hành
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ minWidth: "100px" }}
                      key="actions"
                    >
                      Số người tham gia
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ minWidth: "100px" }}
                      key="AddDepartures"
                    >
                      Giá vé
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ minWidth: "100px" }}
                      key="Price"
                    >
                      Tổng tiền
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedBookings
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((booking) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1}>
                          <TableCell key={booking.id} align="left">
                            {booking.fullName}
                          </TableCell>
                          <TableCell key={booking.id} align="left">
                            {booking.phone}
                          </TableCell>
                          <TableCell key={booking.id} align="left">
                            {formatDateTime(booking.bookAt)}
                          </TableCell>

                          <TableCell key={booking.id} align="left">
                            {tourDetails[booking.tourId]?.tieude}
                          </TableCell>
                          <TableCell key={booking.id} align="left">
                            {formatDateTime(
                              tourDetails[booking.tourId]?.departureDate
                            )}
                          </TableCell>
                          <TableCell key={booking.id} align="left">
                            {booking.guestSize}
                          </TableCell>
                          <TableCell key={booking.id} align="left">
                          {formatNumber(
                              booking.guestSize *
                                tourDetails[booking.tourId]?.price/booking.guestSize
                            )}                          </TableCell>
                          <TableCell key={booking.id} align="left">
                            {formatNumber(
                              booking.guestSize *
                                tourDetails[booking.tourId]?.price
                            )}
                          </TableCell>

                          {/* <TableCell align="left">
                            <Stack spacing={2} direction="row">
                              <DeleteIcon
                                style={{
                                  fontSize: "20px",
                                  color: "darkred",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  deleteUser(tour._id);
                                }}
                              />
                              {tour.numberOfBookings === 0 ? (
                                <EditIcon
                                  style={{
                                    fontSize: "20px",
                                    color: "blue",
                                    cursor: "pointer",
                                  }}
                                  className="cursor-pointer"
                                  onClick={() => handleEditOpen(tour._id)}
                                />
                              ) : (
                                ""
                              )}
                            </Stack>
                          </TableCell>
                          <TableCell align="center">
                            <AddIcon
                              style={{
                                fontSize: "20px",
                                color: "black",
                                cursor: "pointer",
                              }}
                              onClick={() => handleAddDepartureOpen(tour._id)}
                            />
                          </TableCell> */}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={bookings.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Box>
    </>
  );
}
