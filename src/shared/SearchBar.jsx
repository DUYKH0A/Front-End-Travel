import React, { useRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from './../utils/config';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

    const locationRef = useRef('');
    const maxGroupSizeRef = useRef(0);
    const navigate = useNavigate();

    const searchHandler = async () => {
        const location = locationRef.current.value;
        const maxGroupSize = maxGroupSizeRef.current.value;

        if (location === '' && maxGroupSize === '') {
            return alert('Please enter at least one field!');
        }

        let query = '';
        if (location !== '') query += `city=${location}`;
        if (maxGroupSize !== '') {
            if (query !== '') query += '&';
            query += `maxGroupSize=${maxGroupSize}`;
        }

        const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?${query}`);

        if (!res.ok) alert('Something went wrong');
        const result = await res.json();

        navigate(`/tours/search?${query}`, { state: result.data });
    }

    return (
        <Col>
            <div className="search__bar">
                <Form className="d-flex align-items-center gap-4">
                    <FormGroup className="d-flex gap-3 form__group form__group-fast">
                        <span>
                            <i className="ri-map-pin-line"></i>
                        </span>
                        <div>
                            <h6>Địa điểm</h6>
                            <input type="text" placeholder="Nơi bạn muốn đến?" ref={locationRef}></input>
                        </div>
                    </FormGroup>
                    {/* <FormGroup className="d-flex gap-3 form__group form__group-last">
                        <span>
                            <i className="ri-group-line"></i>
                        </span>
                        <div>
                            <h6>Tổng số người</h6>
                            <input type="number" placeholder="0" ref={maxGroupSizeRef} />
                        </div>
                    </FormGroup> */}
                    <span className="search__icon" type="submit" onClick={searchHandler}>
                        <i className="ri-search-line"></i>
                    </span>
                </Form>
            </div>
        </Col>
    );
};

export default SearchBar;
