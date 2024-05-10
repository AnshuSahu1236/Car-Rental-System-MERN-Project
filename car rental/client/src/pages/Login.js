import React from "react"
import { Row, Col, Form, Input } from "antd"
import Lottie from "react-lottie"
import carLottie from "../lotties/car.json"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { userLogin } from "../redux/actions/userActions"
function Login() {
  const dispatch = useDispatch()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: carLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }
  function onFinish(values) {
    dispatch(userLogin(values))
    console.log(values)
  }
  return (
    <div className="login">
      <Row
        gutter={16}
        className="d-flex align-items-center"
        style={{ marginTop: "-50px" }}
      >
        <Col lg={16}>
          <div className="lottie-car-div">
            <div className="home-title">RENT CARS</div>
            <div style={{ marginTop: "100px" }}>
              <Lottie options={defaultOptions} height={700} width={800} />
            </div>
            <div className="home-subtitle">Don't Buy It, Just Rent It!</div>
          </div>
        </Col>
        <Col lg={8} style={{ textAlign: "left" }} className="pt-5">
          <Form
            layout="vertical"
            className="p-5 login-form m-2"
            onFinish={onFinish}
          >
            <h1>Login</h1>
            <hr />
            <Form.Item
              name="email"
              label="E-mail"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <button className="btn1 mt-2 mb-3">Login</button>
            <br />
            <Link to={"/register"}>Click Here to Register</Link>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login


