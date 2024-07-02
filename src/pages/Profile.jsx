import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi"; // Import Vietnamese locale
import "../styles/profile.css";
import useFetch from "../hooks/useFetch";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import Stack from "@mui/material/Stack";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [tourDetails, setTourDetails] = useState({}); // Thêm dòng này để khởi tạo state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASE_URL}/booking/user/${user._id}`, {
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
        const sortedBookings = (data.data || []).sort((a, b) => new Date(b.bookAt) - new Date(a.bookAt)); // Sắp xếp bookings
        setBookings(sortedBookings); // Đảm bảo rằng bookings luôn là mảng
      } catch (error) {
        console.error("Failed to fetch profile data", error);
        setBookings([]); // Đảm bảo rằng bookings luôn là mảng ngay cả khi có lỗi
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
        } catch (error) {
          console.error(
            `Failed to fetch details for tour ID ${booking.tourId}`,
            error
          );
        }
      }
      setTourDetails(details);
    };

    if (bookings.length > 0) {
      fetchTourDetails();
    }
  }, [bookings]);
  const formatDateTime = (dateTime) => {
    return moment(dateTime).format("HH:mm DD/MM/YYYY");
  };
  const formatNumber = (num) => {
    if (num === undefined || num === null) {
      return "0";
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <>
      <Container>
        <Row className="profile">
          <Col lg="3">
            <div className="profile__info">
              <h3>Thông tin cá nhân</h3>
              <img
                src={"/tour-images/user.png"}
                alt="QR Code"
                className="qr-code"
              />

              <p>
                <strong>Họ và tên:</strong> {user.username}
              </p>
              <p>
                <strong>Điện thoại:</strong> {user.mobile}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <div className="points"></div>
            </div>
          </Col>
          <Col lg="9">
            {/* <div className="booking__history">
              <h3>Lịch sử giao dịch</h3>
              {bookings.length === 0 ? (
                <p>Không có dữ liệu</p>
              ) : (
                <ListGroup>
                  {bookings.map((booking) => (
                    <ListGroupItem key={booking._id}>
                      <p>
                        <strong>
                          <Link to={`/history/${booking.tourId}`}>
                            Tên tour
                          </Link>
                        </strong>{" "}
                        {tourDetails[booking.tourId]?.tieude || "Loading..."}
                      </p>
                      <p>
                        <strong>Ngày khởi hành:</strong>{" "}
                        {formatDateTime(
                          tourDetails[booking.tourId]?.departureDate
                        ) || "Loading..."}
                      </p>
                      <p>
                        <strong>Ngày đăt tour:</strong>{" "}
                        {formatDateTime(booking.bookAt)}
                      </p>
                      <p>
                        <strong>Số người tham gia:</strong> {booking.guestSize}
                      </p>

                      <p>
                        <strong>Tổng tiền:</strong>{" "}
                        {formatNumber(booking.guestSize * tourDetails[booking.tourId]?.price)} ₫
                      </p>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </div> */}
            
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow key="rowww">
                    <TableCell align="left" style={{ minWidth: "100px" }} key="title">
                      Tên tour
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }} key="place-of-departure">
                      Ngày khởi hành
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }} key="departure-date">
                      Ngày đặt tour
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }} key="remaining-seats">
                      Số người tham gia
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }} key="actions">
                      Giá vé
                    </TableCell>
                    <TableCell align="left" style={{ minWidth: "100px" }} key="tongtien">
                      Tổng tiền
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((booking) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1}>
                          <TableCell key={booking.id} align="left">
                          {tourDetails[booking.tourId]?.tieude || "Loading..."}
                          </TableCell>
                          <TableCell key={booking.id} align="left">
                          {formatDateTime(
                          tourDetails[booking.tourId]?.departureDate
                        ) || "Loading..."}
                          </TableCell>
                          <TableCell key={booking.id} align="left">
                          {formatDateTime(booking.bookAt)}
                          </TableCell>
                          <TableCell key={booking.id} align="left">
                          {booking.guestSize}
                          </TableCell>
                          <TableCell key={booking.id} align="left">
                          {formatNumber(tourDetails[booking.tourId]?.price)} ₫
                          </TableCell>
                          <TableCell key={booking.id} align="left">
                          {formatNumber(booking.guestSize * tourDetails[booking.tourId]?.price)} ₫
                          </TableCell>
                          {/* <TableCell align="left">
                            <Stack spacing={2} direction="row">
                              <EditIcon
                                style={{
                                  fontSize: "20px",
                                  color: "blue",
                                  cursor: "pointer",
                                }}
                                className="cursor-pointer"
                                onClick={() => handleEditOpen(user._id)}
                              />
                              <DeleteIcon
                                style={{
                                  fontSize: "20px",
                                  color: "darkred",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  deleteUser(user._id);
                                }}
                              />
                            </Stack>
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
