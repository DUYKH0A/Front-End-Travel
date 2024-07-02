import React, {useState, useContext} from "react";
import "../styles/login.css";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

import loginImg from "../assets/images/login.png";
import useIcon from "../assets/images/user.png";

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  });
  console.log("aa")
  const {dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault()
    dispatch({type:'LOGIN_START'})
      try {
        const res = await fetch(`${BASE_URL}/auth/login`,{
          method:"post",
          headers:{
            "content-type":"application/json",
          },
          credentials:'include',
          body: JSON.stringify(credentials),
      })
        const result = await res.json()
        if(!res.ok) alert(result.message);

        console.log(result.data);
        dispatch({type:"LOGIN_SUCCESS", payload: result.data});
        if (result.data.role === 'admin') {
          navigate('/usermanager');
        } else if (result.data.role === 'tourManager') {
          navigate('/tourmanager');
        } else if (result.data.role === 'user'){
          navigate('/');
        }
      } catch (error) {
        dispatch({type:"LOGIN_FAILURE", payload: error.message});

      }
  }
  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={useIcon} alt="" />
                </div>
                <h2>Đăng nhập</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Mật khẩu"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Login
                  </Button>
                  <p>
                    Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                  </p>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
