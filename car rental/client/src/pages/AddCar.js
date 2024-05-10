import { Col, Form, Row, Input } from "antd"
import React from "react"

import { useDispatch, useSelector } from "react-redux"
import DefaultLayout from "../components/DefaultLayout"
import Spinner from "../components/Spinner"
import { addCar } from "../redux/actions/carsActions"

function AddCar() {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.alertsReducer)
  function onFinish(values) {
    values.bookedTimeSlots = []
    dispatch(addCar(values))
    console.log(values)
  }
  return (
    <DefaultLayout>
        {loading && <Spinner/>}
      <Row justify="center mt-5">
        <Col lg={10} sm={24}>
          <Form className="bs1 p-3" layout="vertical" onFinish={onFinish}>
            <h3>Add New Car</h3>
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

            <button className="btn1">ADD CAR</button>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  )
}

export default AddCar




