import {CurrencyConverter} from '../components/CurrencyConverter/CurrencyConverter'
import { getCurrencies } from '@/services/currenciesAPI';
import './global.scss';

export default async function Home() {
  
  const allCurrencies = await getCurrencies();
  
  if(allCurrencies.status.message !== 'OK'){
    throw new Error('Ошибка при загрузке данных !')
  }

  return (
    <main className='main-wrapper'>
        <CurrencyConverter allCurrencies={allCurrencies}/>
    </main>
  )
}

