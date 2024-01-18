'use client'
import React,{FC,useEffect,useState,useMemo} from 'react';
import Select,{SelectChangeEvent} from '@mui/material/Select';
import { ABRAMOV_LINK, ABRAMOV_NAME } from '@/utils/consts';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Link from 'next/link';
//icons
import { Icons } from '../Icons/Icons';
//types
import { CurrencyConverterProps,SelectedCoin } from '@/types/types';
//styles
import './CurrencyConverter.scss';


export const CurrencyConverter:FC<CurrencyConverterProps> = ({allCurrencies}) => {
    

    const cryptoCoins = allCurrencies.data;
    //Можно завернуть все стейты в один с обьектом - но я отказался от этого:
    //1) Стейтов не так много
    //2) Будут лишние коллбэки которых я избежал
    const initialTopCoin = cryptoCoins.find(coin => coin.symbol === 'BTC') || { values: { USD: { price: 0 } }, symbol: '' };
    const initialBottomCoin = cryptoCoins.find(coin => coin.symbol === 'USDT') || { values: { USD: { price: 0 } }, symbol: '' };

    const [selectedCoinTop, setSelectedCoinTop] = useState<SelectedCoin>({ price: initialTopCoin.values.USD.price, symbol: 'BTC' });
    const [selectedCoinBottom, setSelectedCoinBottom] = useState<SelectedCoin>({ price: initialBottomCoin.values.USD.price, symbol: 'USDT' }); 

    const [inputTop, setInputTop] = useState<string>('');
    const [inputBottom, setInputBottom] = useState<any>(0);

    //Обработчики для полчения данных о значениях в инпуте
    const getTopCoinPrice = (event:SelectChangeEvent) => setInputTop(event.target.value);
    const getBottomCoinPrice = (event:SelectChangeEvent) => setInputBottom(event.target.value);
    //Обработчики для полчения данных о валютах
    const changeTopCoin = (event:SelectChangeEvent) => {
        //получаем значение инпута
        const newSymbol = event.target.value;
        //находим цену монеты по ее символу
        const coin = cryptoCoins.find(coin => coin.symbol === newSymbol);
        //записываем в стейт
        if(coin){
             setSelectedCoinTop({ price: coin.values.USD.price, symbol: coin.symbol });
        }
        //если монета такая выбрана уже то идет замена 
        if (selectedCoinBottom.symbol === newSymbol) {
            handleCurrencySwap();
        }
    };
    const changeBottomCoin = (event:SelectChangeEvent) => {
        //получаем значение инпута
        const newSymbol = event.target.value;
        //находим цену монеты по ее символу
        const coin = cryptoCoins.find(coin => coin.symbol === event.target.value);
        //записываем в стейт
        if(coin){
             setSelectedCoinBottom({ price: coin.values.USD.price, symbol: coin.symbol });
        }
        //если монета такая выбрана уже то идет замена 
        if (selectedCoinTop.symbol === newSymbol) {
            handleCurrencySwap();
        }
    };  
    
    //Фукнция для рендера всех валют
    const renderAllCryptoCoins = useMemo(() => (
        cryptoCoins.map((coin) => (
            <MenuItem key={coin.id} value={coin.symbol}>
                <Icons id={coin.symbol}/> {coin.symbol}
            </MenuItem>
        ))
    ), [cryptoCoins]);
    
    //функция по смене валют местами
    const handleCurrencySwap = () => {
        const currentTopCoin = { ...selectedCoinTop };
        const currentBottomCoin = { ...selectedCoinBottom };
     
        setSelectedCoinTop(currentBottomCoin);
        setSelectedCoinBottom(currentTopCoin);
    };

    //Подсчет и вывод цены монеты
    const resultValue = useMemo(() => {
        if (selectedCoinTop.price && selectedCoinBottom.price && inputTop) {
            return parseFloat(inputTop) * selectedCoinTop.price / selectedCoinBottom.price;
        }
        return '';
    }, [selectedCoinTop, selectedCoinBottom, inputTop]);

     //Отображение и рендер цен
     useEffect(()=> {
        // if (selectedCoinTop.price && selectedCoinBottom.price && inputTop) {
        //     const resultValue = parseFloat(inputTop) * selectedCoinTop.price / selectedCoinBottom.price;

        //     setInputBottom(resultValue);
        //     return;
        // }

        // setInputBottom('');
        setInputBottom(resultValue);

    },[resultValue])

  return (
    <main className="exchange-wrapper">
        <h1 className='title'>Currency-Convertor by <Link href={ABRAMOV_LINK} className='title-name'>{ABRAMOV_NAME}</Link></h1>

        <div className='exchanger-form'>
            <input value={inputTop} onChange={getTopCoinPrice} required className='currency-input' type="number" />
               
            <FormControl sx={{ minWidth: 120 }} size="small">
                <Select sx={{ borderRadius:"0 10px 10px 0"}}
                        className='choose-currency'
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        onChange={changeTopCoin}
                        value={selectedCoinTop.symbol}
                    >
                    {
                    renderAllCryptoCoins
                    }
                </Select>
            </FormControl>
            
        </div>

        <div className="button-between">
            <button onClick={handleCurrencySwap} className='change-currency'><Icons id='Arrows'/></button>
        </div>

        <div className='exchanger-form'>
            <input value={inputBottom} onChange={getBottomCoinPrice} required className='currency-input' type="number" />

            <FormControl sx={{ minWidth: 120 }} size="small">
                <Select sx={{ borderRadius:"0 10px 10px 0"}}
                        className='choose-currency'
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        onChange={changeBottomCoin}
                        value={selectedCoinBottom.symbol}
                    >
                    {
                    renderAllCryptoCoins
                    }
                </Select>
            </FormControl>
        </div>
    </main>
  )
}
