import React from 'react'

export default function Input ({label, id,name,value,onChange,error,}) {
  return (
    <div className="input-container" style={{color: "#8BABC6", fontWeight: "bold"}}>
        <label htmlFor={id}>{label}</label>
        <input id={id} value={value} name={name} onChange={onChange} style={{backgroundColor: "#8babc6"}}/>
        <p className='error'>{error}</p>
    </div>
  )
}
