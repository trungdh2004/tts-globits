import { action, makeObservable, observable } from "mobx";

import { toast } from "react-toastify";
import {
  createEthnics,
  deleteEthnics,
  editEthnics,
  pagingEthnicities,
} from "./EthnicsService";

class EthnicsStore {
  ethnicsList = [];
  page = 1;
  pageSize = 5;
  totalElements = 0;
  totalPages = 0;

  constructor() {
    makeObservable(this, {
      ethnicsList: observable,
      page: observable,
      pageSize: observable,
      totalPages: observable,
      totalElements: observable,
      handleEthnicsInitial: action,
      handlePageSize: action,
      handleChangePage: action,
      handleDeleteEthnicsById: action,
      handleCreateEthnics: action,
      handleUpdateEthnics: action,
    });
  }

  handleEthnicsInitial = async () => {
    try {
      let searchObject = {
        pageIndex: 1,
        pageSize: this.pageSize,
      };
      const { data } = await pagingEthnicities(searchObject);

      this.ethnicsList = data.content;
      this.totalElements = data.totalElements;
      this.page = data.number + 1;
      this.totalPages = data.totalPages;
    } catch (error) {}
  };

  handleDeleteEthnicsById = async (id) => {
    try {
      if (!id) throw new Error();
      await deleteEthnics(id);

      this.ethnicsList = this.ethnicsList.filter(
        (ethnics) => ethnics.id !== id
      );
      toast.success("Delete ethnics successfully");
      this.totalElements = this.totalElements - 1;
    } catch (error) {
      toast.error("Delete ethnics error");
    }
  };

  handleCreateEthnics = async (value, history) => {
    try {
      const newEthnics = await createEthnics(value);
      toast.success("Thêm sản phẩm thành công");
      history.push("/category/ethnics");
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại");
    }
  };

  handleUpdateEthnics = async (value, history) => {
    try {
      const { data } = await editEthnics(value);

      this.ethnicsList = this.ethnicsList.map((ethnics) =>
        ethnics.id === data.id ? data : ethnics
      );
      toast.success("Sửa sản phẩm thành công");
      history.push("/category/ethnics");
    } catch (error) {
      toast.error("Sửa sản phẩm thất bại");
    }
  };

  handleChangePage = async (event, page) => {
    let searchObject = {
      pageIndex: page,
      pageSize: this.pageSize,
    };
    const { data } = await pagingEthnicities(searchObject);

    this.ethnicsList = data.content;
    this.page = data.number + 1;
  };

  handlePageSize = async (pagesize) => {
    this.pageSize = pagesize;
    this.handleEthnicsInitial();
  };
}

export default EthnicsStore;
