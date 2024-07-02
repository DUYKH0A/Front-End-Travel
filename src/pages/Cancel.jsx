import React from "react";
import "../styles/thank-you.css";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <span>
                <i className="ri-close-circle-line"></i>
              </span>
              {/* <h1 className="mb-3 fw-semiblod">ĐÃ HUỶ THANH TOÁN</h1> */}
              <h1 className="mb-4">Thanh toán đã được huỷ.</h1>

              <Button className="btn primary__btn w-25">
                <Link to="/home">Trở về trang chủ</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cancel;
