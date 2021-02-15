import clsx from 'clsx';
import { useState } from 'react';
import { connect } from 'react-redux';
import { finishTodos, editTodos, deleteTodos, updateNewTitle } from '../redux';

const TodosItem = ({
  todosItem,
  finishTodos,
  editTodos,
  deleteTodos,
  updateNewTitle
  // handleFinishTodos,
  // handleEditTodos,
  // handleDeleteTodos,
  // handleUpdateNewTitle
}) => {
  const [newTodosTitle, setNewTodosTitle] = useState('');
  // 預先判斷是真的要刪除此筆 todos 還是只是從編輯狀態還原成檢視狀態
  const handleconfirmDelete = (id, isEditing) => {
    if (isEditing) {
      editTodos({ id, status: false });
      // handleEditTodos(id, false);
      return;
    }
    deleteTodos(id);
    // handleDeleteTodos(id);
  };
  // 預先判斷是否完成，若已完成，則不能編輯
  const handleConfirmEdit = (id, isDone) => {
    if (isDone) {
      return;
    }
    editTodos({ id, status: true });
    // handleEditTodos(id, true);
  };
  // 改變"編輯 todos input"的文字
  const handleChangeInput = (e) => {
    setNewTodosTitle(e.target.value);
  };
  // 若按下的為 enter 鍵，則更新新的 todos 的 title
  const handleConfirmNewTitle = (event) => {
    // console.log(event.key);
    // console.log(todosItem.id, newTodosTitle);
    if (event.key === 'Enter' && newTodosTitle === '') {
      alert('您未輸入文字');
    } else if (event.key === 'Enter') {
      updateNewTitle({ id: todosItem.id, title: newTodosTitle });
      // handleUpdateNewTitle(todosItem.id, newTodosTitle);
    }
  };
  // 預先確認使用者是否在編輯狀態
  const handleConfirmFinish = (id, newIsDone, isEditing) => {
    if (isEditing) {
      alert('您在編輯狀態，無法勾選完成');
      return;
    }
    finishTodos({ id, status: newIsDone });
    // handleFinishTodos(id, newIsDone);
  };
  return (
    <div
      className={clsx(
        'task-item',
        { done: todosItem.isDone },
        { edit: todosItem.isEditing }
      )}
      onDoubleClick={() => handleConfirmEdit(todosItem.id, todosItem.isDone)}>
      <div
        className="task-item-checked"
        onClick={() =>
          handleConfirmFinish(
            todosItem.id,
            !todosItem.isDone,
            todosItem.isEditing
          )
        }>
        <span className="icon icon-checked"></span>
      </div>
      <div className="task-item-body">
        <span className="task-item-body-text">{todosItem.title}</span>
        <input
          className="task-item-body-input"
          type="text"
          placeholder="新增工作"
          value={newTodosTitle}
          onChange={handleChangeInput}
          onKeyDown={handleConfirmNewTitle}
        />
      </div>
      <div
        className="task-item-action"
        onClick={() => handleconfirmDelete(todosItem.id, todosItem.isEditing)}>
        <button className="btn-reset btn-destroy icon"> </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    finishTodos: (data) => dispatch(finishTodos(data)),
    editTodos: (data) => dispatch(editTodos(data)),
    deleteTodos: (id) => dispatch(deleteTodos(id)),
    updateNewTitle: (data) => dispatch(updateNewTitle(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosItem);
// export default TodosItem;
