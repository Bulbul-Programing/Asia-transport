import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { getUserInfo } from "@/service/Auth/getUserInfo";
import { TUser } from "@/types/User/TUserInfo";
import DashboardNavbarContent from "./DashboardNavbarContent";
const DashboardNavbar = async () => {
  const userInfo = await getUserInfo()
  const navItems = await getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;
