import axios from "axios"
import { message } from "antd"
export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true })
  try {
    const response = await axios.post("/api/users/login", reqObj)
    console.log(response)
    localStorage.setItem("user", JSON.stringify(response.data))
    message.success("Login success")
    setTimeout(() => {
      if (response.data.isAdmin == true) {
        window.location.href = "/admin"
      } else {
        window.location.href = "/"
      }
    }, 500)
    dispatch({ type: "LOADING", payload: false })
  } catch (error) {
    console.log("error", error)
    message.error("Something went wrong!")
    dispatch({ type: "LOADING", payload: false })
  }
}
export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true })
  try {
    const response = await axios.post("api/users/register", reqObj)
    message.success("Registration success")
    setTimeout(() => {
      window.location.href = "/login"
      message.success("Please Login now")
    }, 500)
    dispatch({ type: "LOADING", payload: false })
  } catch (error) {
    console.log("error", error)
    if (error.response.data == "Email already exists") {
      message.error("Email already exists")
    } else {
      message.error("Something went wrong!")
    }
    dispatch({ type: "LOADING", payload: false })}}
