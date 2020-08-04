import React, { useState, useEffect } from 'react';
import { Typography, Spin, Alert } from 'antd';
import Header from '../../Components/Header';
import './style.scss';
import { Input } from 'antd';
import ApplicationServiсes from '../../Services'
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';

const PageMain = () => {

  const { Title } = Typography;
  const [userList, setUserList] = useState([])
  const [initUserList, setInitUserList] = useState([])
  const [typeSorting, setTypeSorting] = useState({
    desc: false,
  })
  const [loader, setLoader] = useState(false)

  const applicationServiсes = new ApplicationServiсes()
  useEffect(() => {
    setLoader(true)
    applicationServiсes.getListUsers().then((list) => {
      
      const sortList:any = [...list]
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
      <Header />
      <div className='page-main__wrap'>
        <Title level={3}>Список пользователей</Title>
        <Input
          placeholder="Поиск по имени"
          onChange={value => onSearch(value)} />
        <div className='page-main__list'>
          <div className='page-main__sort'>
          {typeSorting.desc?<SortAscendingOutlined style={{ fontSize: '30px', color: '#08c' }} onClick={() => sorting()} />:
            <SortDescendingOutlined style={{ fontSize: '30px', color: '#08c' }} onClick={() => sorting()} />}
          </div>
          {userList.map((user: any) => {
            return (
              <div>{user.id} {user.username}</div>
            )
          })}
        </div>
      </div>
    </div>
  );
};



export default PageMain