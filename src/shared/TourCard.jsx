import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import caculateAvgRating from "../utils/avgRating";
import "./tour-card.css";

const TourCard = ({ tour }) => {
  const { _id, tieude, transport, hotel, photo, price,Placeofdeparture, featured, reviews,maxGroupSize, numberOfBookings, departureDate } = tour;

  const {totalRating, avgRating} = caculateAvgRating(reviews);
  const formattedDepartureDate = new Date(departureDate).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  let citiesDisplay = "";
  if (Array.isArray(Placeofdeparture)) {
    citiesDisplay = Placeofdeparture.join(" - "); // Chuyển mảng thành chuỗi phân cách bằng dấu phẩy
  } else {
    citiesDisplay = Placeofdeparture; // Giữ nguyên giá trị nếu không phải mảng
  } 

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={photo[0]} alt="tour_img" />
          {<span>{transport} và KS {hotel} <i className="ri-star-fill"></i></span>}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            {/* <span className="tour__location d-flex align-items-center gap-1" style={{fontWeight: 'bold',color: 'black', fontSize: '18px' }}>
              <i className=""></i> {tieude} 
            </span> */}
            <h5 className="tour__title d-flex align-items-center gap-1" style={{fontWeight: 'bold',color: 'black', fontSize: '18px' }}>
            <Link to={`/tours/${_id}`}>{tieude}  </Link>
            </h5>
            
          </div>

          <h5 className="tour__title">
          <i className="ri-map-pin-line"></i>
            <Link to={`/tours/${_id}`}>Nơi khởi hành: {Placeofdeparture} </Link>
          </h5>
          <h5 className="tour__title" style={{ fontSize: '18px' }}>
          <i className=""></i>
            <Link to={`/tours/${_id}`}>Thời gian khỏi hành: {formattedDepartureDate}</Link>
          </h5>
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              Giá: {price}₫ <span></span>
            </h5>
            <button className="btn booking__btn">
              <Link to={`/tours/${_id}`}>Chi tiết</Link>
            </button>
          </div>
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
             <span style={{color: 'black', fontSize: '18px' }}>Số chổ còn nhận: {maxGroupSize - numberOfBookings}</span>
            </h5>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
