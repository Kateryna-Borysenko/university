import PulseLoader from 'react-spinners/PulseLoader';
import { useLockBodyScroll } from 'react-use';
import { createPortal } from 'react-dom';
import s from './Spinner.module.css';

const Spinner = () => {
  useLockBodyScroll(true);
  return createPortal(
    <div className={s.spinner}>
      <div className={s.content}>
        <PulseLoader margin={5} size={15} color={'#e1b4d3'} />
      </div>
    </div>,
    document.querySelector('#modal-root'),
  );
};
export default Spinner;
