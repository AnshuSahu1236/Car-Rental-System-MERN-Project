
import React, { useEffect } from "react"
import { Menu, Dropdown, Button, Space, Row, Col } from "antd"
import { Link } from "react-router-dom"
import Lottie from "react-lottie"
import carLottie from "../lotties/car.json"

function DefaultLayout(props) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: carLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }
  const user = JSON.parse(localStorage.getItem("user"))
  const menu = (
    <Menu
      items={[
        {
          label: <Link to={user.isAdmin ? "/admin" : "/"}>Home</Link>,
        },
        {
          label: (
            <Link to={"/userbookings"}>
              {user.isAdmin ? "All Bookings" : "My Bookings"}
            </Link>
          ),
        },
        {
          label: (
            <div
              onClick={() => {
                localStorage.removeItem("user")
                window.location.href = "/login"
              }}
            >
              Logout
            </div>
          ),
        },
      ]}
    />
  )
  return (
    <>
      <div>
        <div className="header bs1">
          <Row gutter={16} justify="center">
            <Col lg={20} sm={24} xs={24} className="pt-2">
              <div className="d-flex justify-content-between">
                <Link to={user.isAdmin ? "/admin" : "/"}>
                  <div className="d-flex">
                    <h1>Rent Cars</h1>
                    <Lottie options={defaultOptions} height={40} width={80} />
                  </div>
                </Link>
                <Dropdown overlay={menu} placement="bottomLeft">
                  <Button className="btn1">{user.username}</Button>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </div>

        <div className="content">{props.children}</div>
      </div>
    </>
  )
}

export default DefaultLayout

