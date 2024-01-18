import axios from "axios";

const _apiBase = 'https://api.cryptorank.io/v1';
export const _apiKey = `api_key=${process.env.NEXT_PUBLIC_CRYPTO_API_KEY}`;

export const $host = axios.create({
    baseURL:_apiBase
});

