import { PiClockAfternoon } from 'react-icons/pi';
import userImage from '../images/pnewaigen.9f38d6e8b9dbf5f4b3cc.jpg';
import alternateImage from '../images/profile_3135715.png';
import { contactsFields , UserDetails } from '../utils/Interfaces';
import { FiPhoneOutgoing } from "react-icons/fi";
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import axios from 'axios';
 export const Home = () => {
  const [ user , setUser ] = useState<UserDetails | null> ();
  const [conversation , setConverstion] = useState([]);

  const [ people , setPeople ] = useState([]);

  useEffect(()=>{
    const loggedUser = localStorage.getItem("user");
    if(loggedUser){
      var newUser = JSON.parse(loggedUser);
      setUser(JSON.parse(loggedUser));

    }
    const fetchConversations = async()=>{
      const response = await axios.get(`http://localhost:3001/auth/conversation/${newUser.ID}`);
      setConverstion(response.data);
    }
    fetchConversations();
    
    const fetchpeople = async() => {
      const response = await axios.get("http://localhost:3001/auth/users");
      setPeople(response.data);
    }

    fetchpeople();
  },[])

  const [ messages, setMessages] = useState({
    messagesData:[], reciever:{} , conversationId:{}
  });
  const fetchmessages = async( conversationId :string , user1:any)=>{
    console.log(conversationId);
    try {
      const response = await axios.get(`http://localhost:3001/auth/message/${conversationId}`);
      console.log(response.data);
      setMessages({messagesData : response.data, reciever:user1 , conversationId:conversationId});
    } catch (error) {
      alert(error);
    }
  }
  const [ textMessage , setTextMessage ]= useState("");
  const sendMessage = async() =>{
    const response = await axios.post("http://localhost:3001/auth/message",{
      conversationId:messages.conversationId,
      senderId:user?.ID,
      message:textMessage,
      receiverId :messages.reciever.receiverId,

    });
    console.log(response.data);
    

  }
  return (
    <div className="flex w-screen bg-[#c5d4f9]">
      <div className="w-[25%]  h-screen bg-[#eff4ff]">
        <div className='flex justify-center items-center my-4'>
          <img src={userImage} alt={alternateImage} width={60} height={60} className=' p-[2px] border-2 border-emerald-500 rounded-full'/>
          <div className='ml-4'>
            {user && <h3 className='text-xl'> {user.name}  </h3>}
            <p className='text-sm font-light'>My account</p>
          </div>
        </div>
        <hr/>
        <div className='mx-14 mt-10'>
        <div className='text-lg text-sky-500'> Messages </div>
        <div className='h-[500px] overflow-y-auto scroll-smooth'>
          {
            conversation.length>0?
            conversation.map(({conversationId, user1})=>{
              return(
                <div className='flex  items-center my-4 p-2 border-b-2 border-gray-300'>
                 <div className='flex items-center cursor-pointer' onClick={()=>fetchmessages(conversationId,user1)}>
                    <img src={alternateImage} alt={alternateImage} width={50} height={50} className=' p-[2px] border-2 border-sky-500 rounded-full'/>
                    <div className='ml-4'>
                      <h3 className='text-base'> {user1.name} </h3>
                      <p className='text-sm font-light text-gray-500'> Available</p>
                    </div>
                  </div>
                </div>
              )
            }):<h1 className='mt-10 text-xl font-semibold text-center'>  No Conversations . Tap on people to create One </h1>
          }
        </div>
        </div>
      </div>
      <div className="w-[50%] h-screen bg-white flex flex-col items-center">
        <div className='w-[75%] bg-[#eff4ff] h-[80px] mt-[1rem] mb-[0.4rem] rounded-[22px] flex items-center px-14 shadow-md'>
          <div className='cursor-pointer'><img src={alternateImage} width={50} height={50} /></div>
          <div className='ml-6 mr-auto'>
            <h3 className='text-lg'> {messages?.recieverData?.name}</h3>
            <p className='text-gray-500 font-light text-sm'>{messages.recieverData?.phoneNo}</p>

          </div>
          <div className='cursor-pointer'>
            <FiPhoneOutgoing/>
          </div>

        </div>
          <div className='h-[75%] border w-full overflow-scroll'>
            <div className=' px-10 py-14'>
              {
                messages.messagesData.length > 0 ?
                messages.messagesData.map(({message , userdetails})=>{
                  if(userdetails.id!==user?.ID){
                    return(
                      <div className='p-4 max-w-[40%] rounded-b-xl rounded-tr-xl bg-[#eff4ff] mb-6 '> 
                      {message}</div>
                    )

                  }
                  else{
                    return(
                      <div className='p-4 max-w-[40%] rounded-b-xl rounded-tl-xl bg-[#0051ff] ml-auto text-white mb-6'>
                        {message}</div>
                    )
                  }
                }): <h1> Start Chat Now </h1>
              }

            </div>
          </div>
          <div className='w-full p-4 flex items-center '>
            <input value={textMessage} onChange={(e)=>{setTextMessage(e.target.value)}} className=' w-full  text-xl p-4 border-0 shadow-lg shadow-gray-600 rounded-full bg-[#eff4ff] focus:ring focus-border-0 focus:border-0 outline-none '  placeholder='Type a Message ' /> 
            <div className='ml-4 p-4 cursor-pointer ' onClick={ ()=>sendMessage()}>
              <RiSendPlaneFill size={32}/>
            </div>
          </div>

      </div>
      <div className="w-[25%] h-screen ">
        <div className='flex-col justify-center items-center '>
          <div className='flex justify-center items-center'>
            <h1 className='text-xl bg-white p-4 w-[200px] text-center mt-[1rem] rounded-[22px] shadow-xl mb-[1rem] '> People </h1>
          </div>
          <div className='p-6 overflow-auto '>
            {
              people?.map((item)=>{
                // console.log(item?.name);
              return(
                <>
                 { item.name &&
                  <div className='flex  items-center my-4 p-2 border-b-2 border-white justify-center'>
                  <div className='flex items-center cursor-pointer'>
                      <img src={alternateImage} alt={alternateImage} width={50} height={50} className=' p-[2px] border-2 border-sky-500 rounded-full'/>
                      <div className='ml-4'>
                        <h3 className='text-base'> {item?.name} </h3>
                        <p className='text-sm font-light text-gray-500'>Available</p>
                      </div>
                    </div>
                  </div>
                  }
                </>
               
              )
              })
            }
            </div>
        </div>
      </div>
      
      
    </div>
  )
}
