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
          allocDataSize: 0,
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
  }, []);

  return (
    <AddressContext.Provider value={accountState}>
      {children}
    </AddressContext.Provider>
  );
};
