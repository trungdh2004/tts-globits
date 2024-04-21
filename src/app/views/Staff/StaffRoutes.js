import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const StaffIndex = EgretLoadable({
  loader: () => import("./StaffIndex"),
});
const StaffAdd = EgretLoadable({
  loader: () => import("./StaffAdd"),
});

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/staff",
    exact: true,
    component: StaffIndex,
  },
  {
    path: ConstantList.ROOT_PATH + "category/staff/add",
    exact: true,
    component: StaffAdd,
  },
];

export default Routes;
