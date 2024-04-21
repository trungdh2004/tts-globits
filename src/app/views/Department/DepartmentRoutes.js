import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";

const DepartmentIndex = EgretLoadable({
  loader: () => import("./DepartmentIndex"),
});
const DepartmentAdd = EgretLoadable({
  loader: () => import("./DepartmentAdd.jsx"),
});
const DepartmentEDit = EgretLoadable({
  loader: () => import("./DepartmentEdit.jsx"),
});
const ViewComponent = DepartmentIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/department",
    exact: true,
    component: ViewComponent,
  },
  {
    path: ConstantList.ROOT_PATH + "category/department/add",
    exact: true,
    component: DepartmentAdd,
  },
  {
    path: ConstantList.ROOT_PATH + "category/department/edit/:id",
    exact: true,
    component: DepartmentEDit,
  },
];

export default Routes;
