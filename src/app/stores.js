import { createContext, useContext } from "react";
import CountryStore from "./views/Country/CountryStore";
import EthnicsStore from "./views/Ethnics/EthnicsStore";
import ReligionStore from "./views/Religion/ReligionStore";
import FamilyRelationshipStore from "./views/FamilyRelationship/FamilyRelationshipStore";
import StaffStore from "./views/Staff/StaffStore";

export const store = {
  countryStore: new CountryStore(),
  ethnicsStore: new EthnicsStore(),
  regilionStore: new ReligionStore(),
  familyRelationship: new FamilyRelationshipStore(),
  staffStore: new StaffStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
