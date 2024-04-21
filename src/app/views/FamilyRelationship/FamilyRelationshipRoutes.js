import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";

const FamilyRelationshipIndex = EgretLoadable({
  loader: () => import("./FamilyRelationshipIndex"),
});
const FamilyRelationshipAdd = EgretLoadable({
  loader: () => import("./FamilyRelationshipAdd"),
});
const FamilyRelationshipEdit = EgretLoadable({
  loader: () => import("./FamilyRelationshipEdit"),
});
const ViewComponent = FamilyRelationshipIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/familyRelationship",
    exact: true,
    component: ViewComponent,
  },
  {
    path: ConstantList.ROOT_PATH + "category/familyRelationship/add",
    exact: true,
    component: FamilyRelationshipAdd,
  },
  {
    path: ConstantList.ROOT_PATH + "category/familyRelationship/edit/:id",
    exact: true,
    component: FamilyRelationshipEdit,
  },
];

export default Routes;
