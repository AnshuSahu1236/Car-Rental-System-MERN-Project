import { createStore, applyMiddleware, combineReducers } from "redux"
import { composeWithDevTools } from "@redux-devtools/extension"
import thunk from "redux-thunk"
import { carsReducer } from "./reducers/carsReducer"
import { alertsReducer } from "./reducers/alertsReducer"
import { bookingsReducer } from "./reducers/bookingsReducer"

const rootReducer = combineReducers({
  carsReducer,
  alertsReducer,
  bookingsReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
)

export default store


