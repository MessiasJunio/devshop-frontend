import React from 'react'
import Link from 'next/link'

const Button = ({ children, type = 'submit' }) => {
  return (
    <button
      type={type}
      className='max-w-xs rounded-md border border-blue-300 shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
    >
      {children}
    </button>
  )
}

const ButtonLink = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className='max-w-xs rounded-md border border-blue-300 shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'>
        {children}
      </a>
    </Link>
  )
}

const ButtonLinkOutline = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className='max-w-xs rounded-md border border-blue-300 shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'>
        {children}
      </a>
    </Link>
  )
}

Button.Link = ButtonLink
Button.LinkOutline = ButtonLinkOutline

export default Button
