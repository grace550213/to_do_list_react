import './App.scss';
import Headers from './components/Headers';
import Todos from './components/Todos';
import AddTodos from './components/AddTodos';
import Footer from './components/Footer';
// import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { getTodos, createTodos, updateTodo, deleteTodos } from './api/todos';
import loadingIcon from './assets/images/loader-orange.gif';

// const defaultTodos = [
//   {
//     id: uuidv4(),
//     title: '打籃球',
//     isDone: true,
//     isEditing: false
//   },
//   {
//     id: uuidv4(),
//     title: '吃美食',
//     isDone: false,
//     isEditing: false
//   },
//   {
//     id: uuidv4(),
//     title: '繳電話費',
//     isDone: false,
//     isEditing: false
//   }
// ];

// loading icon 是否顯示
const defaultLoading = true;

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(defaultLoading);

  useEffect(() => {
    // 一開始拿 db.json 的資料
    const fetchTodos = async () => {
      const data = await getTodos();
      // console.log(data);
      setTodos(data);
      // loading icon 消失
      setLoading(false);
    };
    fetchTodos();
  }, []);

  // 剩餘 todolist 項目的數量
  const numberOfRemaining = todos.filter((item) => !item.isDone).length;
  // 改變"新增 input"的文字
  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };
  // 新增 todolist 的項目
  const handleAddTodos = async () => {
    try {
      const data = await createTodos({
        title: inputValue,
        isDone: false
      });
      setTodos((preTodos) => {
        return [...preTodos, data];
      });
      setInputValue('');
    } catch (e) {
      console.log(e);
    }
  };
  // 清除已完成項目
  const handleDeleteDoneTodos = () => {
    try {
      const deleteData = todos.filter((item) => item.isDone);
      // console.log(deleteData)
      deleteData.forEach(async (item) => {
        await deleteTodos(item.id);
      });
      const unfinishedTodos = todos.filter((item) => !item.isDone);
      setTodos(unfinishedTodos);
    } catch (e) {
      console.log(e);
    }
  };
  // 勾選完成或取消勾選完成 todos 的項目
  const handleFinishTodos = async (id, status) => {
    try {
      await updateTodo({
        id,
        isDone: status
      });
      const newTodos = todos.map((item) => {
        if (item.id === id) {
          item.isDone = status;
        }
        return item;
      });
      setTodos(newTodos);
    } catch (e) {
      console.log(e);
    }
  };
  // 編輯或取消編輯 todolist 的項目
  const handleEditTodos = (id, status) => {
    // 寫法一
    setTodos((preTodos) => {
      return preTodos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isEditing: status
          };
        }
        return item;
      });
    });
    // 寫法二
    // const newTodos = todos.map(item => {
    //   if (item.id === id) {
    //     item.isEditing = status;
    //   }
    //   return item;
    // });
    // setTodos(newTodos);
  };
  // 刪除 todolist 的項目
  const handleDeleteTodos = async (id) => {
    try {
      await deleteTodos(id);
      const newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos);
    } catch (e) {
      console.log(e);
    }
  };
  // 更新新的 todos 項目的 title
  const handleUpdateNewTitle = async (id, title) => {
    try {
      await updateTodo({
        id,
        title
      });
      const newTodos = todos.map((item) => {
        if (item.id === id) {
          item.title = title;
          item.isEditing = false;
        }
        return item;
      });
      setTodos(newTodos);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="app">
      <img
        className={clsx('loadingIcon', { hide: !loading })}
        src={loadingIcon}
        alt="loading"
      />
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
