import Cookies from 'js-cookie';
import { createContext, useContext } from 'react';

export const getSession = () => Cookies.get('id_token');

export const clearSession = () => Cookies.remove('id_token');

const tokenContext = createContext({
  token: getSession(),
});

export const useTokenContext = () => useContext(tokenContext);

export default tokenContext;
