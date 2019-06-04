import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import Services from '../components/services.jsx';
import InnerPageOrderForm from '../components/innerPageOrderForm.jsx';
import InnerPageHeader from '../components/innerPageHeader.jsx';
import "../scss/style.scss"

export default () => {
    return (
        <div>
            <Header
                title="Условия аренды автомобилей Lux Motor"
                description="Условия аренды автомобилей премиум-класса в Екатеринбурге от компании Lux Motor" />

            <div className="base-content">

                <InnerPageHeader caption="Условия аренды" background="static/img/background/terms.jpg" />

                <div className="content mb50minus terms-page">

                    <div className="inner-page-text show-from-tablet">
                        <div className="h2"><a>Условия аренды автомобилей Lux Motor</a></div>
                        <div className="h2"><a>Как быть, если поменялись планы</a></div>
                        <div className="h2"><a>Чего нельзя делать в арендованном автомобиле</a></div>
                        <div className="h2"><a>Наши гарантии</a></div>
                    </div>

                    <div className="w100 mb60">

                        <div className="h1 mb40">Условия аренды автомобилей Lux Motor</div>
                        <div className="mb30">
                            <li className="mb10">Оформить заказ можно у нас в офисе (<a href="/contact" className="blue">Карла Либкнехта, 18</a>) или по телефону +7 908 908 48 11</li>
                            <li className="mb10">Для оформления договора аренды вам понадобится документ, удостоверяющий личность. Лучше всего паспорт</li>
                            <li className="mb10">Необходимо внести предоплату в размере 50% от общей стоимости заказа. Оставшиеся 50% оплачиваются не позднее 5 дней до даты заказа</li>
                            <li className="mb10">За 1 день до даты заказа мы свяжемся с вами, чтобы подтвердить заказ</li>
                            <li className="mb10">Автомобиль подается точно в срок в указанное вами время и место</li>
                            <li className="mb10">Минимальный срок аренды любого автомобиля 3 часа</li>
                        </div>

                        <div className="h1">Как быть, если поменялись планы</div>
                        <div className="mb30">Если у вас изменились планы – нужен автомобиль на более длительный/короткий срок, на другую дату, в другое время, необходимо заранее связаться с нами любым удобным для вас способом и сообщить о корректировках заказа.</div>

                        <div className="h1">Чего нельзя делать в арендованном автомобиле</div>
                        <div className="mb30">
                            <div className="mb15"> Наши автомобили находятся в отличном состоянии. Чтобы их состояние радовало наших клиентов и в дальнейшем, в салонах машин запрещается:</div>
                            <div  style={{paddingLeft: `40px`}}>
                                <li className="mb10">курить</li>
                                <li className="mb10">открывать бутылки с шампанским</li>
                                <li className="mb10">употреблять напитки и продукты питания, которые могут испачкать или повредить салон</li>
                            </div>
                        </div>

                        <div className="h1">Наши гарантии:</div>
                        <div className="mb30">
                            <div>1. Мы гарантируем предоставление автомобиля вовремя и в надлежащем виде.</div>
                            <div>2. В случае возникновения форс-мажора (техническая поломка, ДТП, прокол колеса и т.п.), мы гарантируем замену заказанного вами автомобиля на аналогичный или автомобиль более высокого класса.</div>
                        </div>

                        <div className="h2 mb60">В случае возникновения вопросов вы всегда можете связаться с нами по телефону +7 908 908 48 11</div>

                        <InnerPageOrderForm />
                    </div>
                </div>

                <Services/>

            </div>
            <Footer/>
        </div>
    )
};