import React,{ useState, useEffect } from 'react';
import { Typography,Spin, Alert} from 'antd';
import Header from '../../Components/Header';
import './style.scss';
import { Input } from 'antd';
import ApplicationServiсes from '../../Services'
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';

  const PageMain = () => {

    const { Title } = Typography;
    const [userList, setUserList ] = useState([])
    const [initUserList, setInitUserList ] = useState([])
    const [typeSorting, setTypeSorting ] = useState({
      desc: false,
      asc: false,
    })
    const [loader, setLoader] = useState(false)
    const applicationServiсes =  new ApplicationServiсes()
    useEffect(()=>{
      applicationServiсes.getListUsers().then((list)=>{
        setLoader(true)
        setUserList(list)
        setInitUserList(list)
        setLoader(false)
      })
    },[])


    const descSorting  = () => {
      setTypeSorting({
        desc:!typeSorting.desc,
        asc:false 
      })
      const sortList = [...userList]
      sortList.sort(function (a:any, b:any) {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });
      !typeSorting.desc && !typeSorting.asc?setUserList(initUserList):setUserList(sortList)
    }
    const  ascSorting  = async () => {
      const sortList = [...userList]
      setTypeSorting({
        desc: false,
        asc:!typeSorting.asc,
      })
      sortList.sort(function (a:any, b:any) {
        if (a.id < b.id) {
          return 1;
        }
        if (a.id > b.id) {
          return -1;
        }
        return 0;
      });
    !typeSorting.desc && !typeSorting.asc?setUserList(initUserList):setUserList(sortList)
    }

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
        <div className='page-main__sort'>
        <SortAscendingOutlined style={{ fontSize: '30px', color: typeSorting.asc?'red': '#08c'}} onClick={()=>ascSorting()} />
        <SortDescendingOutlined style={{ fontSize: '30px', color: typeSorting.desc?'red': '#08c'}} onClick={()=>descSorting()}  />
        </div>
  {userList.map((user:any)=>{
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