import React, { useEffect, useState } from "react"
import DefaultLayout from "../components/DefaultLayout"
import { useDispatch, useSelector } from "react-redux"
import { getAllBookings } from "../redux/actions/bookingActions"
import { Col, Row } from "antd"
import moment from "moment"
function UserBookings() {
  const dispatch = useDispatch()
  const { bookings } = useSelector((state) => state.bookingsReducer)
  useEffect(() => {
    dispatch(getAllBookings())
  }, [])
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <DefaultLayout>
      <h3 className="text-center mt-2">
        {user.isAdmin ? "All Bookings" : "My Bookings"}
      </h3>
      {user.isAdmin ? (
        <Row justify="center">
          <Col lg={15} sm={24}>
            {bookings.map((booking) => {
              return (
                <Row className="bs1 mt-4 p-2">
                  <Col lg={7} sm={24}>
                    <p>User : <b>{booking.user.username}</b></p>
                    <p>
                      <b>{booking.car.name}</b>
                    </p>
                    <p>
                      Rent per hour: <b>{booking.car.rentPerHour}</b>
                    </p>
                    <p>
                      Total Hours: <b>{booking.totalHours}</b>
                    </p>
                    <p>
                      Total Amount Paid: <b>{booking.totalAmount}</b>
                    </p>
                  </Col>
                  <Col lg={10} sm={24}>
                    <p>
                      Transaction Id: <b>{booking.transactionId}</b>
                    </p>
                    <p>
                      From: <b>{booking.bookedTimeSlots.from}</b>
                    </p>
                    <p>
                      To: <b>{booking.bookedTimeSlots.to}</b>
                    </p>
                    <p>
                      Date of booking:{" "}
                      <b>{moment(booking.createdAt).format("MMM DD yyyy")}</b>
                    </p>
                  </Col>
                  <Col lg={7} sm={24}>
                    <img
                      src={booking.car.image}
                      height="110px"
                      width={"220px"}
                      style={{ objectFit: "cover" }}
                    ></img>
                  </Col>
                </Row>
              )
            })}
          </Col>
        </Row>
      ) : (
        <Row justify="center">
          <Col lg={15} sm={24}>
            {bookings
              .filter((o) => o.user._id == user._id)
              .map((booking) => {
                return (
                  <Row className="bs1 mt-4 p-2">
                    <Col lg={7} sm={24}>
                      <p>
                        <b>{booking.car.name}</b>
                      </p>
                      <p>
                        Rent per hour: <b>{booking.car.rentPerHour}</b>
                      </p>
                      <p>
                        Total Hours: <b>{booking.totalHours}</b>
                      </p>
                      <p>
                        Total Amount Paid: <b>{booking.totalAmount}</b>
                      </p>
                    </Col>
                    <Col lg={10} sm={24}>
                      <p>
                        Transaction Id: <b>{booking.transactionId}</b>
                      </p>
                      <p>
                        From: <b>{booking.bookedTimeSlots.from}</b>
                      </p>
                      <p>
                        To: <b>{booking.bookedTimeSlots.to}</b>
                      </p>
                      <p>
                        Date of booking:{" "}
                        <b>{moment(booking.createdAt).format("MMM DD yyyy")}</b>
                      </p>
                    </Col>
                    <Col lg={7} sm={24}>
                      <img
                        src={booking.car.image}
                        height="110px"
                        width={"220px"}
                        style={{ objectFit: "cover" }}
                      ></img>
                    </Col>
                  </Row>
                )
              })}
          </Col>
        </Row>
      )}
    </DefaultLayout>
  )
}
export default UserBookings
