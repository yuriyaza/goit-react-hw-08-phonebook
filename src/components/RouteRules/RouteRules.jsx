import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const RouteRules = ({ component, type = 'public', onDeniedRedirect = '/' }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  let shouldRedirect = false;

  switch (type) {
    case 'public':
      shouldRedirect = false;
      break;
    case 'restricted':
      shouldRedirect = isLoggedIn;
      break;
    case 'private':
      shouldRedirect = !isLoggedIn;
      break;
    default:
      shouldRedirect = false;
  }

  return <>{shouldRedirect ? <Navigate to={onDeniedRedirect} /> : component}</>;
};
