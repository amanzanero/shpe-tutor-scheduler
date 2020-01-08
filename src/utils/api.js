import axios from 'axios';
import Cookies from 'js-cookie';

import baseUrl from '../config/config';

const getSession = () => Cookies.get('id_token');

export const clearSession = () => Cookies.remove('id_token');

const getAuth = () => {
  const token = getSession();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return headers;
};

export const fetchProfile = async () => {
  const headers = getAuth();
  const response = await axios.get(`${baseUrl}/user/profile`, {
    headers,
  });
  return response.data.data;
};

export const fetchAllCourses = async () => {
  const headers = getAuth();
  const response = await axios.get(`${baseUrl}/course/current`, {
    headers,
  });
  const { courses } = response.data.data;
  return courses;
};

export const addUserCourses = async data => {
  const headers = getAuth();
  const response = await axios.put(
    `${baseUrl}/course/userCurrent`,
    {
      courseIDs: data,
    },
    { headers },
  );
  return response.data.updatedCourses;
};

export const registerUser = async data => {
  const response = await axios.post(`${baseUrl}/user/register`, data);
  Cookies.set('id_token', response.data.data.token);
};

export const loginUser = async data => {
  const response = await axios.post(`${baseUrl}/user/login`, data);
  Cookies.set('id_token', response.data.data.token);
};
