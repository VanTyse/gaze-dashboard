import { Connection } from "@solana/web3.js";

export async function getAverageTPSForMinute(connection: Connection) {
  const samples = await connection.getRecentPerformanceSamples(30);

  const averageTPS = samples.map((sample) =>
    Math.round(sample.numTransactions / sample.samplePeriodSecs)
  );

  return averageTPS;
}
