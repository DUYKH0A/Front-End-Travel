import React, { useEffect } from "react";
import "../styles/thank-you.css";
import { Container, Row, Col, Button } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/config";

const ThankYou = () => {
  const location = useLocation();
  const getPaymentBooking = async () => {
    const params = new URLSearchParams(location.search);
    const encodedData = params.get("data");
    console.log("endcode", encodedData);
    if (encodedData) {
      try {
        const decodedData = decodeURIComponent(encodedData);
        const data = JSON.parse(decodedData);
        console.log("data",data)
        const res = await fetch(`${BASE_URL}/booking`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        });
        const result = await res.json();
        console.log("result", result);
        if (!res.ok) {
          return alert(result.message);
        }
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    } else {
      console.error("No data parameter found");
    }
  };
  useEffect(() => {
    getPaymentBooking();
  }, []);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <span>
                <i className="ri-checkbox-circle-line"></i>
              </span>
              <h1 className="mb-3 fw-semiblod">Thank You</h1>
              <h3 className="mb-4">Your tour is booked.</h3>

              <Button className="btn primary__btn w-25">
                <Link to="/home">Back to Home</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;
