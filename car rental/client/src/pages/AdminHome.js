import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DefaultLayout from "../components/DefaultLayout"
import { deleteCar, getAllCars } from "../redux/actions/carsActions"
import { Col, Row, Popconfirm } from "antd"
import Spinner from "../components/Spinner"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
function AdminHome() {
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

  return (
    <DefaultLayout>
      {loading == true && <Spinner />}

      <div>
        <h3 className="mt-4" style={{ color: "#a382ff" }}>
          Admin Dashboard
        </h3>
      </div>

      <Row justify="center">
        <Col lg={20}>
          <div className="mt-4" style={{ textAlign: "right" }}>
            <Link to={"/addcar"}>
              <button className="btn1">ADD NEW CAR</button>
            </Link>
          </div>
        </Col>
      </Row>

      <Row justify="center" gutter={16}>
        {totalCars.map((car) => {
          return (
            <Col lg={5} sm={24} xs={24}>
              <div className="car p-2 bs2">
                <img src={car.image} className="carimg"></img>
                <div className="car-content d-flex align-items-center justify-content-between">
                  <div>
                    <p>{car.name}</p>
                    <p>
                      Rent Per Hour : <b>₹{car.rentPerHour}</b>
                    </p>
                  </div>

                  <div>
                    <Link to={`/editcar/${car._id}`}>
                      <EditOutlined
                        style={{
                          cursor: "pointer",
                          fontSize: "21px",
                          color: "#a382ff",
                          marginRight: "15px",
                        }}
                      />
                    </Link>
                    <Popconfirm
                      title="Are you sure to delete this car?"
                      onConfirm={() => {
                        dispatch(deleteCar({ carid: car._id }))
                      }}
                      //   onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined
                        style={{
                          cursor: "pointer",
                          fontSize: "20px",
                          color: "red",
                          marginRight: "10px",
                        }}
                      />
                    </Popconfirm>
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

export default AdminHome










