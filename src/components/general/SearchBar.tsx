"use client";

import { useContext, useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { ConnectionContext } from "@/lib/context/ConnectionContext";
import { useRouter } from "next/router";
import Link from "next/link";

interface SearchResult {
  type: "account" | "program" | "token" | "transaction" | "slot" | "block";
  results: string[];
  url: string;
}

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const { connection } = useContext(ConnectionContext);

  useEffect(() => {
    try {
      if (searchQuery.length) {
        // search for an account
        if (searchQuery.length === 44) {
          const pubKey = new PublicKey(searchQuery);
          const accountInfo = connection?.getAccountInfo(pubKey);

          if (accountInfo) {
            setSearchResults((r) => [
              ...r,
              {
                type: "account",
                results: [searchQuery],
                url: `/address/${searchQuery}`,
              },
            ]);
          }
        }

        // search for a transaction
        if (searchQuery.length === 88) {
          const txInfo = connection?.getSignatureStatus(searchQuery);

          if (txInfo) {
            setSearchResults((r) => [
              ...r,
              {
                type: "transaction",
                results: [searchQuery],
                url: `/tx/${searchQuery}`,
              },
            ]);
          }
        }

        // search for tokens

        // search for programs

        // search for blocks

        // search for epochs
      }
    } catch (error) {
      console.log(error);
    }
  }, [searchQuery]);

  return (
    <div className=" mb-10">
      <input
        type="text"
        className="w-full px-3 py-2 mb-2 rounded-md bg-cas-primary"
        placeholder="Search for blocks, accounts, transactions, programs, and tokens"
        value={searchQuery}
        onChange={(e) => setSearchQuery?.(e.target.value)}
      />
      {searchQuery && (
        <div className="px-3 py-2 bg-zinc-800 rounded-md">
          {searchResults.length ? (
            <div className="">
              {searchResults.map(({ results, type, url }, ii) => (
                <div key={ii}>
                  <h2 className="text-xs uppercase tracking-wide text-zinc-300 mb-1">
                    {type}
                  </h2>
                  <Link
                    href={url}
                    className="px-2 block rounded-md py-1 hover:bg-zinc-600 transition truncate hover:cursor-pointer"
                  >
                    {results[0]}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">No results</div>
          )}
        </div>
      )}
    </div>
  );
}
