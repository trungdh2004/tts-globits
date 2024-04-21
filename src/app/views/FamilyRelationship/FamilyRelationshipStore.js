import { action, makeObservable, observable } from "mobx";

import { toast } from "react-toastify";
import {
  createFamilyRelationship,
  deleteFamilyRelationship,
  editFamilyRelationship,
  pagingFamilyRelationship,
} from "./FamilyRelationshipService";

class FamilyRelationshipStore {
  familyRelationshipList = [];
  page = 1;
  pageSize = 5;
  totalElements = 0;
  totalPages = 0;

  constructor() {
    makeObservable(this, {
      familyRelationshipList: observable,
      page: observable,
      pageSize: observable,
      totalPages: observable,
      totalElements: observable,
      handleFamilyRelationshipInitial: action,
      handlePageSize: action,
      handleChangePage: action,
      handleDeleteFamilyRelationshipById: action,
      handleCreateFamilyRelationship: action,
      handleUpdateFamilyRelationship: action,
    });
  }

  handleFamilyRelationshipInitial = async () => {
    try {
      let searchObject = {
        pageIndex: 1,
        pageSize: this.pageSize,
      };
      const { data } = await pagingFamilyRelationship(searchObject);

      this.familyRelationshipList = data.content;
      this.totalElements = data.totalElements;
      this.page = data.number + 1;
      this.totalPages = data.totalPages;
    } catch (error) {}
  };

  handleDeleteFamilyRelationshipById = async (id) => {
    try {
      if (!id) throw new Error();
      await deleteFamilyRelationship(id);

      this.familyRelationshipList = this.familyRelationshipList.filter(
        (familyRelationship) => familyRelationship.id !== id
      );
      toast.success("Delete familyRelationship successfully");
      this.totalElements = this.totalElements - 1;
    } catch (error) {
      toast.error("Delete familyRelationship error");
    }
  };

  handleCreateFamilyRelationship = async (value, history) => {
    try {
      const newFamilyRelationship = await createFamilyRelationship(value);
      toast.success("Thêm sản phẩm thành công");
      history.push("/category/familyRelationship");
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại");
    }
  };

  handleUpdateFamilyRelationship = async (value, history) => {
    try {
      const { data } = await editFamilyRelationship(value);

      this.familyRelationshipList = this.familyRelationshipList.map(
        (familyRelationship) =>
          familyRelationship.id === data.id ? data : familyRelationship
      );
      toast.success("Sửa sản phẩm thành công");
      history.push("/category/familyRelationship");
    } catch (error) {
      toast.error("Sửa sản phẩm thất bại");
    }
  };

  handleChangePage = async (event, page) => {
    let searchObject = {
      pageIndex: page,
      pageSize: this.pageSize,
    };
    const { data } = await pagingFamilyRelationship(searchObject);

    this.familyRelationshipList = data.content;
    this.page = data.number + 1;
  };

  handlePageSize = async (pagesize) => {
    this.pageSize = pagesize;
    this.handleFamilyRelationshipInitial();
  };
}

export default FamilyRelationshipStore;
