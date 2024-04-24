import { action, makeObservable, observable } from "mobx";
import { toast } from "react-toastify";
import {
  deleteDepartment,
  pagingAllDepartments,
  pagingDepartments,
} from "./DepartmentService";

class DepartmentStore {
  departmentList = [];
  page = 1;
  pageSize = 5;
  totalElements = 0;
  totalPages = 0;

  constructor() {
    makeObservable(this, {
      departmentList: observable,
      page: observable,
      pageSize: observable,
      totalPages: observable,
      totalElements: observable,
      handleDepartmentListInitial: action,
      handlePageSize: action,
      handleChangePage: action,
      handleDeleteDepartmentsById: action,
    });
  }

  handleDepartmentListInitial = async () => {
    try {
      let searchObject = {
        pageIndex: 1,
        pageSize: this.pageSize,
      };
      const { data } = await pagingAllDepartments(searchObject);

      this.departmentList = data.content;
      this.totalElements = data.totalElements;
      this.page = data.number + 1;
      this.totalPages = data.totalPages;
    } catch (error) {}
  };

  handleDeleteDepartmentsById = async (id) => {
    try {
      if (!id) throw new Error();
      await deleteDepartment(id);

      this.departmentList = this.departmentList.filter(
        (departments) => departments.id !== id
      );
      toast.success("Xóa thành công");
      this.totalElements = this.totalElements - 1;
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };

  handleChangePage = async (event, page) => {
    let searchObject = {
      pageIndex: page,
      pageSize: this.pageSize,
    };
    const { data } = await pagingAllDepartments(searchObject);

    this.departmentList = data.content;
    this.page = data.number + 1;
  };

  handlePageSize = async (pagesize) => {
    this.pageSize = pagesize;
    this.handleDepartmentListInitial();
  };
}

export default DepartmentStore;
