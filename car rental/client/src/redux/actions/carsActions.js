import { message } from "antd"
import axios from "axios"

export const getAllCars = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true })
  try {
    console.log("Fetching cars")
    const response = await axios.get("/api/cars/getallcars")
    dispatch({ type: "GET_ALL_CARS", payload: response.data })
    dispatch({ type: "LOADING", payload: false })
  } catch (error) {
    console.log("error", error)
    dispatch({ type: "LOADING", payload: false })
  }
}

export const addCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true })
  try {
    console.log("adding cars")
    const response = await axios.post("/api/cars/addcar", reqObj)
    dispatch({ type: "LOADING", payload: false })
    message.success("New Car added successfully")
    setTimeout(() => {
      window.location.href = "/admin"
    }, 500)
  } catch (error) {
    console.log("error", error)
    message.error("Something went wrong!")
    dispatch({ type: "LOADING", payload: false })
  }
}

export const editCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true })
  try {
    console.log("editing cars")
    const response = await axios.post("/api/cars/editcar", reqObj)
    dispatch({ type: "LOADING", payload: false })
    message.success("Car Edited successfully")
    setTimeout(() => {
      window.location.href = "/admin"
    }, 500)
  } catch (error) {
    console.log("error", error)
    message.error("Something went wrong!")
    dispatch({ type: "LOADING", payload: false })
  }
}

export const deleteCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true })
  try {
    console.log("deleting cars")
    const response = await axios.post("/api/cars/deletecar", reqObj)
    dispatch({ type: "LOADING", payload: false })
    message.success("Car Deleted successfully")
    setTimeout(() => {
      window.location.reload()
    }, 500)
  } catch (error) {
    console.log("error", error)
    message.error("Something went wrong!")
    dispatch({ type: "LOADING", payload: false })
  }
}
