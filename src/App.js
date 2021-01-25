import "./App.scss";
import Headers from "./components/Headers";
import Todos from "./components/Todos";
import AddTodos from "./components/AddTodos";
import Footer from "./components/Footer";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const defaultTodos = [
  {
    id: uuidv4(),
    title: "打籃球",
    isDone: true,
    isEditing: false
  },
  {
    id: uuidv4(),
    title: "吃美食",
    isDone: false,
    isEditing: false
  },
  {
    id: uuidv4(),
    title: "繳電話費",
    isDone: false,
    isEditing: false
  }
];

function App() {
  const [todos, setTodos] = useState(defaultTodos);
  const [inputValue, setInputValue] = useState("");
  // 剩餘 todolist 項目的數量
  const numberOfRemaining = todos.filter(item => !item.isDone).length;
  // 改變"新增 input"的文字
  const handleChangeInput = e => {
    setInputValue(e.target.value);
  };
  // 新增 todolist 的項目
  const handleAddTodos = () => {
    setTodos(preTodos => {
      return [
        ...preTodos,
        {
          id: uuidv4(),
          title: inputValue,
          isDone: false,
          isEditing: false
        }
      ];
    });
    setInputValue("");
  };
  // 清除已完成項目
  const handleDeleteDoneTodos = () => {
    const unfinishedTodos = todos.filter(item => !item.isDone);
    setTodos(unfinishedTodos);
  };
  // 勾選完成或取消勾選完成 todos 的項目
  const handleFinishTodos = (id, status) => {
    const newTodos = todos.map(item => {
      if (item.id === id) {
        item.isDone = status;
      }
      return item;
    });
    setTodos(newTodos);
  };
  // 編輯或取消編輯 todolist 的項目
  const handleEditTodos = (id,status) => {
    const newTodos = todos.map(item => {
      if (item.id === id) {
        item.isEditing = status;
      }
      return item;
    });
    setTodos(newTodos);
  };
  // 刪除 todolist 的項目
  const handleDeleteTodos = id => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };
  // 更新新的 todos 項目的 title
  const handleUpdateNewTitle = (id, title) => {
    const newTodos = todos.map(item => {
      if (item.id === id) {
        item.title = title;
        item.isEditing = false;
      }
      return item;
    });
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <Headers handleDeleteDoneTodos={handleDeleteDoneTodos} />
      <AddTodos
        inputValue={inputValue}
        handleChangeInput={handleChangeInput}
        handleAddTodos={handleAddTodos}
      />
      <Todos
        todos={todos}
        handleFinishTodos={handleFinishTodos}
        handleEditTodos={handleEditTodos}
        handleDeleteTodos={handleDeleteTodos}
        handleUpdateNewTitle={handleUpdateNewTitle}
      />
      <Footer numberOfRemaining={numberOfRemaining} />
    </div>
  );
}

export default App;
