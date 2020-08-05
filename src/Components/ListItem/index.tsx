import React from 'react';
import './style.scss';
import { Button } from 'antd';




const ListItem = (props: any) => {
    
  const  {id, username}  =  props.user 

  const openEditModal = () => {
    props.openModal()
    props.getUserData(props.user)
  }

    return (
        <div className='listItem'>
                <div className='listItem__list'>
                <div className='listItem__item'><span>Id:&nbsp;</span>{id}</div>
                <div className='listItem__item'><span>Username:&nbsp;</span>{username}</div>
               </div>
               <Button  type="primary" onClick={()=>openEditModal()}>
                        Редактировать
            </Button>
        </div>

    )
}

export default ListItem