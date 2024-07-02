import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import "../styles/profile.css";
import Admin from "../components/Navbar/Admin";
import ManagerTour from "../components/Navbar/ManagerTour";
import Navbar from "../components/Navbar/Navbar";

const ProfileManager = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

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
        setBookings(data.data || []); // Đảm bảo rằng bookings luôn là mảng
      } catch (error) {
        console.error("Failed to fetch profile data", error);
        setBookings([]); // Đảm bảo rằng bookings luôn là mảng ngay cả khi có lỗi
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);
  const isAdmin = () => {
    return user && user.role.toLowerCase() === "admin";
  };
  const isManager = () => {
    return user && user.role.toLowerCase() === "tourmanager";
  };

  return (
    <>
          <Navbar />

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
      <Container>
        <Row className="profile">
          <Col lg="6">
            <div className="profile__info">
              <h3>Thông tin cá nhân</h3>
              <p>
                <strong>Họ và tên:</strong> {user.username}
              </p>
              <p>
                <strong>Điện thoại:</strong> {user.mobile}
              </p>
              <p>
                <strong>role:</strong> {user.role}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <img src={user.photo} alt="QR Code" className="qr-code" />
              <div className="points"></div>
            </div>
          </Col>
          {/* <Col lg="6">
            <div className="booking__history">
              <h3>Lịch sử giao dịch</h3>
              {bookings.length === 0 ? (
                <p>Không có dữ liệu</p>
              ) : (
                <ListGroup>
                  {bookings.map((booking) => (
                    <ListGroupItem key={booking._id}>
                      <p><strong>Tên tour:</strong> {booking.tourName}</p>
                      <p><strong>Tổng tiền:</strong> {booking.totalPrice} ₫</p>
                      <p><strong>Điểm thưởng:</strong> {booking.pointsEarned}</p>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </div>
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default ProfileManager;
