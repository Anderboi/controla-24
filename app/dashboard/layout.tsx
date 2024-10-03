import React from "react";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-y-6 sm:mt-6">
      <div className="sm:container grid flex-1 //md:grid-cols-[200px_1fr] gap-4 ">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
