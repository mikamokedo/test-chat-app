import React from 'react'


interface InputProps{
    value:string;
    onChange:( value:string) => void; 
}
const Input:React.FC<InputProps> = ({value,onChange}) => {
  return (
      <input value={value} onChange={(e) => onChange(e.target.value) } className='rounded-[10px] w-full p-[5px]'/>
  )
}

export default Input
