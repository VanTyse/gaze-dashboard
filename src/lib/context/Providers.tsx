import { ReactNode } from "react";
import { ClusterContextProvider } from "./ClusterContext";
import {
  ConnectionContext,
  ConnectionContextProvider,
} from "./ConnectionContext";
import { AddressContextProvider } from "./AddressContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ClusterContextProvider>
      <ConnectionContextProvider>
        <AddressContextProvider>{children}</AddressContextProvider>
      </ConnectionContextProvider>
    </ClusterContextProvider>
  );
}
