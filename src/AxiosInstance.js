import axios from "axios";
import { BACKEND_URL } from './constants';

export const axiosInstance = axios.create({
	baseURL: 'http://127.0.0.1:8000',
});