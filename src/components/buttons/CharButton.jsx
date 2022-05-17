import React from 'react'

function CharButton ({ classname }) {
  return (
    <>
      <label
        className='character-button-label'
        htmlFor={`checkbox${id}`}
      >
        <input
          className='character-button'
          type='checkbox'
          id={`checkbox${id}`}
        />
        <div className='character-button-img' />
        {value} Results
      </label>
    </>
  )
}

export { CharButton }
