import React from 'react'

const Input = ({
  type = 'text',
  placeholder = '',
  label = '',
  value,
  onChange,
  name,
  helpText = null
}) => {
  return (
    <div className='-mx-3 md:flex mb-6'>
      <div className='md:w-1/2 px-3 mb-6 md:mb-0'>
        <label
          className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'
          htmlFor={'id-' + name}
        >
          {label}
        </label>
        <input
          className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3'
          id={'id-' + name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />
        {helpText && <p className='text-red text-xs italic'>{helpText}</p>}
      </div>
    </div>
  )
}

export default Input
