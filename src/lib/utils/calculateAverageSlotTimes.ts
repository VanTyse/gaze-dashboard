import { Connection } from "@solana/web3.js";

export async function getAverageSlotTimes(
  connection: Connection,
  currentSlot: number
) {
  const slotsPerMinute = 10;
  //   const slotsPerHour = slotsPerMinute * 60;

  async function calculateAverageSlotTime(startSlot: number, endSlot: number) {
    const averages: number[] = [];

    for (let slot = startSlot; slot <= endSlot; slot += 2) {
      const blockTime1 = await connection.getBlockTime(slot);
      const blockTime2 = await connection.getBlockTime(slot + 1);

      console.log(blockTime1);

      if (blockTime1 !== null && blockTime2 !== null) {
        const averageInMS =
          (blockTime2 - blockTime1 > 0 ? blockTime2 - blockTime1 : 0) * 1000;
        averages.push(averageInMS);
      }
    }

    if (averages.length > 1) {
      const averageDuration =
        averages.reduce((acc, curr) => acc + curr, 0) / averages.length;
      return averageDuration;
    }

    return null;
  }

  const oneMinuteAverage = await calculateAverageSlotTime(
    currentSlot - slotsPerMinute,
    currentSlot
  );
  //   const oneHourAverage = await calculateAverageSlotTime(
  //     currentSlot - slotsPerHour,
  //     currentSlot
  //   );

  if (oneMinuteAverage !== null) {
    console.log(`1-Minute Average Slot Time: ${oneMinuteAverage} MS`);
  } else {
    console.log("Unable to calculate 1-minute average slot time.");
  }
}
