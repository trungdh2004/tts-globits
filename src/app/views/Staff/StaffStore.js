import { action, makeAutoObservable, observable } from "mobx";
import { pagingEthnicities } from "../Ethnics/EthnicsService";
import { pagingReligions } from "../Religion/ReligionService";
import { pagingCountries } from "../Country/CountryService";
import { deleteStaff, getAllDepartment, getStaffs } from "./StaffService";
import { pagingFamilyRelationship } from "../FamilyRelationship/FamilyRelationshipService";
import { toast } from "react-toastify";

class StaffStore {
  // call xong lưu store để khi chuyển trang sẽ không bị call api lại
  countryList = [];
  ethnicsList = [];
  religionList = [];
  departmentList = [];
  familyRelationsList = [];
  pageSize = 20;
  // staff
  staffList = [];
  page = 1;
  pageSizeStaff = 5;
  totalElements = 0;
  totalPages = 0;

  constructor() {
    makeAutoObservable(this, {
      countryList: observable,
      ethnicsList: observable,
      religionList: observable,
      departmentList: observable,
      familyRelationsList: observable,
      handleGetAll: action,
      handleCountryInitial: action,
      handleEthnicsInitial: action,
      handleReligionInitial: action,
      handleFamilyRelationInitial: action,
    });
  }
  // CRUD staff
  handleStaffInitial = async () => {
    try {
      let obj = {
        pageIndex: this.page,
        pageSize: this.pageSizeStaff,
      };
      const { data } = await getStaffs(obj);

      this.staffList = data.content;
      this.totalElements = data.totalElements;
      this.page = data.number + 1;
      this.totalPages = data.totalPages;
    } catch (error) {
      toast.error("Lỗi không thể gọi giá trị");
      this.staffList = [];
    }
  };

  handleDeleteStaffById = async (id) => {
    try {
      if (!id) throw new Error();
      await deleteStaff(id);

      this.staffList = this.staffList.filter((staff) => staff.id !== id);
      toast.success("Xóa thành công");
      this.totalElements = this.totalElements - 1;
    } catch (error) {
      toast.error("Delete ethnics error");
    }
  };

  // handleCreateEthnics = async (value, history) => {
  //   try {
  //     const newEthnics = await createEthnics(value);
  //     toast.success("Thêm sản phẩm thành công");
  //     history.push("/category/ethnics");
  //   } catch (error) {
  //     toast.error("Thêm sản phẩm thất bại");
  //   }
  // };

  // handleUpdateEthnics = async (value, history) => {
  //   try {
  //     const { data } = await editEthnics(value);

  //     this.ethnicsList = this.ethnicsList.map((ethnics) =>
  //       ethnics.id === data.id ? data : ethnics
  //     );
  //     toast.success("Sửa sản phẩm thành công");
  //     history.push("/category/ethnics");
  //   } catch (error) {
  //     toast.error("Sửa sản phẩm thất bại");
  //   }
  // };

  handleChangePage = async (event, page) => {
    let obj = {
      pageIndex: page,
      pageSize: this.pageSizeStaff,
    };
    const { data } = await getStaffs(obj);

    this.staffList = data.content;
    this.page = data.number + 1;
  };

  handlePageSize = async (pagesize) => {
    this.pageSizeStaff = pagesize;
    this.handleEthnicsInitial();
  };

  //  get all employees
  handleCountryInitial = async () => {
    const list = await this.handleGetAll(pagingCountries);
    this.countryList = list;
  };
  handleEthnicsInitial = async () => {
    const list = await this.handleGetAll(pagingEthnicities);
    this.ethnicsList = list;
  };
  handleReligionInitial = async () => {
    const list = await this.handleGetAll(pagingReligions);
    this.religionList = list;
  };
  handleFamilyRelationInitial = async () => {
    const list = await this.handleGetAll(pagingFamilyRelationship);
    this.familyRelationsList = list;
  };
  handleDepartmentListInitial = async () => {
    const { data } = await getAllDepartment();
    console.log(data);
    this.departmentList = data;
  };

  handleGetAll = async (action) => {
    try {
      let list = [];
      const { data } = await action({
        pageIndex: 1,
        pageSize: this.pageSize,
      });
      list = list.concat(data.content);
      if (data.totalPages > 1) {
        for (let i = 2; i <= data.totalPages; i++) {
          const { data } = await action({
            pageIndex: i,
            pageSize: 20,
          });
          list = list.concat(data.content);
        }
      }

      return list;
    } catch (error) {
      return [];
    }
  };
}

export default StaffStore;
