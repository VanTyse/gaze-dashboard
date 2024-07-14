import React from "react";

function Page() {
  return (
    <main>
      <div className="mx-auto max-w-[1100px]">
        <div className="bg-cas-grey-foreground rounded-2xl p-4 md:p-6 flex flex-col gap-3">
          <h1 className="font-semibold">Overview</h1>

          <div className="flex items-center justify-between border-b border-cas-grey-border py-2">
            <div className="text-sm">Address</div>
            <div className="text-xs"></div>
          </div>
          <div className="flex items-center justify-between border-b border-cas-grey-border py-2">
            <div className="text-sm">Balance</div>
            <div className="text-xs"></div>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-cas-grey-border">
            <div className="text-sm">Allocated Data Size</div>
            <div className="text-xs"></div>
          </div>

          <div className="flex items-center justify-between border-b border-cas-grey-border py-2">
            <div className="text-sm">Assigned Program Id</div>
            <div className="text-xs"></div>
          </div>
          <div className="flex items-center justify-between border-b border-cas-grey-border py-2">
            <div className="text-sm">Executable</div>
            <div className="text-xs"></div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
