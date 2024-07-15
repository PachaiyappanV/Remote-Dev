import { ReactNode } from "react";

export default function Sidebar({ children }: { children: ReactNode }) {
  return <div className="sidebar">{children}</div>;
}
