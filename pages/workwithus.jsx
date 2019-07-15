import React, { useEffect, useState } from "react";
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import InnerPageHeader from '../components/innerPageHeader.jsx';
import InputMask from 'react-input-mask';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import axios from 'axios';

import "../scss/style.scss";

class WorkWithUsPage extends React.Component {

    state = {
        isPhoneValidateSent: true,
        isPhoneValid: true,
        resendTimer: 120,
        showTimer: true,
        files: [],
        formSending: false,
        formSent: false,
        phone: '',
        invalidPhone: false,
        name: '',
        invalidName: false,
        price: '',
        invalidPrice: false,
        loadingPercent: 0,
        hasNoImages: false
    };

    tickTimer = () => {
        let timer = this.state.resendTimer - 1;
        if(timer===0) clearInterval(this.intervalHandle);
        this.setState({ resendTimer: timer });
    };

    validatePhone = () => {
        this.setState({isPhoneValidateSent: true});
        this.intervalHandle = setInterval(this.tickTimer, 1000);
    };

    resendCode = () => {
        this.setState( { resendTimer: 120 });
        this.intervalHandle = setInterval(this.tickTimer, 1000);
    };

    handleDrop = (files) => {
        this.setState({ files });
    };

    handleCode = (e) => {
        if(e.target.value.length===4) {
            clearInterval(this.intervalHandle);
            this.setState({ isPhoneValid: true, showTimer: false });
        }
    };

    formSend = async () => {

        let canSend = true;

        if(!this.state.phone.length) {
            this.setState({ invalidPhone: true  });
            canSend = false;
        }

        if(!this.state.name.length) {
            this.setState({ invalidName: true  });
            canSend = false;
        }

        if(!this.state.price.length) {
            this.setState({ invalidPrice: true  });
            canSend = false;
        }

        if(!this.state.files.length) {
            this.setState({ hasNoImages: true  });
            canSend = false;
        }

        if(canSend) {
            let formData = new FormData();
            formData.append("phone", this.state.phone);
            formData.append("name", this.state.name);
            formData.append("price", this.state.price);
            if(this.state.files && this.state.files.length>0) _.forEach(this.state.files, file=>formData.append("photos[]", file, file.name));
            this.setState({ formSending: true });
            await axios.post(`/api/uploadUserImage`, formData, {
                onUploadProgress: (progressEvent) => {
                    this.setState({ loadingPercent: Math.round( (progressEvent.loaded * 100) / progressEvent.total ) });
                }
            });
            this.setState({ formSent: true });
        }
    };

