import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const StaffIndex = EgretLoadable({
  loader: () => import("./CountryIndex"),
});

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/project",
    exact: true,
    component: StaffIndex,
  },
];

export default Routes;
