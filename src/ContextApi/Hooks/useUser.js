import { useContext } from 'react';
import { userContext } from '../Context/UserProvider';

const useUser = () => {
  return useContext(userContext);
};

export default useUser;