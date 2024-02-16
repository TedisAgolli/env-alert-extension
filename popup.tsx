import { useState } from "react"
import "./style.css"

import debounce from "lodash.debounce"
import { Storage } from "@plasmohq/storage"
const storage = new Storage()

function IndexPopup() {
  const [prodName, setProdName] = useState<string>("")

  return (
    <div
      className='w-96 p-4'>
      <h2>Never make accidental changes in Prod again!</h2>

      <form >
        <EnvName label='Prod' />
        <EnvName label='Dev' />
        <button
          type="submit"
          className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
        >
          Save
        </button>
      </form>
    </div >
  )
}

function EnvName({ label }: { label: string }) {
  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const debouncedSetStorage = debounce(async (value: string) => {
      await storage.set(`${label.toLowerCase()}Name`, value)
    }, 300)
    debouncedSetStorage(e.target.value)
  }

  return (
    <div className='flex justify-between items-center space-x-12 mt-2'>
      <label htmlFor="email" className="flex text-sm font-medium leading-6 text-gray-900 align-middle">
        {label} <div className='w-2 h-2 bg-red-600'></div>
      </label>
      <input
        onChange={onChange}
        placeholder="Name of environment"
        className="w-64 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  )
}

export default IndexPopup
