import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { API_URL } from './static';

const URL = API_URL();

// Get requests list.
export const initReq = async () => axios.get(`${URL}/init.php`);
export const userExists = async () => {
  const response = await axios.get(`${URL}/users/userexists.php`);
  return response.data;
};
export const fetchProjects = async () => {
  const response = await axios.get(`${URL}/projects/index.php`);
  return response.data;
};

// Login request and consumer and user interface.
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  start_career: string;
  completed_projects: number;
  satisfied_customers: number;
}

export const login = async (rData: URLSearchParams) => {
  const { data } = await axios.post(`${URL}/users/login.php`, rData);
  return data;
}
export const useLogin = (onSucces?: Function) => {
  return useMutation(login);
}

// Register request and consumer.
export const register = async (rData: URLSearchParams) => {
  const { data } = await axios.post(`${URL}/users/register.php`, rData);
  return data;
}
export const useRegister = () => {
  return useMutation(register);
}

export const createProject = async (rData: URLSearchParams) => {
  const { data } = await axios.post(`${URL}/projects/create.php`, rData);
  return data;
}

export const useCreateProject = () => {
  return useMutation(createProject);
}