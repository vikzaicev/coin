import { createContext } from "react";
import { useEffect, useState } from "react";
import { criptoAssets } from "./API";
import { fetchCoinData } from "./API";
import { persentDifference } from "./utils";

export const CriptoContext = createContext({
    dataAssets: [],
    coinData: [],
    loading: false,
})

export function CriptoContextProvider({ children }) {

    const [loading, setLoading] = useState(false);
    const [dataAssets, setDataAssets] = useState(criptoAssets);
    const [coinData, setCoinData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await fetchCoinData();
                setCoinData(data.result);
                setDataAssets(
                    dataAssets.map(asset => {
                        const coin = data.result.find(coin => coin.id === asset.id);

                        return {
                            grow: asset.price < coin.price,
                            growPersent: persentDifference(asset.price, coin.price),
                            totalAmount: asset.amount * coin.price,
                            totalPrice: asset.amount * coin.price - asset.amount * asset.price,
                            ...asset,
                        };
                    }
                    )
                )
                setLoading(false)
            } catch (error) {
                console.error('Error fetching coin data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <CriptoContext.Provider value={{ loading, dataAssets, coinData }}>
            {children}
        </CriptoContext.Provider>
    );
}