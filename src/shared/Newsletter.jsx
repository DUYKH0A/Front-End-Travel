import React from "react";
import "./newsletter.css";
import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>subscribe .....</h2>
              <div className="newsletter__input">
                <input type="email" placeholder="Enter your email" />
                <button className="btn newsletter__btn">Subscribe</button>
              </div>
              <p>Thank you mail</p>
            </div>
          </Col>
          <Col>
            <div className="newsletter__img">
              <img src={maleTourist} alt="newletter_image"/>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
