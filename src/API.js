const API_KEY = 'F+gelVNZyLCV3qsIL79d6eEyRyM414GLP3Qm+AP3HWY='
const API_URL = 'https://openapiv1.coinstats.app/coins'

export const fetchCoinData = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'x-api-key': API_KEY
            }
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching coin data:', error)
    }
}

export const criptoAssets = [
    {
        id: 'bitcoin',
        amount: 0.03,
        price: 30000,
        date: new Date('2023-10-01'),
    },
    {
        id: 'ethereum',
        amount: 5,
        price: 5000,
        date: new Date('2023-10-02'),
    },
    {
        id: 'dogecoin',
        amount: 5623,
        price: 5000,
        date: new Date('2023-10-02'),
    },
]