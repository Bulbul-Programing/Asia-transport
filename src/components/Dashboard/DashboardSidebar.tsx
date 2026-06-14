import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import type { UserRole as AuthUserRole } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { getUserInfo } from "@/service/Auth/getUserInfo";
import { TUser } from "@/types/User/TUserInfo";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { NavSection } from "@/types/Dashboard/dashboardNavItem";

const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as TUser;
  const userRole = userInfo.role as AuthUserRole;

  const navItems: NavSection[] = await getNavItemsByRole(userRole);
  const dashboardHome = getDefaultDashboardRoute(userRole);

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;
