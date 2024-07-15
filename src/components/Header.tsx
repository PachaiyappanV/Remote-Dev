import { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
  return <header className="header">{children}</header>;
}
