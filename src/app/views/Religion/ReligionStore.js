import { action, makeObservable, observable } from "mobx";

import { toast } from "react-toastify";

import {
  createReligion,
  deleteReligion,
  editReligion,
  pagingReligions,
} from "./ReligionService";

class ReligionStore {
  religionList = [];
  page = 1;
  pageSize = 5;
  totalElements = 0;
  totalPages = 0;

  constructor() {
    makeObservable(this, {
      religionList: observable,
      page: observable,
      pageSize: observable,
      totalPages: observable,
      totalElements: observable,
      handleReligionInitial: action,
      handlePageSize: action,
      handleChangePage: action,
      handleDeleteReligionById: action,
      handleCreateReligion: action,
      handleUpdateReligion: action,
    });
  }

  handleReligionInitial = async () => {
    try {
      let searchObject = {
        pageIndex: 1,
        pageSize: this.pageSize,
      };
      const { data } = await pagingReligions(searchObject);

      this.religionList = data.content;
      this.totalElements = data.totalElements;
      this.page = data.number + 1;
      this.totalPages = data.totalPages;
    } catch (error) {}
  };

  handleDeleteReligionById = async (id) => {
    try {
      if (!id) throw new Error();
      await deleteReligion(id);

      this.religionList = this.religionList.filter(
        (religion) => religion.id !== id
      );
      toast.success("Xóa thành công");
      this.totalElements = this.totalElements - 1;
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };

  handleCreateReligion = async (value, history) => {
    try {
      const newReligion = await createReligion(value);
      toast.success("Thêm sản phẩm thành công");
      history.push("/category/religion");
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại");
    }
  };

  handleUpdateReligion = async (value, history) => {
    try {
      const { data } = await editReligion(value);

      this.religionList = this.religionList.map((religion) =>
        religion.id === data.id ? data : religion
      );
      toast.success("Sửa sản phẩm thành công");
      history.push("/category/religion");
    } catch (error) {
      toast.error("Sửa sản phẩm thất bại");
    }
  };

  handleChangePage = async (event, page) => {
    let searchObject = {
      pageIndex: page,
      pageSize: this.pageSize,
    };
    const { data } = await pagingReligions(searchObject);

    this.religionList = data.content;
    this.page = data.number + 1;
  };

  handlePageSize = async (pagesize) => {
    this.pageSize = pagesize;
    this.handleReligionInitial();
  };
}

export default ReligionStore;
