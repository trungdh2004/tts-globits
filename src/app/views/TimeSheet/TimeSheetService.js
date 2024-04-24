import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/timesheet";
const API_PATH_PROJECT = ConstantList.API_ENPOINT + "/api/project-time-work";

// {
//   "project":{
//       "id":"a2ab6493-85a8-480a-a941-8af34002d6fc"
//   },
//   "priority":"1",
//   "description":"mo ta",
//   "timeSheetStaff":[
//       {
//           "id":"a2be2339-2af9-4737-ae60-8e6d3595625d"
//       }
//   ],
//   "workingDate":"2002-07-02",
//   "startTime":"10",
//   "endTime":"11",
//   "details":[
//       {
//           "workingItemTitle":"lamf 1",
//           "employee":{
//               "id":"a2be2339-2af9-4737-ae60-8e6d3595625d"
//           }
//       }
//   ]

// }

export const getProjectAll = (obj) => {
  var url = API_PATH_PROJECT + "/search-by-page";
  return axios.get(url);
};

export const getSearchByPage = (obj) => {
  var url = API_PATH + "/search-by-page";
  return axios.post(url, obj);
};

// get staff theo từng pages

export const getTimeSheetById = (id) => {
  let url = `${API_PATH}/${id}`;
  return axios.get(url);
};

export const createTimeSheet = (body) => {
  // body = {
  //
  // - name<string>
  // - code<string>
  // - description<string>
  // - projectSfaff : [
  //   {
  //     id:""
  //   }
  // ]
  // };

  let url = API_PATH;
  return axios.post(url, body);
};

export const editTimeSheet = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteTimeSheet = (id) => {
  let url = API_PATH + "/" + id;
  return axios.delete(url);
};
