import React, { useState, useEffect } from 'react';
import { Typography, Modal, Input,message } from 'antd';
import Header from '../../Components/Header';
import './style.scss';
import CreateUserForm from '../../Components/Forms/CreateUserForm';
import EditUserForm from '../../Components/Forms/EditUserForm';
import { UserInfo } from '../../Interface'
import ApplicationServiсes from '../../Services';
import ListItem from '../../Components/ListItem';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';

const PageMain = () => {
  const applicationServiсes = new ApplicationServiсes()

  const { Title } = Typography;
  const [userList, setUserList] = useState<UserInfo[]>([])
  const [userData, setUserdata] = useState({})
  const [initUserList, setInitUserList] = useState<UserInfo[]>([])
  const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false)
  const [isOpenEditUserModal, setIsOpenEditUserModal] = useState(false)
  const [searchValue, setSearchValue] = useState('') 
  const [typeSorting, setTypeSorting] = useState({desc: false})


  useEffect(() => {
    getListUsers()
  }, [])

  const onSearch = (value: string) => {
    const abc = initUserList
    setSearchValue(value)
    setUserList(abc.filter((user:UserInfo) =>
      user?.username?.toLowerCase()
        .includes(value.toLowerCase().trimStart())))
  }


  const getListUsers = () => {
    applicationServiсes.getListUsers().then((res) => {
      if(res.status === 'ok'){
      res.resResult.then((list:UserInfo[])=>{
      const sortList = [...list]
      sortList.sort((a: any, b: any) => typeSorting.desc ? b.id - a.id : a.id - b.id);
      setUserList(sortList)
      setInitUserList(sortList)
      if(searchValue !==''){
        onSearch(searchValue)
      }})
      }
      if(res.status === 'error'){
        message.error('Не удалось загрузить список пользователей')
      }
    })
  }

const getUserData = (data:UserInfo) =>{
  setUserdata(data)
}

  const sorting = () => {
    const desc = !typeSorting.desc
    setTypeSorting({
      desc
    })
  
    const sortList:UserInfo[] = [...userList]
    const sortInitList:UserInfo[] = [...initUserList]
    sortList.sort((a: any, b: any) => desc ? b.id - a.id : a.id - b.id);
    sortInitList.sort((a: any, b: any) => desc ? b.id - a.id : a.id - b.id);
    setInitUserList(sortInitList)
    setUserList(sortList)
  }

  const openCreateUserModal = () => {
    setIsOpenCreateUserModal(!isOpenCreateUserModal)
  }

  const openEditUserModal = () => {
    setIsOpenEditUserModal(!isOpenEditUserModal)
  }



  return (
    <div className='page-main'>
      <Header 
      openModal={openCreateUserModal}
      />
      <div className='page-main__wrap'>
        <Title level={3}>Список пользователей</Title>
        <div className='page-main__top-line'>
        <div className='page-main__sort'>
            {typeSorting.desc ? <SortAscendingOutlined style={{ fontSize: '30px', color: '#08c' }} onClick={() => sorting()} /> :
              <SortDescendingOutlined style={{ fontSize: '30px', color: '#08c' }} onClick={() => sorting()} />}
          </div>
        <Input
          placeholder="Поиск по имени"
          onChange={((value) =>{
              const val = value.target.value
              return onSearch(val)})} />
          </div>
        <div className='page-main__list'>
          { userList.length > 0? userList.map((user: UserInfo) => {
            return (
              <ListItem user={user} openModal={openEditUserModal} 
              getUserData={getUserData}
              key={user.id}
              />              
            )
          }):<div className='page-main__empty-list'> Ничего нет</div>}
        </div>
      </div>
      <Modal
        footer={null}
        title="Создать нового пользователя"
        visible={isOpenCreateUserModal}
        onCancel={openCreateUserModal}
      >
        <CreateUserForm 
        getListUsers={getListUsers}
        openModal={openCreateUserModal} />
      </Modal>
      <Modal
        footer={null}
        title="Редактировать пользователя"
        visible={isOpenEditUserModal}
        onCancel={openEditUserModal}
      >
        <EditUserForm 
        userData={userData}
        getListUsers={getListUsers}
        openModal={openEditUserModal} />
      </Modal>
    </div>
  );
};



export default PageMain