import React from 'react'

function FormButton ({ value, className, onClick }) {
  return (
    <>
      <input
        className={`form-button ${className}`}
        type='button'
        value={value}
        onClick={onClick}
      />
    </>
  )
}

export { FormButton }
