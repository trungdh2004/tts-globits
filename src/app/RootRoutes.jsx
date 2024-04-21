import React from "react";
import { Redirect } from "react-router-dom";
import sessionRoutes from "./views/sessions/SessionRoutes";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";
// import userRoutes from "./views/User/UserRoutes";
// import roleRoutes from "./views/Role/RoleRoutes";
import ConstantList from "./appConfig";
import countryRoutes from "./views/Country/CountryRoutes";
import EthnicsRoutes from "./views/Ethnics/EthnicsRoutes";
import ReligionRoutes from "./views/Religion/ReligionRoutes";
import DepartmentRoutes from "./views/Department/DepartmentRoutes";
import FamilyRelationshipRoutes from "./views/FamilyRelationship/FamilyRelationshipRoutes";
import StaffRoutes from "./views/Staff/StaffRoutes";

const redirectRoute = [
  {
    path: ConstantList.ROOT_PATH,
    exact: true,
    component: () => <Redirect to={ConstantList.HOME_PAGE} />, //Luôn trỏ về HomePage được khai báo trong appConfig
  },
];

const errorRoute = [
  {
    component: () => <Redirect to={ConstantList.ROOT_PATH + "session/404"} />,
  },
];

const routes = [
  ...sessionRoutes,
  ...dashboardRoutes,
  ...redirectRoute,
  ...DepartmentRoutes,
  ...EthnicsRoutes,
  ...ReligionRoutes,
  ...FamilyRelationshipRoutes,
  ...StaffRoutes,
  // ...userRoutes,
  // ...roleRoutes,
  ...countryRoutes,
  ...errorRoute,
];

export default routes;
