import { ReactNode } from "react";
import { ClusterContextProvider } from "./ClusterContext";
import {
  ConnectionContext,
  ConnectionContextProvider,
} from "./ConnectionContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ClusterContextProvider>
      <ConnectionContextProvider>{children}</ConnectionContextProvider>
    </ClusterContextProvider>
  );
}
