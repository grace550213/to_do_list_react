const Headers = ({handleDeleteDoneTodos}) => (
  <header>
    <h3>Tasks</h3>
    <button className="btn-reset btn-cleanDone" onClick={handleDeleteDoneTodos}> 清除已完成項目 </button>
  </header>
);

export default Headers;
