import React from 'react'

const Select = ({
  placeholder = '',
  label = '',
  value,
  onChange,
  name,
  helpText = null,
  options = []
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
        <select
          className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3'
          id={'id-' + name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        >
          {options.map(opt => {
            return (
              <option key={opt.id} value={opt.id} checked={value === opt.id}>
                {opt.label}
              </option>
            )
          })}
        </select>
        {helpText && <p className='text-red text-xs italic'>{helpText}</p>}
      </div>
    </div>
  )
}

export default Select
