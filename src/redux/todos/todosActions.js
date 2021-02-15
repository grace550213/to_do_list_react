import {
  ADD_TODOS,
  DELETE_DONE_TODOS,
  FINISH_TODOS,
  EDIT_TODOS,
  DELETE_TODOS,
  UPDATE_NEW_TITLE
} from './todosTypes';

// payload=title
export const addTodos = title => {
  return {
    type: ADD_TODOS,
    payload: title
  }
}

export const deleteDoneTodos = () => {
  return {
    type: DELETE_DONE_TODOS,
  }
}

// payload={id, status}
export const finishTodos = data => {
  return {
    type: FINISH_TODOS,
    payload: data
  }
}

// payload={id, status}
export const editTodos = data => {
  return {
    type: EDIT_TODOS,
    payload: data
  }
}

// payload=id
export const deleteTodos = id => {
  return {
    type: DELETE_TODOS,
    payload: id
  }
}

// payload={id, title}
export const updateNewTitle = data => {
  return {
    type: UPDATE_NEW_TITLE,
    payload: data
  }
}