import TodosItem from './TodosItem';
import { connect } from 'react-redux';

const Todos = ({
  todos
  // handleFinishTodos,
  // handleEditTodos,
  // handleDeleteTodos,
  // handleUpdateNewTitle
}) => {
  return (
    <div className="todos">
      {todos.map((item) => {
        return (
          <TodosItem
            todosItem={item}
            // handleFinishTodos={handleFinishTodos}
            // handleEditTodos={handleEditTodos}
            // handleDeleteTodos={handleDeleteTodos}
            // handleUpdateNewTitle={handleUpdateNewTitle}
            key={item.id}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
};

export default connect(mapStateToProps)(Todos);
// export default Todos;
