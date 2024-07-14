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
  clusterApiUrl,
  VoteAccountStatus,
  EpochInfo,
} from "@solana/web3.js";
import { ClusterContext } from "./ClusterContext";
import { getAverageTPSForMinute } from "../utils/calculateAverageTPS";

interface ConnectionContext {
  connection?: Connection;
  epochInfo: EpochInfo | null;
  clusterDetails: ClusterDetails;
}

interface ClusterDetails {
  supply: Supply | null;
  time: number | null;
  stake: VoteAccountStatus | null;
  TPS: number[];
}

const INITIAL_CLUSTER_DETAILS = {
  supply: null,
  time: null,
  stake: null,
  TPS: [],
};

const INITIAL_STATE: ConnectionContext = {
  epochInfo: null,
  clusterDetails: INITIAL_CLUSTER_DETAILS,
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
  const [clusterDetails, setClusterDetails] = useState<ClusterDetails>(
    INITIAL_CLUSTER_DETAILS
  );

  const [connection, setConnection] = useState(
    new Connection(clusterApiUrl(selectedCluster))
  );

  useEffect(() => {
    getAverageTPSForMinute(connection).then((TPS) =>
      setClusterDetails((d) => ({ ...d, TPS }))
    );

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

    connection
      .getVoteAccounts()
      .then((stake) => setClusterDetails((d) => ({ ...d, stake })));
  }, []);

  return (
    <ConnectionContext.Provider
      value={{ connection, clusterDetails, epochInfo }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};
