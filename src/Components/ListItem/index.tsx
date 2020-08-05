import React from 'react';
import './style.scss';




const ListItem = (props: any) => {
    
  const  {id, username}  =  props.user 

    return (
        <div className='listIten'>
                {username}
        </div>

    )
}

export default ListItem