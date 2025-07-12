import React from 'react'

function Select({
    options = [],
    defaultValue = '',
    ...props
}) {
    return (
        <div>
            <select
                className="mt-1 w-full appearance-none bg-white border border-gray-300 text-gray-800 text-sm rounded-xl px-4 py-2 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                {...props}
            >
                {options.map((option) => (
                    <option value={option} id={option} className='text-gray-800, rounded-xl'>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select);
