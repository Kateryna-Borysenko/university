import PropTypes from "prop-types";
import { ReactComponent as PhoneIcon } from "../../../images/phone.svg";
import { ReactComponent as MailIcon } from "../../../images/mail.svg";
import { ReactComponent as LocationIcon } from "../../../images/location.svg";

const Tutor = ({
  firstName,
  lastName,
  patronymic,
  phone,
  email,
  city,
  options,
}) => {
  return (
    <div className="block">
      <div className="name">
        <p>{lastName}</p>
        <p>{firstName}</p>
        <p>{patronymic}</p>
      </div>
      <div className="data">
        <p className="dataText">
          <PhoneIcon />
          <span className="text">{phone}</span>
        </p>
        <p className="dataText">
          <MailIcon />
          <span className="text">{email}</span>
        </p>
        <p className="dataText">
          <LocationIcon />
          <span className="text">{city}</span>
        </p>
      </div>
      <div>
        <p>{options}</p>
      </div>
    </div>
  );
};

Tutor.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  patronymic: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  options: PropTypes.string.isRequired,
};

export default Tutor;
