import { connect } from 'react-redux';
import { deleteDoneTodos } from '../redux';

// const Headers = ({handleDeleteDoneTodos}) => (
const Headers = ({ deleteDoneTodos }) => (
  <header>
    <h3>Tasks</h3>
    <button className="btn-reset btn-cleanDone" onClick={deleteDoneTodos}>
      {' '}
      清除已完成項目{' '}
    </button>
  </header>
);

const mapDispatchToProps = (dispatch) => {
  return {
    deleteDoneTodos: () => dispatch(deleteDoneTodos())
  };
};

export default connect(null, mapDispatchToProps)(Headers);
// export default Headers;
