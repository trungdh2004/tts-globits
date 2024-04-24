import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const TimeSheetIndex = EgretLoadable({
  loader: () => import("./TimeSheetIndex"),
});
const TimeSheetAdd = EgretLoadable({
  loader: () => import("./TimeSheetAdd"),
});
const ProjectEdit = EgretLoadable({
  loader: () => import("./TimeSheetEdit"),
});

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/timeSheet",
    exact: true,
    component: TimeSheetIndex,
  },
  {
    path: ConstantList.ROOT_PATH + "category/timeSheet/add",
    exact: true,
    component: TimeSheetAdd,
  },
  {
    path: ConstantList.ROOT_PATH + "category/timeSheet/edit/:id",
    exact: true,
    component: ProjectEdit,
  },
];

export default Routes;
