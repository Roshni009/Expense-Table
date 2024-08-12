import React from 'react'

export default function SelectMenu({label, id,name,value,onChange,options,defaultOption, error,}) {
  return (
    <div className="input-container">
    <label htmlFor={id}>{label}</label>
    <select id={id} name={name} value={value} onChange={onChange}>
    {defaultOption && (<option value="" hidden>
        {defaultOption}
    </option>)}
    {
        options.map((option, i) => {
            <option key={i} value={option}>{option}</option>
        })
    }
    <option value="grocery">Grocery</option>
    <option value="clothes">Clothes</option>
    <option value="bills">Bills</option>
    <option value="education">Education</option>
    <option value="medicine">Medicine</option>
    <option value="OTT platform">OTT Platforms</option>
    </select>
    <p className='error'>{error}</p>
  </div>
  )
}
