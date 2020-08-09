import React from 'react';
import './style.scss';
import { Button } from 'antd';
import { UserInfo } from '../../Interface';


interface ListItem {
  user: UserInfo,
  getUserData: Function,
  openModal: Function
}


const ListItem = (props: ListItem) => {

  const { id, username } = props.user

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
      <Button type="primary" onClick={() => openEditModal()}>
        Редактировать
      </Button>
    </div>

  )
}

export default ListItem