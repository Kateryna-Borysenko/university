import PropTypes from "prop-types";

const Section = ({ icon, title, children }) => {
  return (
    <section className="section">
      <div className="header">
        <div className="img-wrapper">
          <img src={icon} alt={title} />
        </div>
        <h3 className="heading">{title}</h3>
      </div>
      {children}
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Section;
