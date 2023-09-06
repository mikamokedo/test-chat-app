import React from 'react'


interface InputProps{
    value:string;
    onChange:( value:string) => void; 
}
const Input:React.FC<InputProps> = ({value,onChange}) => {
  return (
      <input value={value} onChange={(e) => onChange(e.target.value) }/>
  )
}

export default Input
