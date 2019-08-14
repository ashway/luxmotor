import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import Services from '../components/services.jsx';
import React from "react";
import InnerPageOrderForm from '../components/innerPageOrderForm.jsx';
import InnerPageHeader from '../components/innerPageHeader.jsx';
import _ from 'lodash';
import Link from 'next/link'
import "../scss/style.scss"
import Car from '../components/car.jsx';
import Error from './_error.js';
import axios from 'axios';

let classListArr = [
    { alias: 'premium', name: 'Премиум-класс'},
    { alias: 'business', name: 'Бизнес-класс'},
    { alias: 'minivan', name: 'Минивэны'},
    { alias: 'microbus', name: 'Микроавтобусы'},
    { alias: 'suv', name: 'Внедорожники'},
    { alias: 'bus', name: 'Автобусы' },
    { alias: 'retro', name: 'Ретроавтомобили' },
    { alias: 'limousine', name: 'Лимузины' },
];

class CarsPage extends React.Component {

    state = { mobileOpen: false, loadingCars: true };

    static async getInitialProps({asPath}) {

        //-- Список моделей
        let markListArr  = await axios.get('https://api.lux-motor.ru/mark/list');
        let markList = _.keyBy(markListArr.data, 'alias');

        let modelListArr = await axios.get('https://api.lux-motor.ru/model/list');
        let modelList = _.keyBy(modelListArr.data, 'alias');
        _.each(modelList, m=>m.markName = (markList[m.mark]||{}).name);

        let modelListGroups = _.groupBy(modelList, 'class');
        let classList = _.keyBy(classListArr, 'alias');

        _.each(classList, c=>{
        if(
            !modelList[c.alias] &&
            modelListGroups &&
            modelListGroups[c.alias] &&
            _.isArray(modelListGroups[c.alias]) &&
            modelListGroups[c.alias].length>0) {
            c.sub = modelListGroups[c.alias];
        }
        });
        let split = asPath.split('/');
        let page = split[3] || split[2];
        if(!page) page = 'w222';

        //-- Запрашиваем список тачек
        let carListArr = await axios.get(`https://api.lux-motor.ru/car/list/${page}`);
        let carList = carListArr.data;

        if(modelList[page].is_group) {
            _.each(carList, c=>{
                c.showModel = true;
                c.markName = (markList[c.mark]||{}).name;
                c.modelName = (modelList[c.model]||{}).name;
            });
        }
        return { page, catalog: classList, markList, modelList, carList }
    }

    componentDidMount() {
        this.setState({ carList: this.props.carList, loadingCars: false });
    }

    toggleMobileCatalogList = () => { this.setState({ mobileOpen: !this.state.mobileOpen })};

    render() {
        let page = this.props.page;
        let model  = this.props.modelList[page];

        return (model)?(
            <div>
                <Header title="Каталог автомобилей премиум-класса на заказ в Екатеринбурге. Lux Motor" description="Каталог Lux Motor - прокат премиум-автомобилей с водителем в Екатеринбурге" />
                <div className="base-content">
                    <InnerPageHeader caption="Парк автомобилей" background="static/img/background/cars.jpg" />
                    <div className="content mb50minus service-page">

                        <div className="inner-page-text show-from-tablet">
                            <div className="taleft h2 bold">Категории автомобилей</div>
                            <div className="cars-list">
                                {_.map(this.props.catalog, item=><div key={item.alias}>
                                    { (item.sub)?<div>
                                    <div className="h3 blue">{item.name}</div>
                                        <div>
                                            {_.map(item.sub, subitem=><Link key={subitem.alias} href={`/cars/${item.alias}/${subitem.alias}`}><a className={`bold ${(subitem.alias==page)?'active':''}`}><span className="mr5">{subitem.markName}</span><span>{subitem.name}</span></a></Link>)}
                                        </div>
                                    </div>:<div><Link href={`/cars/${item.alias}`}><a className={`h3 blue ${(item.alias==page)?'active':''}`}>{item.name}</a></Link></div> }
                                </div>)}
                            </div>
                        </div>

                        <div className="w100 mb60">

                            <div className="mb30 flex-block fb-from-wide">
                                <div className="h1 bold w100 mr30 show-from-tablet"><span className="mr10">{model.markName || ''}</span><span>{model.name || ''}</span></div>

                                <div className="inner-page-text hide-after-mobile">
                                    <div className={`current-car-mobile taleft h2 bold ${(this.state.mobileOpen)?'opened':''}`} onClick={()=>this.toggleMobileCatalogList()}>{`${model.markName || ''} ${model.name || ''}`}</div>
                                    <div className={`cars-list-mobile ${(this.state.mobileOpen)?'show':''}`}>
                                        {_.map(this.props.catalog, item=>(item.sub)?
                                            _.map(item.sub, subitem=><Link key={subitem.alias} href={`/cars/${item.alias}/${subitem.alias}`}><a className={`bold ${(subitem.alias==page)?'active':''}`}><span className="mr5">{subitem.markName}</span><span>{subitem.name}</span></a></Link>):
                                            <Link key={item.alias} href={`/cars/${item.alias}`}><a className={`bold ${(item.alias==page)?'active':''}`}>{item.name}</a></Link>) }
                                    </div>
                                </div>

                                <div className="cars-price">
                                    <div>
                                        <div>Время</div>
                                        <div className="h3 bold nowrap blue">{`от ${model.mintime || '3'} часов`}</div>
                                    </div>
                                    <div>
                                        <div>Цена</div>
                                        <div className="h3 bold nowrap blue">{`от ${model.price}р в час`}</div>
                                    </div>
                                    {(model.outcity_price && model.outcity_price>0)?<div>
                                        <div>Пригород</div>
                                        <div className="h3 bold nowrap blue">{`от ${model.outcity_price}р за км`}</div>
                                    </div>:null}
                                </div>

                            </div>
                            {(this.state.loadingCars)?<div/>:
                                (this.state.carList && this.state.carList.length>0)?<div className="auto-card-container small" style={{ marginBottom: 0 }}>
                                {_.map(this.state.carList, (item, i)=><Car key={i} data={item}/>)}
                            </div>:<div className="h2 tacenter mb60">К сожалению, на данный момент мы не можем предложить вам автомобили этого класса</div>}

                            <div className="mb40 mt20 extrasmall-font flex-block">
                                <div className="attention mr20">!</div>
                                <div>
                                    <div>Междугородний пробег оплачивается в обе стороны</div>
                                    <div>Дополнительно оплачивается подача и возврат за пределы Екатеринбурга</div>
                                </div>
                            </div>

                            <InnerPageOrderForm/>
                        </div>
                    </div>
                </div>
                <Services/>
                <Footer/>
            </div>
        ):<Error statusCode="404"/>
    }
}

export default CarsPage;