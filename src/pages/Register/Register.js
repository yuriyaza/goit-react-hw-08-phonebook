import { useSelector } from 'react-redux';

import { AuthRegister } from 'components/AuthRegister/AuthRegister';
import { Spinner } from 'components/Spinner/Spinner';

export const Register = () => {
  const isLoading = useSelector(state => state.auth.isLoading);

  return (
    <>
      <AuthRegister />
      {isLoading && <Spinner />}
    </>
  );
};
