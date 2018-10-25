const fakeStockData = [
  {
    symbol: "CTRN:IND",
    name: "NASDAQ Transportation Index",
    currency: "USD",
    closingPrice: 4823.36,
    price: 4924.54
  },
  {
    symbol: "SML:IND",
    name: "S&P Small Cap 600 Index",
    currency: "USD",
    closingPrice: 954.45,
    price: 920.99
  },
  {
    symbol: "RTY:IND",
    name: "Russell 2000 Index",
    currency: "USD",
    closingPrice: 1468.7,
    price: 1499
  },
  {
    symbol: "NBI:IND",
    name: "Nasdaq Biotechnology Index",
    currency: "USD",
    closingPrice: 3216.5,
    price: 3685.11
  },
  {
    symbol: "TRAN:IND",
    name: "Dow Jones Transportation Average",
    currency: "USD",
    closingPrice: 9905.7,
    price: 10001.3
  },
  {
    symbol: "AXX:IND",
    name: "FTSE AIM All Share Index",
    currency: "GBP",
    closingPrice: 965,
    price: 973.79
  },
  {
    symbol: "UKX:IND",
    name: "FTSE 100 Index",
    currency: "GBP",
    closingPrice: 6962.98,
    price: 7002.15
  },
  {
    symbol: "ASX:IND",
    name: "FTSE All-Share Index",
    currency: "GBP",
    closingPrice: 3815.79,
    price: 3835.68
  },
  {
    symbol: "SPEURO:IND",
    name: "S&P Europe 350 GICS Level Sector MFM Index",
    currency: "EUR",
    closingPrice: 1433.56,
    price: 1430
  },
  {
    symbol: "SPEU:IND",
    name: "S&P Europe Economic Sectors GICS Index",
    currency: "EUR",
    closingPrice: 1468.7,
    price: 1460
  }
];

const _shares = new WeakMap();

class ShareLocalService {
  constructor() {
    _shares.set(this, fakeStockData);
    this._listeners = [];

    setInterval(this._tick, 300);
  }

  getUserStocks = () => {
    return _shares.get(this);
  };

  addStockListener = listener => {
    this._listeners.push(listener);
  };

  removeStockListner = listener => {
    this._listeners = this.listener.filter(item => item !== listener);
  };

  _updateStockPrice = (index, symbol, price) => {
    _shares.get(this)[index].price = price;
    this._listeners.forEach(listener => listener({ index, symbol, price }));
  };

  _tick = () => {
    _shares.get(this).forEach((share, index) => {
      const shouldUpdate = Math.random() > 0.3;
      const currentPrice = share.price;
      if (shouldUpdate) {
        const tick = Math.max(0.01, currentPrice * 0.05).toFixed(2);
        let nextPrice = currentPrice + (Math.random() * 2 - 1) * tick;

        if (!nextPrice) nextPrice = currentPrice;
        this._updateStockPrice(
          index,
          share.symbol,
          Number.parseFloat(nextPrice).toFixed(2)
        );
      }
    });
  };
}

export default ShareLocalService;
