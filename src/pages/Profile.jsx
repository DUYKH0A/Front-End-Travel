import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import { Link } from "react-router-dom";

import "../styles/profile.css";
import useFetch from "../hooks/useFetch";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [tourDetails, setTourDetails] = useState({}); // Thêm dòng này để khởi tạo state

 
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

          if (!res.ok) { throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        details[booking.tourId] = data.data || {};
      } catch (error) {
        console.error(`Failed to fetch details for tour ID ${booking.tourId}`, error);
      }
    }
    setTourDetails(details);
  };

  if (bookings.length > 0) {
    fetchTourDetails();
  }
}, [bookings]);


  return (
    <>
     
      <Container>
        <Row className="profile">
          <Col lg="6">
            <div className="profile__info">
            <h3>Thông tin cá nhân</h3>
            <img src={"/tour-images/user.png"} alt="QR Code" className="qr-code" />

              <p><strong>Họ và tên:</strong> {user.username}</p>
              <p><strong>Điện thoại:</strong> {user.mobile}</p>
              
              <p><strong>Email:</strong> {user.email}</p>
              <div className="points">
  
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="booking__history">
              <h3>Lịch sử giao dịch</h3>
              {bookings.length === 0 ? (
                <p>Không có dữ liệu</p>
              ) : (
                <ListGroup>
                  {bookings.map((booking) => (
                    <ListGroupItem key={booking._id}>
                      <p><strong><Link to={`/history/${booking.tourId}`}>Tên tour</Link></strong> {tourDetails[booking.tourId]?.tieude || 'Loading...'}</p>
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

    </>
  );
};

export default Profile;
