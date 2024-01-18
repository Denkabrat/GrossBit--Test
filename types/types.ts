interface CurrencyData {
    category: string;
    circulatingSupply: number;
    id: number;
    lastUpdated: string;
    maxSupply: number;
    name: string;
    rank: number;
    slug: string;
    symbol: string;
    tokens: [];
    totalSupply: number;
    type: string;
    options:[];
    values: {
      USD: {
        high24h: 43505.00524572065;
        low24h: 42220.62292847407;
        marketCap: 837125627776.8292;
        percentChange3m: 50.7186;
        percentChange6m: 42.7127;
        percentChange7d: -6.28;
        percentChange24h: -0.2514;
        percentChange30d: 3.3828;
        price: 42708.95281919076;
        volume24h: 10574816395;
      };
    };
    volume24hBase: number;
  }

export interface IAllCurrencies {
    data: CurrencyData[];
    meta: {
      count: number;
    };
    status: {
      time: string;
      success: boolean;
      code: number;
      message: string;
      responseTime: number;
      creditsCost: number;
    };
  }

export interface CurrencyConverterProps{
    allCurrencies:IAllCurrencies;
}

export interface SelectedCoin {
  price: number;
  symbol: string;
}
export interface IIconsProps {
  id: string;
}
