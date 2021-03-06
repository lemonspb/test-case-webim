import React from 'react';
import { PageHeader, Button } from 'antd';
import ApplicationServiсes from '../../Services';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Header extends RouteComponentProps<any> {
    openModal: Function
}



const Header = (props: Header) => {
    const applicationServiсes = new ApplicationServiсes();

    const exit = () => {
        applicationServiсes.exit()
        props.history.push('/login')
    }


    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Webim"
                ghost={false}
                subTitle="Главная страница"
                extra={[
                    <Button key="1" type="primary" danger onClick={() => props.openModal()}>
                        Создать пользователя
                  </Button>,
                    <Button key="2" type="primary" onClick={() => exit()}>
                        Выход
                    </Button>,
                ]}
            />
        </div>

    )
}

export default withRouter(Header)