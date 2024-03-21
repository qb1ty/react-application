import { cryptoAssets, cryptoData } from './data'

export function fakeFetchCryptoData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoData)
        }, 2000)
    })
}

export function fakeFetchCryptoAssets() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 2000)
    })
}