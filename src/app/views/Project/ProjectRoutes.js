import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const ProjectIndex = EgretLoadable({
  loader: () => import("./ProjectIndex"),
});
const ProjectAdd = EgretLoadable({
  loader: () => import("./ProjectAdd"),
});
const ProjectEdit = EgretLoadable({
  loader: () => import("./ProjectEdit"),
});

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/project",
    exact: true,
    component: ProjectIndex,
  },
  {
    path: ConstantList.ROOT_PATH + "category/project/add",
    exact: true,
    component: ProjectAdd,
  },
  {
    path: ConstantList.ROOT_PATH + "category/project/edit/:id",
    exact: true,
    component: ProjectEdit,
  },
];

export default Routes;
