import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { getUserInfo } from "@/service/Auth/getUserInfo";
import { TUser } from "@/types/User/TUserInfo";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { NavSection } from "@/types/Dashboard/dashboardNavItem";

const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as TUser;

  const navItems: NavSection[] = await getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;
