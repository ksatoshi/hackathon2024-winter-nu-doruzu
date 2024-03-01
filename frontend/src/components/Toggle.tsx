'use client'

import React, { useState } from 'react'

export default function Toggle({ onChange }: any) {
  const [toggleValue, setToggleValue] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: number = parseInt(e.target.value)
    setToggleValue(value)
    onChange(value)
  }

  return (
    <div className="mt-3 w-2/3 ml-10 relative mb-8">
      <label
        htmlFor="labels-range-input"
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
      >
        Recent 1 Year
      </label>
      <input
        id="range"
        type="range"
        value={toggleValue}
        min="0"
        max="365"
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        onChange={(e) => handleChange(e)}
      />
      <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
        Today
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
        6 Month
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
        1 Year
      </span>
    </div>
  )
}
