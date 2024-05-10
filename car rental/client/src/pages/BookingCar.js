import { useParams } from "react-router-dom"
import { getAllCars } from "../redux/actions/carsActions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"
import DefaultLayout from "../components/DefaultLayout"
import { Row, Col, Divider, DatePicker, Checkbox, Modal, Badge } from "antd"
import moment from "moment"
import { bookCar } from "../redux/actions/bookingActions"
import StripeCheckout from "react-stripe-checkout"

function BookingCar() {
  const { RangePicker } = DatePicker
  const params = useParams()
  const { cars } = useSelector((state) => state.carsReducer)
  const { loading } = useSelector((state) => state.alertsReducer)
  const [car, setCar] = useState({})
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [totalHours, setTotalHours] = useState(0)
  const [driver, setDriver] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const dispatch = useDispatch()

  var datesToBlock = []

  function fill() {
    if (car.bookedTimeSlots == undefined) return
    datesToBlock = []
    for (var i = 0; i < car.bookedTimeSlots.length; i++) {
      const slot = car.bookedTimeSlots[i]
      const startDate = moment(slot.from, "MMM DD yyyy HH:mm")
      const endDate = moment(slot.to, "MMM DD yyyy HH:mm")
      console.log(startDate.toDate())
      datesToBlock.push(startDate.toDate())

      while (startDate.add(1, "days").diff(endDate) < 0) {
        console.log(startDate.toDate())
        datesToBlock.push(startDate.toDate())
      }
      console.log(endDate.toDate())
      datesToBlock.push(endDate.toDate())
    }
    console.log(datesToBlock)
  }

  useEffect(() => {
    fill()
  }, [car,showModal])

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars())
    } else {
      setCar(cars.find((item) => item._id == params.carid))
    }
  }, [cars])
  function disabledDate(current) {
    
    for (let i = 0; i < datesToBlock.length; i++) {
      if (
        current.date() === moment(datesToBlock[i]).date() &&
        current.month() === moment(datesToBlock[i]).month()
      ) {
        return true
      }
    }
    return false
  }
  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour)
    if (driver) {
      setTotalAmount(totalAmount + 50 * totalHours)
    }
  }, [driver, totalHours])

  function selectTimeSlots(values) {
    console.log(moment(values[0]).format("MMM DD yyyy HH:mm"))
    setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"))
    setTo(moment(values[1]).format("MMM DD yyyy HH:mm"))
    setTotalHours(values[1].diff(values[0], "hours"))
  }

  function onToken(token) {
    console.log(token)
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    }
    dispatch(bookCar(reqObj))
  }
  return (
    <DefaultLayout>
      {loading == true && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24}>
          <img src={car.image} className="car-image-booking bs2"></img>
        </Col>
        <Col lg={10} sm={24} xs={24}>
          <Divider type="horizontal">Car Info</Divider>
          <div>
            <p className="p-car-info">{car.name}</p>
            <p className="p-car-info">{car.rentPerHour} Rent Per Hour</p>
            <p className="p-car-info">Fuel: {car.fuelType}</p>
            <p className="p-car-info">Max Persons: {car.capacity}</p>
          </div>
          <Divider type="horizontal">Select Time Slots</Divider>
          <div className="d-flex justify-content-between">
            <RangePicker
              disabledDate={disabledDate}
              format={"MMM DD yyyy HH:mm"}
              showTime={{ format: "HH:mm" }}
              onChange={selectTimeSlots}
            />

            <button
              onClick={() => {
                setShowModal(true)
              }}
              className="btn1"
            >
              See Booked Slots
            </button>
          </div>
          {from && to && (
            <div style={{ textAlign: "right" }}>
              <p className="p-car-info">Total Hours: {totalHours}</p>
              <p className="p-car-info">Rent Per Hour: {car.rentPerHour}</p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setDriver(true)
                  } else {
                    setDriver(false)
                  }
                }}
              >
                Driver Required
              </Checkbox>
              <h3 className="p-car-info">Total Amount: {totalAmount}</h3>
              <StripeCheckout
                amount={totalAmount * 100}
                shippingAddress
                currency="INR"
                token={onToken}
                stripeKey="pk_test_51KwLTsSB02Ylevz3pNiDnGz9EXGAh9XUsryFYtoHh6JWXPqqPVU7PrixfGOWBLphmlD2ZyKaouCCMnk7ZiM2c2aj00yyJONl4o"
              >
                <button className="btn1">Book Now</button>
              </StripeCheckout>
            </div>
          )}
        </Col>
      </Row>
      <Modal
        title="Booked Time Slots"
        visible={showModal}
        closable={true}
        footer={false}
      >
        {car._id != null ? (
          <>
            <div style={{ display: "inline-block" }}>
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <div className="booked-slots">{`${slot.from}  -  ${slot.to}`}</div>
                )
              })}
            </div>
            <div className="mt-2" style={{ textAlign: "right" }}>
              <button
                className="btn1"
                onClick={() => {
                  setShowModal(false)
                }}
              >
                Close
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </Modal>
    </DefaultLayout>
  )
}

export default BookingCar


