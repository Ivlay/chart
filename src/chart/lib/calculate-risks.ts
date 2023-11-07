import { ICurrentPrecip } from '../model/current-precip.interface';
import { IHistoricalAverage } from '../model/historical-average.interface';
import { Risk } from '../types/risk';

export const calculateRisks = (
  historicalAverages: IHistoricalAverage[],
  currentPrecips: ICurrentPrecip[]
) => {
  const risksResult: Risk[] = [];

  for (let i = 0; i < historicalAverages.length; i++) {
    const nextCurrentReciep = currentPrecips[i + 1];
    const nextHistoricalAverage = historicalAverages[i + 1];

    if (!nextCurrentReciep) {
      risksResult.push(risksResult[risksResult.length - 1]);
      continue;
    }
    if (nextCurrentReciep.value >= nextHistoricalAverage.value + 1) {
      risksResult.push(Risk.high);
      continue;
    }
    // chack on mid risk
    if (
      nextCurrentReciep.value < nextHistoricalAverage.value + 1 &&
      nextCurrentReciep.value > nextHistoricalAverage.max
    ) {
      risksResult.push(Risk.mid);
      continue;
    }
    risksResult.push(Risk.low);
  }
  return risksResult;
};
