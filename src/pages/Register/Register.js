import { useSelector } from 'react-redux';

import { FormRegister } from 'components/FormRegister/FormRegister';
import { Spinner } from 'components/Spinner/Spinner';

export const Register = () => {
  const isLoading = useSelector(state => state.auth.isLoading);

  return (
    <>
      <FormRegister />
      {isLoading && <Spinner />}
    </>
  );};
