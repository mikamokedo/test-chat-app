import React from 'react'

interface SendButtonProps{
    onSend:() => void;
}
const SendButton:React.FC<SendButtonProps> = ({onSend}) => {
  return (
    <div>
      <button onClick={onSend} className='bg-[white] rounded-[10px] px-[20px] py-[5px] text-sm ml-[10px]'>Send</button>
    </div>
  )
}

export default SendButton
