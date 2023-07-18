import { RotatingLines } from 'react-loader-spinner';
import css from './Spinner.module.css';

export const Spinner = () => {
  return (
    <div className={css.backdrop}>
      <div className={css.spinner}>
        <RotatingLines width='70' strokeWidth='3' strokeColor='#707070' />
      </div>
    </div>
  );
};
