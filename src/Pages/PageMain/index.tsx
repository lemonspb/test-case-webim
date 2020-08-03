import React,{ useState, useEffect } from 'react';
import { Typography,Spin, Alert} from 'antd';
import Header from '../../Components/Header';
import './style.scss';
import { Input } from 'antd';
import ApplicationServiсes from '../../Services'

  const PageMain = () => {

    const { Title } = Typography;
    const [userList, setUserList ] = useState([])
    const [initUserList, setInitUserList ] = useState([])
    const [loader, setLoader] = useState(false)
    const applicationServiсes =  new ApplicationServiсes()
    useEffect(()=>{
      applicationServiсes.getListUsers().then((list:any)=>{
        setLoader(true)
        setUserList(list)
        setInitUserList(list)
        setLoader(false)
      })
    },[])



   const onSearch = (event:any) =>{
     const filterUserList  = [...userList]
     setUserList(filterUserList.filter((user:any)=>user.username.toLowerCase().startsWith(event.target.value.toLowerCase().trimStart())))
     if(event.target.value === ''){
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
      onChange={value => onSearch(value)}/>
      <div className='page-main__list'>
      {loader &&  <Spin tip="Loading...">
     
  </Spin>}
  {userList.map((user:any)=>{
          return (
          <div>{user.username}</div>
          )
        })}
      </div>
        </div>  
        </div>
        );
  };
  


  export default PageMain