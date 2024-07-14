import Logo from "@/components/general/Logo";
import React from "react";

function Page() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-10">
        <Logo />
      </div>
      <div className="mx-auto max-w-[1100px] flex flex-col gap-6 md:gap-10"></div>
    </div>
  );
}

export default Page;
