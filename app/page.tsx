import {CurrencyConverter} from '../components/CurrencyConverter/CurrencyConverter'
import { getCurrencies } from '@/services/currenciesAPI';
// import { _transformCurrencies } from '@/services/currenciesAPI';
import './global.scss';

export default async function Home() {
  
  const allCurrencies = await getCurrencies();

  return (
    <main className='main-wrapper'>
        <CurrencyConverter allCurrencies={allCurrencies}/>
    </main>
  )
}
