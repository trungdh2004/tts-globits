import { action, makeObservable, observable } from "mobx";

import { toast } from "react-toastify";
import {
  createProject,
  deleteProject,
  editProject,
  pagingProject,
} from "./ProjectService";

class ProjectStore {
  projectList = [];
  page = 1;
  pageSize = 5;
  totalElements = 0;
  totalPages = 0;

  constructor() {
    makeObservable(this, {
      projectList: observable,
      page: observable,
      pageSize: observable,
      totalPages: observable,
      totalElements: observable,
      handleProjectInitial: action,
      handlePageSize: action,
      handleChangePage: action,
      handleDeleteById: action,
    });
  }

  handleProjectInitial = async () => {
    try {
      let searchObject = {
        pageIndex: 1,
        pageSize: this.pageSize,
      };
      const { data } = await pagingProject(searchObject);

      this.projectList = data.content;
      this.totalElements = data.totalElements;
      this.page = data.number + 1;
      this.totalPages = data.totalPages;
    } catch (error) {}
  };

  handleDeleteById = async (id) => {
    try {
      if (!id) throw new Error();
      await deleteProject(id);

      this.projectList = this.projectList.filter(
        (project) => project.id !== id
      );
      toast.success("Xóa dự án thành công");
      this.totalElements = this.totalElements - 1;
    } catch (error) {
      toast.error("Xóa thất bại hoặc sản phẩm bị ràng buộc");
    }
  };

  handleUpdateProject = async (obj, history) => {
    try {
      const { data } = await editProject(obj);
      this.projectList = this.projectList.map((country) =>
        country.id === data.id ? data : country
      );

      toast.success("Chỉnh sửa thành công");
      history.push("/category/project");
    } catch (error) {
      console.log("error", error);
      toast.error("Chỉnh sửa thất bại");
    }
  };

  handleAddProject = async (obj, history) => {
    try {
      const { data } = await createProject(obj);
      this.projectList = [data, ...this.projectList];

      toast.success("Tạo thành công thành công");
      history.push("/category/project");
    } catch (error) {
      console.log("error", error);
      toast.error("Tạo thất bại");
    }
  };

  //   handleCreateEthnics = async (value, history) => {
  //     try {
  //       const newEthnics = await createEthnics(value);
  //       toast.success("Thêm sản phẩm thành công");
  //       history.push("/category/ethnics");
  //     } catch (error) {
  //       toast.error("Thêm sản phẩm thất bại");
  //     }
  //   };

  //   handleUpdateEthnics = async (value, history) => {
  //     try {
  //       const { data } = await editEthnics(value);

  //       this.ethnicsList = this.ethnicsList.map((ethnics) =>
  //         ethnics.id === data.id ? data : ethnics
  //       );
  //       toast.success("Sửa sản phẩm thành công");
  //       history.push("/category/ethnics");
  //     } catch (error) {
  //       toast.error("Sửa sản phẩm thất bại");
  //     }
  //   };

  handleChangePage = async (event, page) => {
    let searchObject = {
      pageIndex: page,
      pageSize: this.pageSize,
    };
    const { data } = await pagingProject(searchObject);

    this.projectList = data.content;
    this.page = data.number + 1;
  };

  handlePageSize = async (pagesize) => {
    this.pageSize = pagesize;
    this.handleProjectInitial();
  };
}

export default ProjectStore;
