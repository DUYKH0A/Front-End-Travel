import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/tour-detail.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import caculateAvgRating from "./../utils/avgRating";
import avata from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { AuthContext } from "../context/AuthContext";
import moment from 'moment';
import 'moment/locale/vi'; // Import Vietnamese locale

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  //data from database
  const { user } = useContext(AuthContext);

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
  //
  const {
    photo,
    tieude,
    hotel,
    transport,
    price,
    Placeofdeparture,
    reviews,
    desc,
    departureDate,
    maxGroupSize,
    numberOfBookings,
    itinerary,
  } = tour;
  const itineraryDays = tour?.itinerary?.map(day => day.day) || [];
  const { totalRating, avgRating } = caculateAvgRating(reviews);
  const formatDateTime = (dateTime) => {
    return moment(dateTime).format('HH:mm DD/MM/YYYY');
  }
  //format date
  const option = { day: "numeric", month: "long", year: "numeric" };

  //submit request to server
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert("pleasa sign in");
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });
      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      alert(result.message);
    } catch (error) {
      alert(error.message);
    }
    //later call
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <section>
        <Container>
          {loading && (
            <h4 className="text-center pt-5">Loading...............</h4>
          )}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <h2>{tieude}</h2>
                  {/* <img src={photo} alt="tour_content" /> */}
                  <div className="tour__info">
                     {/* Carousel for photos */}
                    <Carousel showThumbs={true} autoPlay={true} infiniteLoop={true}>
                      {photo && photo.map((url, index) => (
                        <div key={index}>
                          <img src={url} alt={`tour_image_${index}`} className="tour__image" />
                        </div>
                      ))}
                    </Carousel>
                    
                    <div className="d-flex align-items-center gap-5">
                      {/* <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-fill"
                          style={{ color: "var(--secondary-color" }}
                        ></i>{" "}
                        {caculateAvgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not Rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span> */}

                      <span>
                        <i className="ri-map-pin-2-fill" > </i>Nơi khởi hành: {Placeofdeparture}
                      </span>
                      <span className="icon-text" >
                        <i className="ri-time-line"></i>
                        <span  ></span> Khởi hành: {formatDateTime(departureDate)}
                      </span>
                      <span className="icon-text" >
                        <i className="ri-time-line"></i>
                        <span  ></span> {itineraryDays.length} ngày {itineraryDays.length - 1} đêm
                      </span>
                      
                    </div>
                    <div className="tour__extra-details">
                      <span>
                        <i className="ri-car-fill"></i> Phương tiện di chuyển: {transport}
                      </span>
                      <span>
                        <i className="ri-hotel-fill"></i>Hotel: {hotel}

                        <i className="ri-star-fill"></i>
                      </span>
                      {/* <span>
                        <i className="ri-map-pin-line"></i> {distance}
                        k/m
                      </span> */}
                      <span>
                        <i className="ri-group-line"></i>Số chổ còn nhận: {maxGroupSize - numberOfBookings}
                      </span>
                    </div>
                    <h5>Chi tiết</h5>
                    <p>{desc}</p>
                    <h5>Lịch trình</h5>
                    {itinerary && itinerary.map((day, index) => (
                      <div key={index} className="itinerary__day">
                        <h6>Ngày {day.day}</h6>
                        <ul>
                          {day.activities.map((activity, idx) => (
                            <li key={idx}>
                              <strong>{activity.activity}:</strong> {activity.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {/* tour reviews section */}
                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews) </h4>
                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setTourRating(1)}>
                          1<i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          2<i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          3<i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          4<i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          5<i className="ri-star-s-fill"></i>
                        </span>
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          required
                          placeholder="share your thoughts"
                          ref={reviewMsgRef}
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews?.map((reviews) => (
                        <div className="review__item">
                          <img src={avata} alt="reivew item" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{reviews.username}</h5>
                                <p>
                                  {new Date(reviews.createdAt).toLocaleDateString(
                                    "en-US",
                                    option
                                  )}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {reviews.rating}
                                <i className="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{reviews.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>
              <Col lg="4">
                <Booking tourId={id} tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default TourDetails;
