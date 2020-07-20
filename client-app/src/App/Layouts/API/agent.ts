import axios, { AxiosResponse } from "axios";
import { IActivity } from "../../../Models/IActivity";

axios.defaults.baseURL = "http://localhost:5000/api";
/** Function response delayer, curried method */
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  edit: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
};
/** Activity API */
const Activities = {
  list: (): Promise<IActivity[]> => request.get(`/activities`),
  create: (activity: IActivity) => request.post(`/activities`, activity),
  details: (id: string) => request.get(`/activities/${id}`),
  update: (activity: IActivity) =>
    request.edit(`/activities/${activity.id}`, activity),
  delete: (id: string) => request.del(`/activities/${id}`),
};

export default {
  Activities,
};
