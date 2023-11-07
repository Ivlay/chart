import { Risk } from '../types/risk';

export const getColorRisk = (risk: Risk) => {
  switch (risk) {
    case Risk.low:
      return '#20ba81';
    case Risk.mid:
      return '#edc240';
    case Risk.high:
      return '#ea3943';
  }
};
