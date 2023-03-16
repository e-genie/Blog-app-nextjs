import React from "react";
import NavBar from "../navbar/NavBar";

type DashBoardLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: DashBoardLayoutProps) {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
