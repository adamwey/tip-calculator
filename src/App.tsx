import { useState, useEffect } from 'react';
import clsx from 'clsx';

import CurrencyInput from 'react-currency-input-field';
import { DollarIcon, UserIcon } from './components/Icons';

function App() {
  const [bill, setBill] = useState('');
  const [selectedTip, setSelectedTip] = useState(5);
  const [customPercent, setCustomPercent] = useState('');
  const [people, setPeople] = useState('');
  const [total, setTotal] = useState('');
  const [tip, setTip] = useState('');

  const tips = [5, 10, 15, 25, 50];

  function handleSelectedTip(tip: number) {
    setCustomPercent('');
    setSelectedTip(tip);
  }

  function reset() {
    setBill('');
    setSelectedTip(5);
    setCustomPercent('');
    setPeople('');
    setTotal('0.00');
    setTip('0.00');
  }

  useEffect(() => {
    if (Number(bill) > 0 && Number(people) > 0 && selectedTip > 0) {
      const totalTip = +bill * (+selectedTip / 100);
      const totalBal = +bill + +totalTip;
      setTip((+totalTip / +people).toFixed(2));
      setTotal((+totalBal / +people).toFixed(2));
    } else {
      setTip('0.00');
      setTotal('0.00');
    }
  }, [bill, people, selectedTip]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen pt-8 space-y-20 font-mono bg-brand-200 lg:pt-0'>
      <header>
        <h1 className='text-green-500 text-brand-600 text-opacity-75 flex flex-col text-2xl tracking-[0.5rem]'>
          <span>SPLI</span>
          <span>TTER</span>
        </h1>
      </header>

      <main className='max-w-[920px] w-full bg-white p-6 rounded-lg grid grid-cols-1 lg:grid-cols-2 lg:gap-12 font-bold space-y-8 lg:space-y-0'>
        <div className='flex flex-col space-y-10 text-brand-600'>
          <div className='flex flex-col space-y-1 text-brand-500'>
            <h2>Bill</h2>
            <div className='flex items-center justify-start'>
              <DollarIcon />

              <CurrencyInput
                value={bill}
                placeholder='0'
                decimalsLimit={2}
                onValueChange={(value) => setBill(value!)}
                className='w-full h-12 px-4 pl-10 font-bold text-right border-2 rounded-md text-brand-600 bg-brand-100 border-brand-100 focus:border-teal-200 focus:outline-none placeholder:text-brand-300'
              />
            </div>
          </div>

          <div className='flex flex-col space-y-1 text-brand-500'>
            <h2>Selected Tip %</h2>

            <div className='grid grid-cols-2 gap-3 mt-2 text-white md:grid-cols-3'>
              {tips.map((tip, i) => (
                <button
                  key={i}
                  className={clsx(
                    'hover:bg-teal-100 rounded text-xl font-semibold py-2 transition-colors duration-200 ease-in-out focus:outline-none',
                    {
                      'bg-teal-200 text-brand-600': tip === selectedTip,
                      'bg-brand-600': tip !== selectedTip,
                    }
                  )}
                  onClick={() => handleSelectedTip(tip)}
                >
                  {tip + '%'}
                </button>
              ))}

              <CurrencyInput
                value={customPercent}
                placeholder='Custom'
                allowDecimals={false}
                suffix='%'
                max={1000}
                onValueChange={(value) => {
                  if (value) {
                    setSelectedTip(Number(value));
                    setCustomPercent(value);
                  }
                }}
                className={clsx(
                  'font-bold text-center border-2 rounded text-brand-600 bg-brand-100 border-brand-100 focus:border-teal-200 focus:outline-none placeholder-brand-500 placeholder:font-bold'
                )}
              />
            </div>
          </div>

          <div className='flex flex-col space-y-1 text-brand-500'>
            <h2>Number of People</h2>

            <div className='flex items-center justify-start mt-3'>
              <UserIcon />

              <CurrencyInput
                value={people}
                allowDecimals={false}
                placeholder='1'
                onValueChange={(value) => setPeople(value!)}
                className='w-full h-12 px-4 pl-10 font-bold text-right border-2 rounded-md text-brand-600 bg-brand-100 border-brand-100 focus:border-teal-200 focus:outline-none placeholder:text-brand-300'
              />
            </div>
          </div>
        </div>

        <div className='flex flex-col p-10 space-y-32 text-white bg-brand-600 rounded-2xl'>
          <div className='flex flex-col space-y-12'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col flex-shrink-0'>
                <h3>Tip Amount</h3>
                <p className='text-sm text-brand-400'>/ person</p>
              </div>

              <h4 className='text-4xl text-teal-200'>${tip}</h4>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex flex-col flex-shrink-0'>
                <h3>Total</h3>
                <p className='text-sm text-brand-400'>/ person</p>
              </div>

              <h4 className='text-4xl text-teal-200'>${total}</h4>
            </div>
          </div>

          <button
            className='w-full h-12 font-semibold transition-colors duration-200 ease-in-out bg-teal-200 rounded-md text-brand-600 hover:bg-teal-100 focus:bg-teal-100 focus:outline-none'
            onClick={reset}
          >
            RESET
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
