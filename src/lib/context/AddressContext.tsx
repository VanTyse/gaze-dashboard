"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ConnectionContext } from "./ConnectionContext";
import {
  ConfirmedSignatureInfo,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useParams } from "next/navigation";

interface AddressContext {
  pubKey: PublicKey | null;
  balance: number;
  allocDataSize: number;
  programId: PublicKey;
  executable: boolean;
  transactionHistory: ConfirmedSignatureInfo[];
}

export const programMap = {
  [SystemProgram.programId.toBase58()]: "System Program",
  Config1111111111111111111111111111111111111: "Config Program",
  Stake11111111111111111111111111111111111111: "Stake Program",
  Vote111111111111111111111111111111111111111: "Vote Program",
  AddressLookupTab1e1111111111111111111111111: "Address Lookup Table Program",
  BPFLoaderUpgradeab1e11111111111111111111111: "BPF Loader",
};

const INITIAL_STATE: AddressContext = {
  pubKey: null,
  balance: 0,
  allocDataSize: 0,
  programId: new PublicKey("11111111111111111111111111111111"),
  executable: false,
  transactionHistory: [],
};

export const AddressContext = createContext<AddressContext>(INITIAL_STATE);

export const AddressContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { connection } = useContext(ConnectionContext);
  const [accountState, setAccountState] =
    useState<AddressContext>(INITIAL_STATE);

  const { sig } = useParams();

  useEffect(() => {
    async function addressLookup() {
      // get address
      const pubKey = new PublicKey(sig);

      // get account info
      const accountInfo = await connection?.getAccountInfo(pubKey);

      if (accountInfo) {
        const accountContextData: AddressContext = {
          pubKey,
          balance: accountInfo?.lamports / LAMPORTS_PER_SOL,
          allocDataSize: accountInfo.data.length,
          executable: accountInfo.executable,
          programId: accountInfo.owner,
          transactionHistory: [],
        };

        // get transaction history
        const tx = await connection?.getSignaturesForAddress(pubKey);

        tx?.map((t) => {
          accountContextData.transactionHistory.push(t);
        });

        setAccountState(accountContextData);
      }
    }

    addressLookup();
  }, []);

  return (
    <AddressContext.Provider value={accountState}>
      {children}
    </AddressContext.Provider>
  );
};
