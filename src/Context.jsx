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

    const mapAssets = (assets, result) => {
        return assets.map(asset => {
            const coin = result.find(coin => coin.id === asset.id)
            return {
                symbol: coin.symbol,
                grow: asset.price < coin.price,
                growPersent: persentDifference(+asset.price, +coin.price),
                totalAmount: asset.amount * coin.price,
                totalPrice: asset.amount * coin.price - asset.amount * asset.price,
                ...asset,
            };
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await fetchCoinData();
                setDataAssets(mapAssets(dataAssets, data.result))
                setCoinData(data.result);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching coin data:', error);
            }
        };
        fetchData();
    }, []);

    const addAsset = (newAsset) => {
        setDataAssets((prev) => mapAssets([...prev, newAsset], coinData));
    }

    const deleteAsset = (id) => {
        setDataAssets((prev) => prev.filter(asset => asset.id !== id));
    }

    return (
        <CriptoContext.Provider value={{ loading, dataAssets, coinData, addAsset, deleteAsset }}>
            {children}
        </CriptoContext.Provider>
    );
}