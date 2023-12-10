import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import PropTypes from 'prop-types';
import BigButton from '../BigButton/BigButton';
import Paper from '../Paper/Paper';
import s from './AddForm.module.css';

const AddForm = ({ onSubmit, formName, placeholder }) => {
  const { t } = useTranslation();

  const [input, setInput] = useState('');

  const handleChange = e => setInput(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(input);
    reset();
  };

  const reset = () => setInput('');

  return (
    <div className={s.container}>
      <Paper>
        <div className={s.inner}>
          <h4 className={s.formName}>{formName}</h4>
          <form onSubmit={handleSubmit}>
            <input
              className={s.textField}
              value={input}
              type="text"
              placeholder={placeholder}
              required
              onChange={handleChange}
            />

            <BigButton type="submit" text={t('common.add')} disabled={!input} />
          </form>
        </div>
      </Paper>
    </div>
  );
};

AddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default AddForm;
