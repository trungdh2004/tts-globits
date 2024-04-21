import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const CountryIndex = EgretLoadable({
  loader: () => import("./CountryIndex"),
});
const CountryDetail = EgretLoadable({
  loader: () => import("./CountryDetail"),
});
const CountryAdd = EgretLoadable({
  loader: () => import("./CountryAdd"),
});
const ViewComponent = CountryIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/country",
    exact: true,
    component: ViewComponent,
  },
  {
    path: ConstantList.ROOT_PATH + "category/country/add",
    exact: true,
    component: CountryAdd,
  },
  {
    path: ConstantList.ROOT_PATH + "category/country/edit/:id",
    exact: true,
    component: CountryDetail,
  },
];

export default Routes;
