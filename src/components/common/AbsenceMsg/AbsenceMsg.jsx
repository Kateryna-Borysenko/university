import PropTypes from 'prop-types';

const AbsenceMsg = ({ message }) => {
  return <h4 className="absence-msg">{message}</h4>;
};

AbsenceMsg.propTypes = {
  message: PropTypes.string.isRequired,
};

export default AbsenceMsg;
