import {
  ADD_TODOS,
  DELETE_DONE_TODOS,
  FINISH_TODOS,
  EDIT_TODOS,
  DELETE_TODOS,
  UPDATE_NEW_TITLE
} from './todosTypes';
import { v4 as uuidv4 } from 'uuid';

const initialState = [
  {
    id: uuidv4(),
    title: '打籃球',
    isDone: true,
    isEditing: false
  },
  {
    id: uuidv4(),
    title: '吃美食',
    isDone: false,
    isEditing: false
  },
  {
    id: uuidv4(),
    title: '繳電話費',
    isDone: false,
    isEditing: false
  }
];
const todosReducer = (state = initialState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    // 新增 todolist 的項目 payload=title
    case ADD_TODOS:
      return [
        ...state,
        {
          id: uuidv4(),
          // title: inputValue,
          title: action.payload,
          isDone: false,
          isEditing: false
        }
      ];

    // 清除已完成項目
    case DELETE_DONE_TODOS:
      return state.filter((item) => !item.isDone);

    // 勾選完成或取消勾選完成 todos 的項目 action.payload={id, status}
    case FINISH_TODOS:
      return newState.map((item) => {
        if (item.id === action.payload.id) {
          item.isDone = action.payload.status;
        }
        return item;
      });

    // 編輯或取消編輯 todolist 的項目  action.payload={id, status}
    case EDIT_TODOS:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          item.isEditing = action.payload.status;
        }
        return item;
      });

    // 刪除 todolist 的項目 payload=id
    case DELETE_TODOS:
      return state.filter((item) => item.id !== action.payload);

    // 更新新的 todos 項目的 title action.payload={id, title}
    case UPDATE_NEW_TITLE:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          item.title = action.payload.title;
          item.isEditing = false;
        }
        return item;
      });

    default:
      return state;
  }
};

export default todosReducer;
