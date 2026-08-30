export interface EstimatorOrderDetails {
  cakeType: string;
  cakeTypeOther?: string;
  cakeSize: string;
  icingType: string;
  icingTypeOther?: string;
  occasion: string;
  occasionOther?: string;
  colors: string;
  wordsOnCake: string;
  filling: string;
  addCupcakes: boolean;
  addMacarons: boolean;
  estimatedTotal: number;
  marketRateAdjustment: number;
  lastSyncedAt: string;
}
