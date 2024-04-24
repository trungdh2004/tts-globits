import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/staff";
const API_PATH_2 = ConstantList.API_ENPOINT + "/api/hrStaff";

// - lastName<string>
// - firstName<string>
// - displayName<string>
// - gender<string>
// - birthDate<date>
// - birthPlace<string>
// - permanentResidence<string>
// - currentResidence<string>
// - email<string>
// - phoneNumber<string>
// - idNumber<string>
// - nationality<Country>
// - ethnics<Ethnics>
// - religion<Religion>
// - department<Department>
// - familyRelationships<Array[StaffFamilyRelationship]>

export const getAllDepartment = (searchObject) => {
  var url = API_PATH + "/departmenttree";
  return axios.get(url, searchObject);
};

// get staff theo từng pages
export const getStaffs = (obj) => {
  let url = `${API_PATH}/searchByPage`;
  return axios.post(url, obj);
};

export const getStaffById = (id) => {
  let url = `${API_PATH}/${id}`;
  return axios.get(url);
};

export const createStaff = (body) => {
  // body = {
  //   lastName: "trung",
  //   firstName: "huu",
  //   displayName: "huu trung",
  //   gender: "M",
  //   birthDate: "2024-04-03",
  //   birthPlace: "123",
  //   permanentResidence: "123",
  //   currentResidence: "123",
  //   email: "trung@gmail.com",
  //   phoneNumber: "1234567894",
  //   idNumber: "123",
  //   nationality: {
  //     id: "0f93e085-df7c-41c5-ade7-77b7b3093268", // id country
  //   },
  //   ethnics: {
  //     id: "0e90268b-cebd-461d-8dab-358847e4cca2", // id dan toc
  //   },
  //   religion: {
  //     id: "f54947d8-b742-475c-b50d-4fbfc77181a9", // id ton giao
  //   },
  //   department: {
  //     id: "3229c74c-cd3a-440a-9fdc-ab67c798d4c0", // id phòng
  //   },
  //   familyRelationships: [
  //     {
  //       fullName: "trung nè",
  //       profession: "123",
  //       birthDate: "2024-04-03",
  //       familyRelationship: "94a02563-fe54-48a2-b0b3-91fca6b25c6b",
  //       address: "ha noi",
  //       description: "hay",
  //     },
  //   ],
  // };

  let url = API_PATH;
  return axios.post(url, body);
};

export const editStaff = (obj) => {
  let url = API_PATH + "/" + obj.id;
  return axios.put(url, obj);
};

export const deleteStaff = (id) => {
  let url = API_PATH + "/" + id;
  return axios.delete(url);
};

export const deleteManyStaff = (staffs) => {
  let url = API_PATH_2;
  //  staffs = [{id:""}]
  return axios.delete(url, staffs);
};

export const getStaffAll = ({ pageIndex, pageSize }) => {
  let url = `${API_PATH}/all`;
  return axios.get(url);
};

// todo: tìm nhân viên theo phòng ban
export const getStaffsByDepartment = ({
  departmentId,
  pageIndex,
  pageSize,
}) => {
  let url = `${API_PATH}/${departmentId}/${pageIndex}/${pageSize}`;
  return axios.get(url);
};

// todo: tìm nhân viên theo từng page theo tiêu chí
export const getFindStaffs = ({ pageIndex, pageSize, ...obj }) => {
  let url = `${API_PATH}/${pageIndex}/${pageSize}`;
  return axios.post(url, obj);
};
