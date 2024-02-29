import { makeAutoObservable } from "mobx";
import axios from "axios";
class CryptoStore {
  bitcoinValue = null;
  usdtValue = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Action to fetch Bitcoin value from an API
  fetchBitcoinValue = async () => {
    const response = await axios('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    
    this.setBitcoinValue(response.data.bitcoin.usd);
  };

  // Action to fetch USDT value from an API
  fetchUsdtValue = async () => {
    const data = await axios('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd');
    
    this.setUsdtValue(data.data.tether.usd);
  };

  // Action to set Bitcoin value
  setBitcoinValue = (value) => {
    this.bitcoinValue = value;
  };

  // Action to set USDT value
  setUsdtValue = (value) => {
    this.usdtValue = value;
  };
}

export default new CryptoStore();
