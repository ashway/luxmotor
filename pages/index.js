import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import Services from '../components/services.jsx';
import CarModel from '../components/carmodel.jsx';
import InnerPageOrderForm from '../components/innerPageOrderForm.jsx';
import _ from 'lodash';
import "../scss/style.scss"

export default () => {
    return (
    <div>
        <Header
            title="Аренда автомобиля с водителем в Екатеринбурге. Автомобили премиум-класса напрокат, VIP-автомобили. Lux Motor"
            description="Прокат автомобилей с водителем в Екатеринбурге. Машины премиум-класса, лимузины, минивэны, автобусы, ретроавтомобили на любой случай. Lux Motor" />

        <div className="base-content">

            <div className="header background-img mb40" style={{ backgroundImage: 'url(/static/img/background/4.jpg)'} }>

                <div className="bg-mask top">
                    <div/>
                    <div className="central"/>
                    <div/>
                </div>
                <div className="bg-mask bottom">
                    <div/>
                    <div className="central">
                        <div className="bottom-bg-mask"/>
                    </div>
                    <div/>
                </div>

                <div className="content flex-block space-between stretch">
                    <div className="logo w100"><a href="/"/></div>
                    <div className="top-contacts">
                        <h2 className="h3 mb10">Прокат автомобилей в Екатеринбурге</h2>
                        <div className="hc-phone"><span className="phone-icon"/><a href="tel:+79089084811" className="h2 bold">8 908 908 48 11</a></div>
                        <div className="hc-social">
                            <a href="https://wa.me/79089084811" className="socialicon round WHATSAPP"/>
                            <a href="" className="socialicon round TELEGRAM"/>
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="h-caption">
                        <div className="c1">Премиум-автомобили на любой случай</div>
                        <div className="c2">Лучшие цены. Удобный заказ на сайте</div>
                    </div>

                    <div className="flex-block space-between">
                        <div className="h-menu">
                            <div><a href="/cars/premium/w222" className="button">Парк автомобилей</a></div>
                            <div><a href="/terms" className="button">Условия аренды</a></div>
                            <div><a href="/contact" className="button">Контакты</a></div>
                        </div>

                        <InnerPageOrderForm type="index-page"/>

                    </div>
                </div>
            </div>

            <div className="content flex-block">

                <div className="we-are-best-container show-from-tablet">

                    <div className="we-are-best">
                        <div className="icon" style={{ backgroundImage: 'url(/static/img/sclass.jpg)'}}/>
                        <div>
                            <div className="h3">Премиум-класс</div>
                            <div className="h1">от <span className="bold blue">1200р</span><span className="h3"> в час</span></div>
                        </div>
                    </div>

                    <div className="we-are-best">
                        <div className="icon" style={{backgroundImage: 'url(/static/img/vclass.jpg)'}}/>
                        <div>
                            <div className="h3">Минивэны</div>
                            <div className="h1">от <span className="bold blue">1300р</span><span className="h3"> в час</span></div>
                        </div>
                    </div>

                    <div className="we-are-best">
                        <div className="icon" style={{backgroundImage: 'url(/static/img/sprinter.jpg)'}}/>
                        <div>
                            <div className="h3">Микроавтобусы</div>
                            <div className="h1">от <span className="bold blue">1200р</span><span className="h3"> в час</span></div>
                        </div>
                    </div>

                    <div className="we-are-best">
                        <div className="icon" style={{backgroundImage: 'url(/static/img/eclass.jpg)'}}/>
                        <div>
                            <div className="h3">Бизнес-класс</div>
                            <div className="h1">от <span className="bold blue">700р</span><span className="h3"> в час</span></div>
                        </div>
                    </div>

                </div>
                <div className="first-text w100 mb60">
                    <h1 className="h1 mb30 bold">Аренда автомобиля с водителем</h1>

                    <div className="tajistify">
                        <p>Свадьба, трансфер из аэропорта, деловые поездки, встреча из роддома – с помощью Lux Motor вы без труда сможете не только арендовать VIP-автомобили с водителем в Екатеринбурге по самым разным поводам, но и подчеркнуть высокий статус мероприятия. Большой выбор машин премиум-класса, а также микроавтобусы, минивэны, автобусы, лимузины и ретроавтомобили к вашим услугам!</p>

                        <div className="best-about-us">
                            <div>
                                <div style={{ backgroundImage: 'url(/static/img/care.png)'}}/>
                                <div className="h3 bold">Надежно</div>
                            </div>

                            <div>
                                <div style={{ backgroundImage: 'url(/static/img/time.png)' }}/>
                                <div className="h3 bold">Вовремя</div>
                            </div>

                            <div>
                                <div style={{ backgroundImage: 'url(/static/img/icon2.png)' }}/>
                                <div className="h3 bold">Безопасно</div>
                            </div>
                        </div>

                        <p>10-летний опыт работы Lux Motor позволяет нам гарантировать точность выполнения вашего заказа. Всегда вовремя и по самым приятным ценам мы организуем прокат автомобилей с водителем в Екатеринбурге.</p>
                    </div>
                </div>
            </div>

            <div className="content mb40 hide-after-mobile">

                <div className="h1 bold tacenter mb40">Наши цены</div>

                <div className=" we-are-best-container">
                    <div className="we-are-best">
                        <div className="icon" style={{ backgroundImage: 'url(/static/img/sclass.jpg)' }}/>
                        <div>
                            <div className="h3">Премиум-класс</div>
                            <div className="h2">от <span className="bold blue">1200р</span><span className="h3"> в час</span></div>
                        </div>
                    </div>

                    <div className="we-are-best">
                        <div className="icon" style={{ backgroundImage: 'url(/static/img/vclass.jpg)' }}/>
                        <div>
                            <div className="h3">Минивэны</div>
                            <div className="h2">от <span className="bold blue">1300р</span><span className="h3"> в час</span></div>
                        </div>
                    </div>

                    <div className="we-are-best">
                        <div className="icon" style={{ backgroundImage: 'url(/static/img/sprinter.jpg)' }}/>
                        <div>
                            <div className="h3">Микроавтобусы</div>
                            <div className="h2">от <span className="bold blue">1200р</span><span className="h3"> в час</span></div>
                        </div>
                    </div>

                    <div className="we-are-best">
                        <div className="icon" style={{ backgroundImage: 'url(/static/img/eclass.jpg)' }}/>
                        <div>
                            <div className="h3">Бизнес-класс</div>
                            <div className="h2">от <span className="bold blue">700р</span><span className="h3"> в час</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <Services/>

            <div className="content mb40 hide-after-mobile">
                <InnerPageOrderForm/>
            </div>
            <div className="content mb60 mt20">
                <div className="h1 bold tacenter mb40">У нас вы можете заказать</div>
                <div className="auto-card-container align-center">
                    {_.map(['w222','w221','camry','HigerKLQ6826Qurl','sprinter','range','vclass','tlc200','viano','eclass'], alias=><CarModel key={alias} alias={alias}/>)}
                </div>
            </div>
            <Footer/>
        </div>
    </div>
    )
}