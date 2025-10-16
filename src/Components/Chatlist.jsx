import React from 'react'

const Chatlist = ({chats}) => {
    const user = localStorage.getItem('user')
    function SenderChat ({message, username, avatar}){
        return (
            <div className='ml-[400px] mb-2  '>
                <img className='rounded-full w-10 h-10' src={avatar} alt="" />
             
                 <div className='w-[550px]'>
                     <p className='flex gap-3 flex-col   ml-3 pl-2 bg-blue-500 rounded-md w-[500px]'>
                    <strong>{username}</strong>
                    {message}
                </p>
             
                 </div>
            </div>
        )
    }

     function RecieverChat ({message, username, avatar}) {
        return (
            <div className='mb-5 w-[550px] '>
                <img className='rounded-full w-10 h-10' src={avatar} alt="" />
                <p className='flex flex-col gap-3 pl-2 bg-green-500  rounded-lg w-[500px]'>
                    <strong>{username}</strong>
                    {message}
                </p>
            </div>
        )
    }
  return (
    <div className='chats_list'>
        {
            chats.map((chat, index) => {
               if(chat.user == user) {
                 return <SenderChat
                 key={index}
                 message = {chat.message}
                 username = {chat.user}
                 avatar = {chat.avatar}/>
               }
                return <RecieverChat
                 key={index}
                 message = {chat.message}
                 username = {chat.user}
                 avatar = {chat.avatar}/>
            })
        }
    
        <RecieverChat />
    </div>
  )
}

export default Chatlist