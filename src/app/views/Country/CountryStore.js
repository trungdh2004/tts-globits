import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import {
  createCountry,
  deleteCountry,
  editCountry,
  pagingCountries,
} from "./CountryService";
import { toast } from "react-toastify";

class CountryStore {
  countryList = [];
  page = 1;
  pageSize = 5;
  totalElements = 0;
  totalPages = 0;

  constructor() {
    makeObservable(this, {
      countryList: observable,
      page: observable,
      pageSize: observable,
      totalPages: observable,
      totalElements: observable,
      handleCountryInitial: action,
      handlePageSize: action,
      handleChangePage: action,
      handleDeleteCountryById: action,
      handleCreateCountry: action,
      handleUpdateCountry: action,
    });
  }

  handleCountryInitial = async () => {
    try {
      let searchObject = {
        pageIndex: 1,
        pageSize: this.pageSize,
      };
      const { data } = await pagingCountries(searchObject);

      this.countryList = data.content;
      this.totalElements = data.totalElements;
      this.page = data.number + 1;
      this.totalPages = data.totalPages;
    } catch (error) {}
  };

  handleDeleteCountryById = async (id) => {
    try {
      if (!id) throw new Error();
      await deleteCountry(id);

      this.countryList = this.countryList.filter(
        (country) => country.id !== id
      );
      toast.success("Xóa thành công");
      this.totalElements = this.totalElements - 1;
    } catch (error) {
      toast.error("Xóa thất bại hoặc sản phẩm bị ràng buộc");
    }
  };

  handleCreateCountry = async (value, history) => {
    try {
      const newCountry = await createCountry(value);
      toast.success("Thêm sản phẩm thành công");
      history.push("/category/country");
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại");
    }
  };

  handleUpdateCountry = async (value, history) => {
    try {
      const { data } = await editCountry(value);

      this.countryList = this.countryList.map((country) =>
        country.id === data.id ? data : country
      );
      toast.success("Sửa sản phẩm thành công");
      history.push("/category/country");
    } catch (error) {
      toast.error("Sửa sản phẩm thất bại");
    }
  };

  handleChangePage = async (event, page) => {
    let searchObject = {
      pageIndex: page,
      pageSize: this.pageSize,
    };
    const { data } = await pagingCountries(searchObject);

    this.countryList = data.content;
    this.page = data.number + 1;
  };

  handlePageSize = async (pagesize) => {
    this.pageSize = pagesize;
    this.handleCountryInitial();
  };
}

export default CountryStore;