    onDropHandle = (acceptedFiles) => {
        this.setState({hasNoImages: false, files:  _.concat(this.state.files, acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })))});
    };

    removeFileHandle = (e, index) => {
        e.stopPropagation();
        let files = this.state.files;
        files.splice(index, 1);
        this.setState({ files });
    };

    handlePhone = (e) => {
        this.setState({ phone: e.target.value, invalidPhone: false });
    };

    handleName = (e) => {
        this.setState({ name: e.target.value, invalidName: false });
    };

    handlePrice = (e) => {
        this.setState({ price: e.target.value, invalidPrice: false });
    };

    render() {
        return (
            <div>
                <Header
                    title=""
                    description=""/>

                <div className="base-content">

                    <InnerPageHeader caption="Работа с нами" background="static/img/background/terms.jpg"/>

                    <div className="content mb50minus wwa-page">

                        <div className="inner-page-text show-from-tablet">
                            <div className="h2 bold">Водитель! работай с нами</div>
                            <div>Привет, хотим предложить сотрудничество с нами на выгоднях для тебя условиях</div>
                            <div>Если заинтересовало, пожалуйста пройти 4 простых шага</div>
                            <div className="h3 bold">Вливайся в нашу компанду</div>
                        </div>

                        <div className="inner-page-main-content w100 mb60">

                            <div>
                                <div>
                                    <div className="h1 bold">1</div>
                                    <div className="tajistify">Оцени свои машину! Наша компания представляет услуги аренды автомобилей с водителем представительского и бизнес классов, по этому нам интересны машины бизнес-класса <span className="bold">не старше 5 лет</span>, а так же машины представительского класса <span className="bold">не старше 10 лет</span>, если у тебя ретроавтомобиль, лимузин или внежорожник, желательно что бы он был в надежном техничском состояние и с приятных внешнем видом</div>
                                </div>

                                <div>
                                    <div className="h1 bold">2</div>
                                    <div className="tajistify">Хорошо помой свою машину - чистая и красивая машина, залог того что наши клиенты выберут именно её</div>
                                </div>

                                <div>
                                    <div className="h1 bold">3</div>
                                    <div className="tajistify">
                                        <div>Выбери красивое место в городе, например, парковка у входной группы бизнес центра. И сделай несколько фотографий своей машины. Вот несколько примеров достойных фотографий, если получится сделать так же будет замечательно</div>
                                        <div className="images">
                                            <div><div style={{backgroundImage: `url(/static/img/cars/w222/2/1.jpg)`}}/></div>
                                            <div><div style={{backgroundImage: `url(/static/img/cars/w222/2/3.jpg)`}}/></div>
                                            <div><div style={{backgroundImage: `url(/static/img/cars/camry/6/2.jpg)`}}/></div>
                                            <div><div style={{backgroundImage: `url(/static/img/cars/w222/2/4.jpg)`}}/></div>
                                            <div><div style={{backgroundImage: `url(/static/img/cars/m6/1/2.jpg)`}}/></div>
                                            <div><div style={{backgroundImage: `url(/static/img/cars/sprinter/2/4.jpg)`}}/></div>

                                        </div>
                                    </div>
                                </div>


                                <div>
                                    <div className="h1 bold">4</div>
                                    <div className="tajistify">И наконец, заполни в анкете необходимые данные, загрузи фотографии машины и отправь нам. Мы обязательно позвоним и обсудим детали нашего сотрудничества</div>
                                </div>
                            </div>

                            <div className="newdriver-form mbtw20">
                                {(!this.state.formSent)?<div>
                                    <div className="h2 bold">Анкета водителя</div>
                                    <div className="form">
                                        {(!this.state.isPhoneValid)?<div>Для начала давайте подтвердим ваш номер телефона</div>:null}
                                        <div className="flex-block"><InputMask className={`text-field w100 ${(this.state.invalidPhone) ? 'has-error' : ''}`} {...this.props} mask="+7(999) 999 99 99" placeholder="Номер телефона" maskChar=" " value={this.state.phone} onChange={this.handlePhone.bind(this)} />{(!this.state.isPhoneValidateSent)?<div className="button nowrap" onClick={()=>this.validatePhone()}>Подтвердить номер</div>:null}</div>
                                        <div>
                                            {(!this.state.isPhoneValidateSent || this.state.isPhoneValid)?null:
                                                <div>
                                                    <div className="flex-block fb-vcenter">
                                                        <div className="width100">Мы выслали вам SMS с кодом подтверждения</div>
                                                        <div><input type="text" className="text-field big center-text" style={{ width: '110px' }} onChange={this.handleCode.bind(this)} placeholder="Код" maxLength="4"/></div>
                                                    </div>
                                                    <div className="small-font mt20">Не пришел код? {(this.state.resendTimer>0)?<span>Мы вышлем код повторно через <span className="bold">{this.state.resendTimer} сек</span></span>:<span className="cursor blue bold" onClick={()=>this.resendCode()}>Выслать новый код</span>}</div>
                                                </div>}
                                        </div>
                                    </div>
                                    {(this.state.isPhoneValid)?<div className="form">
                                        {/*<div>Продолжим, укажите ваше ФИО, желаемую сумму гонорара за час аренды и загрузите фотографии машин</div>*/}
                                        <div><input type="text" className={`text-field w100 ${(this.state.invalidName) ? 'has-error' : ''}`} value={this.state.name} onChange={this.handleName.bind(this)} placeholder="Как к вам обращаться?"/></div>
                                        <div className="flex-block fb-vcenter"><input type="text" className={`text-field w100 ${(this.state.invalidName) ? 'has-error' : ''}`} value={this.state.price} onChange={this.handlePrice.bind(this)} placeholder="Желаемый гонорар"/><span className="nowrap">руб/час</span></div>
                                        <div className="h3">Фотографии автомобилей</div>

                                        <div>
                                            <div className="mb15">Пожалуйста никак не обрабатывайте фотографии.</div>
                                            <div>Наши специалисты самостоятельно произведут <span className="bold">обработку фотографий</span>, а так же <span className="bold">скроют автономера</span></div>
                                        </div>

                                        <div className="container car-photos-loader">
                                            <Dropzone onDrop={this.onDropHandle}>
                                                {({getRootProps, getInputProps}) => (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p>Скиньте в эту область фотографии или кликните чтобы открыть окно выбора</p>
                                                    {(this.state.files.length>0)?<div className="file-list">
                                                        {_.map(this.state.files, (file, index) => (
                                                            <div key={file.name}><div style={{backgroundImage: `url(${file.preview})`}}><div className="cpl-remove" onClick={(e)=>this.removeFileHandle(e, index)} /></div></div>
                                                        ))}
                                                    </div>:null}
                                                </div>)}
                                            </Dropzone>
                                        </div>

                                        { (this.state.hasNoImages)?<div className="red">Нужно добавить хотя бы одну фотографию машей машины</div>:null }

                                        <div className="taright">
                                            {(!this.state.formSending)?<div className="button" onClick={this.formSend.bind(this)}>Отправить</div>:
                                                <div className="loading-process">
                                                    <div>Идет загрузка фотографий</div>
                                                    <div><div style={{ width: `${this.state.loadingPercent}%`}}/></div>
                                                </div>}

                                        </div>
                                    </div>:null}
                                </div>:
                                <div>
                                    <div className="h2 nomargin">Спасибо за регистрацию в нашей компании</div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default WorkWithUsPage;