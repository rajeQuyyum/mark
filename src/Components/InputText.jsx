import React, { useState } from 'react'
import { IoIosSend } from 'react-icons/io'
import { MdEmojiEmotions } from 'react-icons/md'
import EmojiPicker from 'emoji-picker-react'

const InputText = ({addMessage}) => {
  const [open,setOpen] = useState(false);
  const [text, setText] = useState("");
  

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false)
  };

    const [message, setMessage] = useState()
    const sendMessage = () => {
        addMessage({message})
        setMessage("")
    
    }
  return (
    <section>
      <div className='flex justify-center bg-white md:w-[450px] w-full m-auto rounded-md border border-black items-center'>
        <textarea className='md:w-[450px] w-full h-10  py-2  px-2  resize-none outline-none' placeholder='type'  name="message" id="message" rows="" onChange={(e) => setMessage(e.target.value)} onInput={(e) => setText(e.target.value)} value={text} ></textarea>
        
        <div className='relative'>
          <MdEmojiEmotions className='text-green-700 text-2xl   bg-white   ' onClick={() => setOpen((prev) => !prev)} />
          
        
        </div>
        
        <IoIosSend className='text-green-700 text-5xl' onClick={sendMessage} />
       

        
    </div>
    <EmojiPicker className='top-0 absolute left-66' open={open} onEmojiClick={handleEmoji} />

    </section>
  )
}

export default InputText