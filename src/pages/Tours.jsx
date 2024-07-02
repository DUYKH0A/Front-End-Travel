import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tours.css";

import TourCard from "./../shared/TourCard";
import SearchBar from "./../shared/SearchBar";
import { Col, Container, Row } from "reactstrap";

import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data: tours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);
  const [currentTime, setCurrentTime] = useState(new Date()); // Lấy thời gian hiện tại

  useEffect(() => {
    console.log(tours)
    const pages = Math.ceil(tourCount / 8); //nbackend
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  const isTourValid = (tour) => {
    // Lấy thời gian khởi hành của tour
    const tourDepartureTime = new Date(tour.departureDate);
    console.log("tourDepartureTime",tourDepartureTime)
    // Tính thời gian cách thời gian hiện tại
    const timeDiff = tourDepartureTime.getTime() - currentTime.getTime();
    console.log("timeDiff",timeDiff)
    // Chuyển đổi thời gian thành đơn vị ngày
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    console.log("daysDiff",daysDiff)
    // Kiểm tra xem tour có cách thời gian hiện tại ít nhất 2 ngày và còn chỗ để đặt tour không
    return daysDiff >= 2 && tour.maxGroupSize - tour.numberOfBookings > 0;
  };
  // Sắp xếp danh sách tour theo thời gian khởi hành
  const sortedTours = tours?.slice().sort((a, b) => {
    const dateA = new Date(a.departureDate);
    const dateB = new Date(b.departureDate);
    return dateA - dateB;
  });
  return (
    <>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            {/* <Col>
              <SearchBar />
            </Col> */}
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {loading && (
            <h4 className="text-center pt-5">Loading...............</h4>
          )}
          {error && <h4 className="text-center pt-5">{error}</h4>}

          {!loading && !error && (
            <Row>
              {sortedTours?.filter(isTourValid).map((tour) => (
                <Col lg="3" key={tour._id} className="mb-4">
                  <TourCard tour={tour} />
                </Col>
              ))}
              <Col lg="12">
                {/* <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div> */}
              </Col>
            </Row>
          )}
        </Container>
      </section>
      {/* <Newsletter/> */}
    </>
  );
};

export default Tours;
