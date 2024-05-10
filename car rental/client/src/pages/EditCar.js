import { Col, Form, Row, Input } from "antd"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import DefaultLayout from "../components/DefaultLayout"
import Spinner from "../components/Spinner"
import { addCar, editCar, getAllCars } from "../redux/actions/carsActions"

function EditCar() {
  const params = useParams()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.alertsReducer)
  const [car, setCar] = useState()
  const [totalCars, setTotalCars] = useState([])
  const { cars } = useSelector((state) => state.carsReducer)

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars())
    } else {
      setTotalCars(cars)
      setCar(cars.find((item) => item._id == params.carid))
      console.log(car)
    }
  }, [cars])

  function onFinish(values) {
   values._id = car._id
    dispatch(editCar(values))
    console.log(values)
  }
  return (
    <DefaultLayout>
      {loading && <Spinner />}
      
      <Row justify="center mt-5">
        <Col lg={10} sm={24}>
          {totalCars.length > 0 && (
            <Form
              initialValues={car}
              className="bs1 p-3"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Car</h3>
              <Form.Item
                name={"name"}
                label="Car Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"image"}
                label="Image URL"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"rentPerHour"}
                label="Rent Per Hour"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"capacity"}
                label="Capacity"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"fuelType"}
                label="Fuel Type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <button className="btn1">EDIT CAR</button>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  )
}

export default EditCar




