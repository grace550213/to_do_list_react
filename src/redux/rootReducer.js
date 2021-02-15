import { combineReducers } from 'redux'
import todosReducer from './todos/todosReducer'
// import iceCreamReducer from './iceCream/iceCreamReducer'
// import userReducer from './user/userReducer'

const rootReducer = combineReducers({
  todos: todosReducer,
  // iceCream: iceCreamReducer,
  // user: userReducer
})

export default rootReducer
