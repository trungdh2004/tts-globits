import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const EthnicsIndex = EgretLoadable({
  loader: () => import("./EthnicsIndex"),
});
const EthnicsAdd = EgretLoadable({
  loader: () => import("./EthnicsAdd"),
});
const EthnicsEdit = EgretLoadable({
  loader: () => import("./EthnicsEdit"),
});
const ViewComponent = EthnicsIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/ethnics",
    exact: true,
    component: ViewComponent,
  },
  {
    path: ConstantList.ROOT_PATH + "category/ethnics/add",
    exact: true,
    component: EthnicsAdd,
  },
  {
    path: ConstantList.ROOT_PATH + "category/ethnics/edit/:id",
    exact: true,
    component: EthnicsEdit,
  },
];

export default Routes;
