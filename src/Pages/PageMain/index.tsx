import React, { useState, useEffect } from 'react';
import { Typography, Spin, Modal, Input } from 'antd';
import Header from '../../Components/Header';
import './style.scss';
import CreateUserForm from '../../Components/App/CreateUserForm';
import ApplicationServiсes from '../../Services';
import ListItem from '../../Components/ListItem';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';

const PageMain = () => {

  const { Title } = Typography;
  const [userList, setUserList] = useState([])
  const [initUserList, setInitUserList] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)

  const [typeSorting, setTypeSorting] = useState({
    desc: false,
  })
  const [loader, setLoader] = useState(false)

  const applicationServiсes = new ApplicationServiсes()
  useEffect(() => {
    setLoader(true)
    applicationServiсes.getListUsers().then((list) => {

      const sortList: any = [...list]
      sortList.sort((a: any, b: any) => a.id - b.id);
      setInitUserList(sortList)
      setUserList(sortList)
      setLoader(false)
    })
  }, [])


  const sorting = () => {
    const desc = !typeSorting.desc
    setTypeSorting({
      desc
    })
    const sortList = [...userList]
    const sortInitList = [...initUserList]
    sortList.sort((a: any, b: any) => desc ? b.id - a.id : a.id - b.id);
    sortInitList.sort((a: any, b: any) => desc ? b.id - a.id : a.id - b.id);
    setInitUserList(sortInitList)
    setUserList(sortList)
  }

  const openModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  const onSearch = (event: any) => {
    setUserList(userList.filter((user: any) =>
      user.username.toLowerCase()
        .startsWith(event.target.value.toLowerCase()
          .trimStart())))
    if (event.target.value === '') {
      setUserList(initUserList)
    }
  }


  return (
    <div className='page-main'>
      <Header 
      openModal={openModal}
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
          onChange={value => onSearch(value)} />
          </div>
        <div className='page-main__list'>
          {userList.map((user: any) => {
            return (
              <ListItem user={user} />              
            )
          })}
        </div>
      </div>
      <Modal
        footer={null}
        title="Создать нового пользователя"
        visible={isOpenModal}
        onCancel={openModal}
      >
        <CreateUserForm />
      </Modal>
    </div>
  );
};



export default PageMain