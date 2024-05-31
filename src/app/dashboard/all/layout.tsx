import Provider from "@/components/shared/Provider";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default DashboardLayout;
