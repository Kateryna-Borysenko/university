import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import BigButton from "../BigButton/BigButton";
import styles from "./EditCard.module.css";

const EditCard = ({ label, onSave, inputValue }) => {
  const [input, setInput] = useState(inputValue);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(input);
    reset();
  };

  const reset = () => setInput("");

  const inputId = nanoid();

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor={inputId}>
        {label}
        <span className={styles.red}>*</span>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={input}
          onChange={handleChange}
        />
      </label>
      <div className={styles.btnWrapper}>
        <BigButton type="submit" text="Сохранить" disabled={!input} />
      </div>
    </form>
  );
};

EditCard.propTypes = {
  onSave: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default EditCard;
