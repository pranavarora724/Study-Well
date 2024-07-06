
import axios from "axios";
import qs from 'qs'

// export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
  console.log("Method = " , method);
  console.log("Url = " , url);
  console.log("BodyData" , bodyData);
  return axios({
    method: `${method}`,
    url: `${url}`,
    data: (bodyData)?(bodyData):(null),
    headers: (headers)?(headers):(null),
    params: (params)?(params):(null),
  });
};
