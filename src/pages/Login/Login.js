import { useSelector } from 'react-redux';

import { FormLogin } from 'components/FormLogin/FormLogin';
import { Spinner } from 'components/Spinner/Spinner';

export const Login = () => {
  const isLoading = useSelector(state => state.auth.isLoading);

  return (
    <>
      <FormLogin />
      {isLoading && <Spinner />}
    </>
  );
};
