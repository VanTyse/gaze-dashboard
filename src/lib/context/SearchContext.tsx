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
import { PublicKey } from "@solana/web3.js";

interface SearchResult {
  type: "account" | "program" | "token" | "transaction" | "slot" | "block";
  results: string[];
}
interface SearchContext {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>> | null;
  searchResults: SearchResult[];
}

const INITIAL_STATE: SearchContext = {
  searchQuery: "",
  setSearchQuery: null,
  searchResults: [],
};

export const SearchContext = createContext<SearchContext>(INITIAL_STATE);

export const SearchContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const { connection } = useContext(ConnectionContext);

  useEffect(() => {
    const pubKey = new PublicKey(searchQuery);

    // search for an account
    if (searchQuery.length === 44 && pubKey.toBase58() === searchQuery) {
      const accountInfo = connection?.getAccountInfo(pubKey);

      if (accountInfo !== null) {
        setSearchResults((r) => [
          ...r,
          { type: "account", results: [searchQuery] },
        ]);
      }
    }

    // search for a transaction
    if (searchQuery.length === 88) {
      const txInfo = connection?.getParsedTransaction(searchQuery);

      if (txInfo !== null) {
        setSearchResults((r) => [
          ...r,
          { type: "transaction", results: [searchQuery] },
        ]);
      }
    }

    // search for tokens

    // search for programs

    // search for blocks

    // search for epochs
  }, [searchQuery]);

  return (
    <SearchContext.Provider
      value={{ searchQuery, searchResults, setSearchQuery }}
    >
      {children}
    </SearchContext.Provider>
  );
};
