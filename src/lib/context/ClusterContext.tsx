"use client";

import { createContext, ReactNode, useState } from "react";
import { Cluster } from "@solana/web3.js";

interface ClusterContext {
  selectedCluster: Cluster;
}

const INITIAL_STATE: ClusterContext = {
  selectedCluster: "mainnet-beta",
};

export const ClusterContext = createContext<ClusterContext>(INITIAL_STATE);

export const ClusterContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedCluster, setSelectedCluster] = useState(
    INITIAL_STATE.selectedCluster
  );
  return (
    <ClusterContext.Provider value={{ selectedCluster }}>
      {children}
    </ClusterContext.Provider>
  );
};
