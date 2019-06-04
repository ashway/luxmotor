import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import Services from '../components/services.jsx';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import InnerPageOrderForm from '../components/innerPageOrderForm.jsx';
import InnerPageHeader from '../components/innerPageHeader.jsx';
import "../scss/style.scss"

export default () => {

    const mapState = { center: [56.838471, 60.612194], zoom: 16 };

    return (
        <div>
            <Header
                title="Контакты Lux Motor"
                description="Адрес и телефон компании по прокату премиум-машин в Екатеринбурге Lux Motor" />

            <div className="base-content">

                <InnerPageHeader caption="Контакты Lux Motor" background="static/img/background/contact.jpg" />

                <div className="content mb50minus contact-page">

                    <div className="inner-page-text">
                        <div className="h3 mb10">Наш адрес</div>
                        <div className="h2 mb20 bold">Карла Либкнехта, 18</div>

                        <div className="h3 mb10">Контактный телефон</div>
                        <div className="mb20" style={{ position: `relative`, display: `inline-block`, paddingLeft: `40px` }}><span className="phone-icon"></span><a href="tel:+79089084811" className="h1 bold">8 908 908 48 11</a></div>

                        <div className="h3 mb10">Мы в мессенджерах и соцсетях</div>
                        <div className="socicons">
                            <a href="https://wa.me/79089084811" className="socialicon round WHATSAPP"></a>
                            <a href="" className="socialicon round TELEGRAM"></a>
                            <a className="socialicon round INSTAGRAM" ></a>
                        </div>
                    </div>

                    <div className="w100 mb60">

                        <div className="h1 mb30">Как нас найти</div>

                        <div className="mb60" style={{ overflow: `hidden`, borderRadius: `15px`, backgroundColor: `#e0e1e2`, height: `400px` }}>
                            <YMaps>
                                <Map style={{ width: `100%`, height: `400px` }} defaultState={mapState}>
                                    <Placemark defaultGeometry={mapState.center}/>
                                </Map>
                            </YMaps>
                        </div>
                        <InnerPageOrderForm />
                    </div>
                </div>
            </div>
            <Services/>
            <Footer/>
        </div>
    )
};