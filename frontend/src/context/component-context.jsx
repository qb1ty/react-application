import { createContext, useState, useEffect, useContext } from "react";
import { fakeFetchCryptoData, fakeFetchCryptoAssets } from "../api";
import { precentDifferent } from "../utils";

const ComponentContext = createContext({
    loading: false,
    crypto: [],
    assets: []
})

const useComponentContext = () => {
    return useContext(ComponentContext)
}

export function ComponentContextProvider({ children }) {
    const [ loading, setLoading ] = useState(false)
    const [ crypto, setCrypto ] = useState([])
    const [ assets, setAssets ] = useState([])

    function mapAssets(assets, result) {
        return assets.map((asset) => {
            const coin = result.find(c => c.id === asset.id)

            return {
                grow: asset.price < coin.price,
                growPrecent: precentDifferent(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                name: coin.name,
                icon: coin.icon,
                ...asset
            }
        })
    }

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const { result } = await fakeFetchCryptoData()
            const assets = await fakeFetchCryptoAssets()

            setAssets(mapAssets(assets, result))
            setCrypto(result)
            setLoading(false)
        }
        
        preload()
    }, [])

    function addAsset(newAsset) {
        setAssets((prev) => mapAssets([...prev, newAsset], crypto))
    }

    return (
        <ComponentContext.Provider value={{ loading, crypto, assets, addAsset }}>
            {children}
        </ComponentContext.Provider>
    )
}

export default useComponentContext