import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import Services from '../components/services.jsx';
import React from "react";
import InnerPageOrderForm from '../components/innerPageOrderForm.jsx';
import InnerPageHeader from '../components/innerPageHeader.jsx';
import CarModel from '../components/carmodel.jsx';
import _ from 'lodash';
import Link from 'next/link'
import carsCatalog from '../infolib/carmodels.js';
import "../scss/style.scss"
import catalog from '../infolib/carcatalog.js';
import carList from '../infolib/cars.js';
import Car from '../components/car.jsx';
import Error from './_error.js';

class CarsPage extends React.Component {

    state = { mobileOpen: false };

    static async getInitialProps({asPath}) {
        let split = asPath.split('/');
        let page = split[3] || split[2];
        if(!page) page = 'w222';
        return { page }
    }

    toggleMobileCatalogList = () => { this.setState({ mobileOpen: !this.state.mobileOpen })};

    render() {
        let page = this.props.page;
        let model  = carsCatalog[page];
        let carInfo = carList[page];
        return (model)?(
            <div>
                <Header title="Каталог автомобилей премиум-класса на заказ в Екатеринбурге. Lux Motor" description="Каталог Lux Motor - прокат премиум-автомобилей с водителем в Екатеринбурге" />
                <div className="base-content">
                    <InnerPageHeader caption="Парк автомобилей" background="static/img/background/cars.jpg" />
                    <div className="content mb50minus service-page">

                        <div className="inner-page-text show-from-tablet">
                            <div className="taleft h2 bold">Категории автомобилей</div>
                            <div className="cars-list">
                                {_.map(catalog, item=><div  key={item.alias}>
                                    { (item.sub)?<div>
                                    <div className="h3 bold">{item.name}</div>
                                        <div>
                                            {_.map(item.sub, subitem=><Link key={subitem.alias} href={`/cars/${item.alias}/${subitem.alias}`}><a className={`${(subitem.alias==page)?'active':''}`}>{subitem.name}</a></Link>)}
                                        </div>
                                    </div>:<div><Link href={`/cars/${item.alias}`}><a className={`h3 bold ${(item.alias==page)?'active':''}`}>{item.name}</a></Link></div> }
                                </div>)}
                            </div>
                        </div>


                        <div className="w100 mb60">

                            <div className="mb30 flex-block fb-from-wide">
                                <div className="h1 w100 mr60 show-from-tablet">{`${model.mark || ''} ${model.model || ''}`}</div>

                                <div className="inner-page-text hide-after-mobile">
                                    <div className={`current-car-mobile taleft h2 bold ${(this.state.mobileOpen)?'opened':''}`} onClick={()=>this.toggleMobileCatalogList()}>{`${model.mark || ''} ${model.model || ''}`}</div>
                                    <div className={`cars-list-mobile ${(this.state.mobileOpen)?'show':''}`}>
                                        {_.map(catalog, item=>(item.sub)?
                                            _.map(item.sub, subitem=><Link key={subitem.alias} href={`/cars/${item.alias}/${subitem.alias}`}><a className={`${(subitem.alias==page)?'active':''}`}>{subitem.name}</a></Link>):
                                            <Link key={item.alias} href={`/cars/${item.alias}`}><a className={`${(item.alias==page)?'active':''}`}>{item.name}</a></Link>) }
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
                                    {(model.runprice && model.runprice>0)?<div>
                                        <div>Пригород</div>
                                        <div className="h3 bold nowrap blue">{`от ${model.runprice}р за км`}</div>
                                    </div>:null}
                                </div>

                            </div>
                            {(carInfo && carInfo.length>0)?<div className="auto-card-container small" style={{ marginBottom: 0 }}>
                                {_.map(carInfo, (item, i)=><Car key={i} index={i+1} model={page} data={item}/>)}
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