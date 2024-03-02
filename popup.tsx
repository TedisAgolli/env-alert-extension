import React, { useEffect, useState } from 'react';
import './style.css';
import debounce from 'lodash.debounce';
import { Storage } from '@plasmohq/storage';
import iconImage from 'data-base64:~assets/icon.png';

const storage = new Storage();

function IndexPopup() {
  return (
    <div className="w-96 p-4 my-2">
      <div className="mb-6">
        <div className='flex items-center space-x-2 mb-2'>
          <img src={iconImage} alt="Logo" className='w-8 h-8'/>
          <h1 className="font-semibold text-lg">GCP Environment Names</h1>
        </div>
        <p className="text-sm text-slate-500">Never make accidental changes in prod again!</p>
      </div>
      <EnvName isProd={true} />
      <EnvName isProd={false} />
    </div>
  );
}

function EnvName({ isProd }: { isProd: boolean }) {
  const [envName, setEnvName] = useState<string>('');
  const envType = isProd ? 'prod' : 'dev';
  useEffect(() => {
    const getProdName = async () => {
      const envInstanceName = await storage.get(envType);
      if (envInstanceName) {
        setEnvName(envInstanceName);
      }
    };

    getProdName();
  }, []);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const debouncedSetStorage = debounce(async (value: string) => {
      await storage.set(envType, value);
    }, 300);
    debouncedSetStorage(e.target.value);
  }

  return (
    <div className="flex items-center space-x-4 mb-2">
      <div className="w-48 flex items-center justify-between">
        <label
          className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor={envName}
        >
          {isProd ? 'Production' : 'Development'}
        </label>
        <div className={`rounded border border-gray-200 ${isProd ? 'bg-red-600' : 'bg-green-500'} w-8 h-8`} />
      </div>

      <input
        onChange={onChange}
        defaultValue={envName}
        placeholder={isProd ? 'Production' : 'Development'}
        id={envName}
        className="w-64 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      {/* <Input className="w-[200px] text-center" id="development" placeholder="Development" /> */}
    </div>
  );
}

export default IndexPopup;
