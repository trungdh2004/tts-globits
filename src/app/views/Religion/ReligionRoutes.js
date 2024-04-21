import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const ReligionIndex = EgretLoadable({
  loader: () => import("./ReligionIndex"),
});
const ReligionEdit = EgretLoadable({
  loader: () => import("./ReligionEdit"),
});
const ReligionAdd = EgretLoadable({
  loader: () => import("./ReligionAdd"),
});
const ViewComponent = ReligionIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/religion",
    exact: true,
    component: ViewComponent,
  },
  {
    path: ConstantList.ROOT_PATH + "category/religion/add",
    exact: true,
    component: ReligionAdd,
  },
  {
    path: ConstantList.ROOT_PATH + "category/religion/edit/:id",
    exact: true,
    component: ReligionEdit,
  },
];

export default Routes;
