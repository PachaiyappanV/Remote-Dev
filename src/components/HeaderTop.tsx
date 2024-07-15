import { ReactNode } from "react";

const HeaderTop = ({ children }: { children: ReactNode }) => {
  return <div className="header__top">{children}</div>;
};

export default HeaderTop;
