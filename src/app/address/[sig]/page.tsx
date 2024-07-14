"use client";

import Logo from "@/components/general/Logo";
import React, { useContext } from "react";
import TransactionTable from "./page_components/TransactionTable";
import { AddressContext, programMap } from "@/lib/context/AddressContext";
import Link from "next/link";

function Page() {
  const {
    pubKey,
    allocDataSize,
    balance,
    transactionHistory,
    programId,
    executable,
  } = useContext(AddressContext);

  return (
    <main className="p-8">
      <Link href={"/"} className="mb-10">
        <Logo />
      </Link>
      <div className="mx-auto max-w-[1100px] flex flex-col gap-6 md:gap-10">
        <div className="bg-cas-grey-foreground rounded-2xl p-4 md:p-6 flex flex-col gap-3">
          <h1 className="font-semibold">Overview</h1>

          {pubKey ? (
            <div className="flex items-center justify-between border-b border-cas-grey-border py-2">
              <div className="text-sm">Address</div>
              <div className="text-xs">{pubKey.toBase58()}</div>
            </div>
          ) : null}
          <div className="flex items-center justify-between border-b border-cas-grey-border py-2">
            <div className="text-sm">Balance</div>
            <div className="text-xs text-cas-primary-teal">{balance}</div>
          </div>

          {allocDataSize ? (
            <div className="flex items-center justify-between py-2 border-b border-cas-grey-border">
              <div className="text-sm">{allocDataSize}</div>
              <div className="text-xs">0</div>
            </div>
          ) : null}

          {
            <div className="flex items-center justify-between border-b border-cas-grey-border py-2">
              <div className="text-sm">Assigned Program Id</div>
              <div className="text-xs">{programMap[programId.toString()]}</div>
            </div>
          }
          <div className="flex items-center justify-between py-2">
            <div className="text-sm">Executable</div>
            <div className="text-xs">{executable ? "Yes" : "No"}</div>
          </div>
        </div>
        <TransactionTable transactions={transactionHistory} />
      </div>
    </main>
  );
}

export default Page;
