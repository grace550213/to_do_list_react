const baseURL = 'http://localhost:3001';

// 取得一開始 todos 裡面的資料
export const getTodos = () => {
  return fetch(`${baseURL}/todos`).then((res) => res.json());
};

// 新增 todos 的項目
export const createTodos = async (payload) => {
  const { title, isDone } = payload;
  const res = await fetch(`${baseURL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      isDone
    })
  });
  const data = await res.json();
  return data;
};

// 刪除 todos 的某一筆資料
export const deleteTodos = async (id) => {
  const res = await fetch(`${baseURL}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  return data;
};

// 更新 todos 項目中的資料，改變 title 或是 isDone 的狀態
export const updateTodo = async (payload) => {
  const { id, title, isDone } = payload;
  const res = await fetch(`${baseURL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      isDone
    })
  });
  const data = await res.json();
  return data;
};
