import { action, makeAutoObservable, observable } from "mobx";
import { pagingEthnicities } from "../Ethnics/EthnicsService";
import { pagingReligions } from "../Religion/ReligionService";
import { pagingCountries } from "../Country/CountryService";

class StaffStore {
  countryList = [];
  ethnicsList = [];
  religionList = [];
  pageSize = 20;

  constructor() {
    makeAutoObservable(this, {
      countryList: observable,
      paseCountry: observable,
      handleGetAll: action,
      handleCountryInitial: action,
      handleEthnicsInitial: action,
      handleReligionInitial: action,
    });
  }

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
          const { data } = await pagingCountries({
            pageIndex: i,
            pageSize: 20,
          });
          list = list.concat(data.content);
        }
      }

      return list;
    } catch (error) {}
  };
}

export default StaffStore;
