import React from 'react';
import { PageHeader, Button } from 'antd';
import ApplicationServiсes from '../../Services'
import { withRouter } from 'react-router-dom';




const Header = (props: any) => {
    const applicationServiсes = new ApplicationServiсes();

    const exit = () => {
        applicationServiсes.exit()
        props.history.push('/login');
    }


    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Webim"
                subTitle="Главная страница"
                extra={[
                    <Button key="1" type="primary" onClick={() => exit()}>
                        Выход
            </Button>,
                ]}
            />
        </div>

    )
}

export default withRouter(Header)