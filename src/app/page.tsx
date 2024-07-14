"use client";

import Button from "@/components/general/Button";
import Logo from "@/components/general/Logo";
import SearchBar from "@/components/general/SearchBar";
import { ClusterContext } from "@/lib/context/ClusterContext";
import { ConnectionContext } from "@/lib/context/ConnectionContext";
import formatNumber from "@/lib/utils/formatNumberReadable";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useContext } from "react";
import IncrementNumber from "@/components/general/IncrementNumber";
import Chart from "@/components/general/Chart";

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
      <SearchBar />
      <div className="mx-auto max-w-[1100px] flex flex-col gap-6 md:gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 mb-6 md:mb-10 gap-6 md:gap-10">
          <div className="flex flex-col gap-3 p-3 md:p-6 rounded-lg bg-cas-grey-foreground">
            <h1>Circulating Supply</h1>
            {clusterDetails?.supply && (
              <>
                <h1 className="">
                  <span className="text-3xl">
                    {formatNumber(
                      clusterDetails?.supply?.circulating / LAMPORTS_PER_SOL
                    )}
                  </span>
                  <span> / </span>
                  <span className="text-lg">
                    {formatNumber(
                      clusterDetails?.supply.total / LAMPORTS_PER_SOL
                    )}
                  </span>
                </h1>
                <h3>
                  <span className="font-medium">
                    {(
                      (clusterDetails?.supply?.circulating /
                        clusterDetails?.supply.total) *
                      100
                    ).toFixed(1)}
                    {"% "}
                  </span>
                  is circulating
                </h3>
              </>
            )}
          </div>
          <div className="flex flex-col gap-3 p-3 md:p-6 rounded-lg bg-cas-grey-foreground">
            <h1>Active Stake</h1>
            {clusterDetails?.stake && clusterDetails?.supply && (
              <>
                <h1 className="">
                  <span className="text-3xl">
                    {formatNumber(
                      clusterDetails?.stake.current.reduce(
                        (acc, curr) => acc + curr.activatedStake,
                        0
                      ) / LAMPORTS_PER_SOL
                    )}
                  </span>
                  <span> / </span>
                  <span className="text-lg">
                    {formatNumber(
                      clusterDetails?.supply.total / LAMPORTS_PER_SOL
                    )}
                  </span>
                </h1>
                <h3>
                  <span className="font-medium">Delinquent stake: </span>
                  {(
                    (clusterDetails?.stake.delinquent.reduce(
                      (acc, curr) => acc + curr.activatedStake,
                      0
                    ) /
                      clusterDetails?.supply.total) *
                    100
                  ).toFixed(1)}
                  {"% "}
                  is circulating
                </h3>
              </>
            )}
          </div>
        </div>
        <div className="bg-cas-grey-foreground rounded-2xl p-4 md:p-6 flex flex-col gap-3">
          <h1 className="font-semibold">Live Cluster Stats</h1>

          <div className="flex items-center justify-between border-b border-cas-grey-border py-2">
            <div className="text-sm">Slot</div>
            <div className="text-xs">
              {epochInfo?.absoluteSlot.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center justify-between border-b border-cas-grey-border py-2">
            <div className="text-sm">Block Height</div>
            <div className="text-xs">
              {epochInfo?.blockHeight?.toLocaleString()}
            </div>
          </div>
          {clusterDetails?.time && (
            <div className="flex items-center justify-between py-2 border-b border-cas-grey-border">
              <div className="text-sm">Cluster Time</div>
              <div className="text-xs">
                {new Date(clusterDetails.time * 1000).toUTCString()}
              </div>
            </div>
          )}
          <div className="flex items-center justify-between border-b border-cas-grey-border py-2">
            <div className="text-sm">Epoch</div>
            <div className="text-xs">{epochInfo?.epoch}</div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="text-sm">Epoch progress</div>
            {epochInfo?.slotsInEpoch && (
              <div className="text-xs">
                {(
                  (epochInfo?.slotIndex / epochInfo?.slotsInEpoch) *
                  100
                ).toFixed(1)}
                %
              </div>
            )}
          </div>
        </div>

        <div className="bg-cas-grey-foreground rounded-2xl p-4 md:p-6 flex flex-col gap-3">
          <h1 className="font-semibold">Live Transactions Stats</h1>
          <div className="flex items-center justify-between border-b border-cas-grey-border py-2">
            <div className="text-sm">Transaction Count</div>
            <div className="text-xs">
              {epochInfo?.transactionCount && (
                <IncrementNumber to={epochInfo?.transactionCount} speed={1} />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between border-b border-cas-grey-border py-2">
            <div className="text-sm">Transaction Per Second</div>
            <div className="text-xs">{clusterDetails.TPS[0]}</div>
          </div>
          <h1>TPS</h1>
          <Chart dataSetsData={clusterDetails.TPS.reverse()} />
        </div>
      </div>
    </div>
  );
}
