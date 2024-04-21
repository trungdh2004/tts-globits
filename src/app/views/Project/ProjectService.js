import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/project";
const API_PATH_2 = ConstantList.API_ENPOINT + "/api/hrProject";

// - name<string>
// - code<string>
// - description<string>
// - projectSfaff : [
//   {
//     id:""
//   }
// ]

export const pagingProject = (obj) => {
  var url = API_PATH_2 + "/search-by-page";
  return axios.post(url, obj);
};

// get staff theo từng pages

export const getProjectById = (id) => {
  let url = `${API_PATH}/${id}`;
  return axios.get(url);
};

export const createProject = (body) => {
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

  let url = API_PATH_2;
  return axios.post(url, body);
};

export const editProject = (obj) => {
  let url = API_PATH_2 + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteProject = (id) => {
  let url = API_PATH_2 + "/" + id;
  return axios.delete(url);
};
