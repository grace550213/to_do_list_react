import TodosItem from "./TodosItem";

const Todos = ({
  todos,
  handleFinishTodos,
  handleEditTodos,
  handleDeleteTodos,
  handleUpdateNewTitle
}) => {
  return (
    <div className="todos">
      {todos.map(item => {
        return (
          <TodosItem
            todosItem={item}
            handleFinishTodos={handleFinishTodos}
            handleEditTodos={handleEditTodos}
            handleDeleteTodos={handleDeleteTodos}
            handleUpdateNewTitle={handleUpdateNewTitle}
            key={item.id}
          />
        );
      })}
    </div>
  );
};

export default Todos;
