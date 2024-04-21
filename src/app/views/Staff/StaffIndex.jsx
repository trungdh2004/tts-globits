import { useStore } from "app/stores";
import React, { useEffect } from "react";

const StaffIndex = () => {
  const { staffStore } = useStore();

  useEffect(() => {
    if (!staffStore.countryList.length) {
      staffStore.handleCountryInitial();
    }
    if (!staffStore.ethnicsList.length) {
      staffStore.handleEthnicsInitial();
    }
    if (!staffStore.religionList.length) {
      staffStore.handleReligionInitial();
    }
  }, []);

  return <div>StaffIndex</div>;
};

export default StaffIndex;
