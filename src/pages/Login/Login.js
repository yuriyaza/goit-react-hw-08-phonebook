import { useSelector } from 'react-redux';

import { AuthLogin } from 'components/AuthLogin/AuthLogin';
import { Spinner } from 'components/Spinner/Spinner';

export const Login = () => {
  const isLoading = useSelector(state => state.auth.isLoading);

  return (
    <>
      <AuthLogin />
      {isLoading && <Spinner />}
    </>
  );
};
