import StatusTag from "../components/StatusTag"
import Avatar from "../components/Avatar"
import { MicOff,VideoOff, ScreenShare, Phone, Plus  } from 'lucide-react';
import {useEffect, useState } from 'react'

// import { Mic, Video  } from 'lucide-react';



const Room = () => {

  const [tutorImg, setTutorImg] = useState('')
  const [tutorName, setTutorName] = useState('')
  const [tutorfirstName, setTutorfirstName] = useState('')
  const [alumnoImg, setAlumnoImg] = useState('')
  const [message, setMessage] = useState('')



  useEffect(()=>{

    fetch('https://randomuser.me/api/?nat=es')
    .then(response => response.json())
    .then(data => {

      for ( let elemento in data.results ){
        const tutorImage = data.results[elemento].picture.large;
        setTutorImg(tutorImage)
      }
      for ( let elemento in data.results ){
      
        const tutorName = data.results[elemento].name.first +' '+ data.results[elemento].name.last ;
        const firstName = data.results[elemento].name.first;
        setTutorName(tutorName)
        setTutorfirstName(firstName)
      }
      
    })
    .catch(err => err)

    fetch('https://randomuser.me/api/?nat=es')
    .then(response => response.json())
    .then(data => {
     
      for ( let elemento in data.results ){
        const alumnImage = data.results[elemento].picture.large;
        setAlumnoImg(alumnImage)
      }
    })
    .catch(err => err)

    fetch('https://jsonplaceholder.typicode.com/comments')
    .then(response => response.json(response))
    .then(data => setMessage(data[0].body) )
    .catch(err => err)

  },[])
  



  return (
    <>
    <div className="roomWrapper">
      <div className="callColumn">
        <div className="userStatusWrapper"> <StatusTag status={'Online'} color={'green'}/> 
          <h4 className='subtitle-sm'>{tutorName}</h4> 
          <p className='btn-text-s mb-0'>Tutor</p> 
        </div>
        <div className="videoWrapper">
            <Avatar img={tutorImg} avatarSize={128}/> 
              <div className="videoActionsWrapper"> 
                <div className="callIconWrapper icon-active">{/* <Mic strokeWidth={2.5} /> */}<MicOff /></div> 
                <div className="callIconWrapper icon-active">{/* <Video strokeWidth={1.8}/> */}<VideoOff /></div> 
                <div className="callIconWrapper"><ScreenShare/></div> 
                <div className="callIconWrapper icon-red"><Phone /></div> 
              </div> 
        </div>
      </div>
      <div className="chatColumn">
        <div className="chatWrapper">
          <div className="headWrapper"><p className='btn-text-s mb-0'>Conversación con {tutorfirstName}</p></div>
          <div className="mainWrapper">
            <div className="messageWrapper">
              <div className="userInfoContainer">
                <div className="avatarContainer">
                  <Avatar img={alumnoImg} avatarSize={40}/>
                  </div>
                 <div className="userInfoChat"><p className='btn-text-m'>Tú</p><p className='paragraph-s'>00:00</p></div>    
              </div>
              <div className="messageContainer ">
                <div className="messageContainer--message paragraph-s">
                {message}
                </div>
              </div>
            </div>
          </div>
          <div className="actionsWrapper">
            <div className="chatActionContainer">
              <div className="actionIconWraper"><Plus size={18}/></div>
                <input type="text" placeholder={`Envia un mensaje a ${tutorfirstName}`} className='paragraph-s'/>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Room