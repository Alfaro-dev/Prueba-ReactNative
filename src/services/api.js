const BASE_URL = 'https://api.coinlore.net/api';

export const fetchCryptos = async () => {
    const response = await fetch(`${BASE_URL}/tickers/`);
    const data = await response.json();
    return data.data;
};

export const fetchSpecificCrypto = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/ticker/?id=${id}`);
        const result = await response.json();
        return result[0];
    } catch (error) {
        throw error;
    }
};
