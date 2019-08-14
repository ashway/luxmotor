import React from 'react'
import "../scss/style.scss"
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import Services from '../components/services.jsx';
import InnerPageHeader from '../components/innerPageHeader.jsx';
import "../scss/style.scss"

class Error extends React.Component {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return { statusCode }
    }

    render() {
        return (
            <div>
                <Header
                    title="Error 404"
                    description="" />
                <div className="base-content">
                    <InnerPageHeader caption="" background="static/img/background/contact.jpg" />
                    <div className="content mb50minus error404-page">
                        <div>404</div>
                        <div>ошибка</div>
                    </div>
                </div>
                <Services/>
                <Footer/>
            </div>
        )
    }
}

export default Error