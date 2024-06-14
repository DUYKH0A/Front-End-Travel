import React from "react";
import { Col } from "reactstrap";
import ServiceCard from "./ServiceCard";

import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Caculate Weather",
    desc: "",
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "",
  },
  {
    imgUrl: customizationImg,
    title: "Customization",
    desc: "",
  },
];
const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="3" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
