import React, { useState } from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { BASE_URL } from "../utils/config";

const CreateTour = () => {
  const [tourData, setTourData] = useState({
    tieude: "",
    Placeofdeparture: "",
    transport: "",
    userId: "", // Thêm trường userId nếu bạn muốn lưu thông tin về người tạo tour
    departureDate: "",
    photo: "",
    price: 0,
    maxGroupSize: 0,
    itinerary: [{ day: 1, activities: [{ activity: "", description: "" }] }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/tours`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tourData)
      });
      if (response.ok) {
        // Tour created successfully, redirect or show a success message
      } else {
        // Handle error response
        console.error("Failed to create tour");
      }
    } catch (error) {
      console.error("Error creating tour:", error);
    }
  };

  return (
    <Container>
      <h1 className="mt-4 mb-4">Tạo Tour Mới</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="title">Tiêu đề:</Label>
          <Input type="text" name="title" id="title" value={tourData.tieude} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="city">Thành phố:</Label>
          <Input type="select" name="city" id="city" value={tourData.city} onChange={handleChange}>
            <option value="city1">Thành phố 1</option>
            <option value="city2">Thành phố 2</option>
            {/* Thêm các tùy chọn cho các thành phố khác */}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="address">Địa chỉ:</Label>
          <Input type="text" name="address" id="address" value={tourData.address} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="userId">Người tạo:</Label>
          <Input type="text" name="userId" id="userId" value={tourData.userId} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="departureDate">Ngày khởi hành:</Label>
          <Input type="date" name="departureDate" id="departureDate" value={tourData.departureDate} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="photo">Ảnh:</Label>
          <Input type="text" name="photo" id="photo" value={tourData.photo} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="price">Giá:</Label>
          <Input type="number" name="price" id="price" value={tourData.price} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="maxGroupSize">Số lượng tối đa:</Label>
          <Input type="number" name="maxGroupSize" id="maxGroupSize" value={tourData.maxGroupSize} onChange={handleChange} />
        </FormGroup>
        {/* Thêm các trường khác tương tự cho mô hình tour */}
        <Button color="primary" type="submit">Tạo Tour Mới</Button>
      </Form>
    </Container>
  );
};

export default CreateTour;
