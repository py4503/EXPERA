import React from 'react'
import { useId } from 'react'

const Input = React.forwardRef(function({
    label ='',
    type = 'text',
    placeholder = '',
    className = '',
    required = 'true',
    ...props
}, ref) {
    const id = useId();
    return (
        <>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          type={type}
          key={id}
          className={`mt-1 w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${className} `}
        //   value={title}
          placeholder={placeholder}
          required
          ref={ref}
          {...props}
        />
        </>
    )
})

export default Input
