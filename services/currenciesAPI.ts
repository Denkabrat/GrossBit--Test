import { $host ,_apiKey} from "./index";


    export const getCurrencies = async () => {

        const currencySymbols = ['BTC', 'ETH', 'USDT'].join(',');
    
        try {
            const { data } = await $host.get(`/currencies?symbols=${currencySymbols}&${_apiKey}`);
    
            return data;
        } catch (error) {
            console.error("Ошибка при запросе данных о криптовалютах:", error);
            return null;
        }
    }


