import { ReactNode } from "react";

const SidebarTop = ({ children }: { children: ReactNode }) => {
  return <div className="sidebar__top">{children}</div>;
};

export default SidebarTop;
