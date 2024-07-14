"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Connection,
  Supply,
  PublicKey,
  clusterApiUrl,
  AccountInfo,
  EpochInfo,
} from "@solana/web3.js";
import { ClusterContext } from "./ClusterContext";

interface ConnectionContext {
  connection?: Connection;
  epochInfo: EpochInfo | null;
  clusterDetails: ClusterDetails | null;
}

interface ClusterDetails {
  supply: Supply | null;
  time: number | null;
}

const INITIAL_STATE: ConnectionContext = {
  epochInfo: null,
  clusterDetails: null,
};

export const ConnectionContext =
  createContext<ConnectionContext>(INITIAL_STATE);

export const ConnectionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { selectedCluster } = useContext(ClusterContext);
  const [epochInfo, setEpochInfo] = useState<EpochInfo | null>(null);
  const [clusterDetails, setClusterDetails] = useState<ClusterDetails>({
    supply: null,
    time: null,
  });

  const [connection, setConnection] = useState(
    new Connection(clusterApiUrl(selectedCluster))
  );

  useEffect(() => {
    connection
      .getSupply()
      .then((supply) =>
        setClusterDetails((d) => ({ ...d, supply: supply.value }))
      );
    connection
      .getEpochInfo()
      .then((info) => {
        setEpochInfo(info);
        return info;
      })
      .then((info) => {
        connection.getBlockTime(info.absoluteSlot).then((time) => {
          setClusterDetails((d) => ({ ...d, time }));
        });
      });
  }, []);

  return (
    <ConnectionContext.Provider
      value={{ connection, clusterDetails, epochInfo }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};
