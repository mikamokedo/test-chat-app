import React,{useRef,useEffect} from 'react'


interface InputProps{
    value:string;
    onChange:( value:string) => void; 
}
const Input:React.FC<InputProps> = ({value,onChange}) => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() =>{
      ref.current?.focus()
    },[ref])
  return (
      <input value={value} onChange={(e) => onChange(e.target.value) } className='rounded-[10px] w-full p-[5px]' ref={ref}/>
  )
}

export default Input
