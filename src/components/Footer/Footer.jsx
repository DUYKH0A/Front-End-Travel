import React from "react";
import "./footer.css";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const quick__link = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours/",
    display: "Tours",
  },
];
const quick__links2 = [
  {
    path: "/home",
    display: "Trang chủ",
  },
  {
    path: "/tours/",
    display: "Chuyến đi",
  },
  // {
  //   path: "/home",
  //   display: "Home",
  // },
];

const Footer = () => {

  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              {/* <img src={logo} alt="" /> */}
              <p></p>
              <div className="social__links d-flex align-items-center gap-4">
                <span>
                  <Link to="#">
                    <i className="ri-youtube-line"></i>
                  </Link>
                  <Link to="#">
                    <i className="ri-github-fill"></i>
                  </Link>
                  <Link to="#">
                    <i className="ri-facebook-circle-line"></i>
                  </Link>
                  <Link to="#">
                    <i className="ri-instagram-line"></i>
                  </Link>
                </span>
              </div>
            </div>
          </Col>
          {/* <Col lg="3">
            <h5 className="footer__link-title">Discover</h5>
            <ListGroup className="footer__quick-links">
              {quick__links2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col> */}
          <Col lg="3">
            <h5 className="footer__link-title">Truy cập nhanh</h5>
            <ListGroup className="footer__quick-links">
              {quick__links2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer__link-title">Liên hệ</h5>
            <ListGroup className="footer__quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i className="ri-map-pin-line"></i></span>
                  Địa chỉ:
                </h6>
                <p className="mb-0">Lien Chieu, Da Nang, Viet Nam</p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i className="ri-mail-line"></i></span>
                  Email:
                </h6>
                <p className="mb-0">Traveltest@gmail.com</p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i className="ri-phone-line"></i></span>
                  Hotlien:
                </h6>
                <p className="mb-0">+84123456789</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
                {/* copyright */}
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
