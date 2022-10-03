import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { API_URL } from './static';

const URL = API_URL();

export const initReq = async () => axios.get(`${URL}/init.php`);
export const userExists = async () => {
  const response = await axios.get(`${URL}/users/userexists.php`);
  return response.data;
};

export const login = async (rData: URLSearchParams) => {
  const { data } = await axios.post(`${URL}/users/login.php`, rData);
  return data;
}
export const useLoginData = (onSucces?: Function) => {
  return useMutation(login);
}

export const register = async (rData: URLSearchParams) => {
  const { data } = await axios.post(`${URL}/users/register.php`, rData);
  return data;
}
export const useRegisterData = () => {
  return useMutation(register, {
    onSuccess: (data: any) => {
      console.log(data);
    },
  });
}