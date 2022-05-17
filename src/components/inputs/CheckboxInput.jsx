import React from 'react'

function CheckboxInput ({
  value,
  content,
  id,
  checkboxType,
  className,
  onClick,
  onChange,
  checked
}) {
  return (
    <>
      <label
        className={`checkbox-label ${className}`}
        htmlFor={`checkbox${id}`}
        onClick={(e) => onClick(e, id)}
      >
        <input
          className='checkbox-input'
          type='checkbox'
          id={`${id}`}
          checked={checked}
          onChange={() => ''}
        />
        <div className={`checkbox-img-${checkboxType}`} />
        {content}
      </label>
    </>
  )
}

export { CheckboxInput }
