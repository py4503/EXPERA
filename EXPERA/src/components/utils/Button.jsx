import React from 'react'

function Button({
    type = 'submit',
    title = 'Button',
    className = '',
    children,
    ...props
}) {
  return (
    <div>
      <button
  type={type}
  className={`group relative inline-flex items-center justify-center px-6 py-3 rounded-xl bg-zinc-900 text-white text-sm font-medium tracking-wide
             shadow-md hover:shadow-lg transition-all duration-200 ease-in-out
             hover:bg-zinc-800 active:scale-95
             focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-700 ${className}`}
             {...props}

>
  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
    {children}
  </span>
</button>

    </div>
  )
}

export default Button
