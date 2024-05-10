import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DefaultLayout from "../components/DefaultLayout"
import { getAllCars } from "../redux/actions/carsActions"
import { Button, Col, Row, DatePicker, Divider } from "antd"
import Spinner from "../components/Spinner"
import { Link } from "react-router-dom"
import moment from "moment"
function Home() {
  const { RangePicker } = DatePicker
  const { cars } = useSelector((state) => state.carsReducer)
  const { loading } = useSelector((state) => state.alertsReducer)
  const dispatch = useDispatch()
  const [totalCars, setTotalCars] = useState([])

  useEffect(() => {
    dispatch(getAllCars())
  }, [])

  useEffect(() => {
    setTotalCars(cars)
  }, [cars])

  function setFilter(values) {
    if(values==null){
      setTotalCars(cars)
    }
  console.log(values);
    console.log('uyfdhtfdhf');

    var selectedFrom = moment(values[0].format("MMM DD yyyy HH:mm"))
    var selectedTo = moment(values[1].format("MMM DD yyyy HH:mm"))

    var temp = []
    for (var car of cars) {
      if (car.bookedTimeSlots.length == 0) {
        temp.push(car)
      } else {
        for (var booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to)||
            moment(booking.from).isBetween(selectedFrom,selectedTo)||
            moment(booking.to).isBetween(selectedFrom,selectedTo)
          ) {
          } else {
            temp.push(car)
          }
        }
      }
    }
    setTotalCars(temp)
  }

  return (
    <DefaultLayout>
      <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-left">
          <RangePicker
            onChange={setFilter}
            format={"MMM DD yyyy HH:mm"}
            showTime={{ format: "HH:mm" }}
          />
        </Col>
      </Row>

      {loading == true && <Spinner />}

      <Row justify="center" gutter={16}>
        {totalCars.map((car) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="car p-2 bs2">
                <img src={car.image} className="carimg"></img>
                <div className="car-content d-flex align-items-center justify-content-between">
                  <div>
                    <p>{car.name}</p>
                    <p>Rent Per Hour : <b>₹{car.rentPerHour}</b></p>
                  </div>

                  <div>
                    <Link to={`/booking/${car._id}`}>
                      <button className="btn1">Book Now</button>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          )
        })}
      </Row>
    </DefaultLayout>
  )
}

export default Home


