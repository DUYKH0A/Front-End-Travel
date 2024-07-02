import React, { useState, useContext } from "react";
import "./booking.css";
import {
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"
import { BASE_URL } from "../../utils/config";


const Booking = ({ tourId ,tour, avgRating }) => {
  const { price, reviews, tieude ,numberOfBookings, maxGroupSize} = tour;
 
  const navigate = useNavigate()

  const {user} = useContext(AuthContext)
  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourId: tourId,
    tourName: tieude,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: new Date().toISOString(),
  });

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmout =
    Number(price) * Number(booking.guestSize);

  //send data to server
  const handleClick = async e => {
    e.preventDefault();
// Check if the booking exceeds the available slots
if (Number(booking.guestSize) + numberOfBookings > maxGroupSize) {
  return alert("Số lượng người tham gia vượt quá số chỗ trống còn lại");
}
    console.log(booking);
    try {
      if(!user || user=== undefined || user===null){
        return alert('Vui lòng đăng nhập')
      }
      const res = await fetch(`${BASE_URL}/booking/create-payment-link`,{
        method:'post',
        headers:{
          'content-type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(booking),
      })
      const result = await res.json()
      
      if(!res.ok){
        return alert(result.message)
      }
      console.log(res.paymentLink)
      if (res.status === 200) {
        console.log("success")
        window.location.href = result.paymentLink.checkoutUrl;
      }

    } catch (error) {
      alert(error.message)
    }
};
const formatNumber = (num) => {
  if (num === undefined || num === null) {
    return "0";
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
        {formatNumber(price)} ₫/Người<span></span>
        </h3>
        {/* <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span> */}
      </div>

      {/* bookingform */}
      <div className="booking__form">
        <h5>Thông tin</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Họ và tên"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="tel"
              placeholder="Số điện thoại"
              id="phone"
              required
              maxLength={10}

              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
           {/* <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />  */}
            <input
              type="number"
              placeholder="Số người"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>
      {/* booking end */}

      {/* bookingbottom */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
            {formatNumber(price)} ₫ <i className="ri-close-line"></i> 1 người
            </h5>
            <span>{formatNumber(price)} ₫</span>
          </ListGroupItem>
          {/* <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem> */}
          <ListGroupItem className="border-0 px-0">
            <h5>Tổng</h5>
            <span>{formatNumber(totalAmout)}  ₫</span>
          </ListGroupItem>
        </ListGroup>
        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Đặt ngay
        </Button>
      </div>
    </div>
  );
};

export default Booking;
