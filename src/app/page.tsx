"use client";

import Button from "@/components/general/Button";
import Logo from "@/components/general/Logo";
import { ClusterContext } from "@/lib/context/ClusterContext";
import { ConnectionContext } from "@/lib/context/ConnectionContext";
import formatNumber from "@/lib/utils/formatNumberReadable";
import { useContext } from "react";

export default function Page() {
  const { selectedCluster } = useContext(ClusterContext);
  const { epochInfo, clusterDetails } = useContext(ConnectionContext);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-10">
        <Logo />
        <Button variant="secondary" className="capitalize min-w-[120px]">
          {selectedCluster}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-6">
        <div className="flex flex-col gap-3 p-3 rounded-lg bg-cas-grey-foreground">
          <h1>Circulating Supply</h1>
          <h1 className="">
            {clusterDetails?.supply?.circulating && (
              <span>{formatNumber(clusterDetails?.supply?.circulating)}</span>
            )}
          </h1>
        </div>
        <div></div>
      </div>
      <div className="bg-cas-grey-foreground rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-cas-grey-border py-2">
          <div className="text-sm">Slot</div>
          <div className="text-xs">{epochInfo?.absoluteSlot}</div>
        </div>
        <div className="flex items-center justify-between border-b border-cas-grey-border py-2">
          <div className="text-sm">Block Height</div>
          <div className="text-xs">{epochInfo?.blockHeight}</div>
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="text-sm">Slot</div>
          <div className="text-xs">{epochInfo?.absoluteSlot}</div>
        </div>
      </div>
    </div>
  );
}
