import clsx from 'clsx';
import { connect } from 'react-redux';
import { addTodos } from '../redux';

// const AddTodos = ({ inputValue, handleChangeInput, handleAddTodos }) => (
const AddTodos = ({
  inputValue,
  handleChangeInput,
  addTodos,
  setInputValue
}) => {
  const handleAddTodos = () => {
    addTodos(inputValue);
    setInputValue('');
  };
  return (
    <div className={clsx('add-todo', { active: inputValue.length > 0 })}>
      <label className="add-todo-icon icon" htmlFor="add-todo-input"></label>
      <div className="add-todo-input">
        <input
          id="add-todo-input"
          type="text"
          placeholder="新增工作"
          value={inputValue}
          onChange={handleChangeInput}
        />
      </div>
      {/* <div className="add-todo-action" onClick={handleAddTodos}> */}
      <div className="add-todo-action" onClick={() => handleAddTodos()}>
        <button className="btn-reset btn-add"> 新增 </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodos: (title) => dispatch(addTodos(title))
  };
};

export default connect(null, mapDispatchToProps)(AddTodos);
// export default AddTodos;
