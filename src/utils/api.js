import axios from 'axios';

import { getSession } from './Authenticator';
import baseUrl from '../config/config';

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
