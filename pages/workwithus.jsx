import React, { useEffect, useState } from "react";
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import InnerPageHeader from '../components/innerPageHeader.jsx';
import InputMask from 'react-input-mask';
import {useDropzone} from 'react-dropzone';
import _ from 'lodash';

import "../scss/style.scss";

function PhotoLoader(props) {
    const [files, setFiles] = useState([]);
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = acceptedFiles.map(file => (
        <div key={file.name}><div style={{backgroundImage: `url(${file.preview})`}}/></div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div className="container car-photos-loader">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Скиньте в эту область фотографии или кликните чтобы открыть окно выбора</p>
                {(thumbs && _.isArray(thumbs) && thumbs.length>0)?<div className="file-list">
                    {thumbs}
                </div>:null}
            </div>
        </div>
    );
}

class WorkWithUsPage extends React.Component {

    state = {
        isPhoneValidateSent: false,
        isPhoneValid: false,
        resendTimer: 120,
        showTimer: true,
        files: [],
        formSent: false
    };

    tickTimer = () => {
        let timer = this.state.resendTimer - 1;
        if(timer==0) clearInterval(this.intervalHandle);
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

    formSend = () => {
        this.setState({ formSent: true });
    };

    render() {
        return (
            <div>
                <Header
                    title=""
                    description=""/>

                <div className="base-content">

                    <InnerPageHeader caption="Работа с нами" background="static/img/background/terms.jpg"/>

                    <div className="content mb50minus terms-page">

                        <div className="inner-page-text show-from-tablet">

                        </div>

                        <div className="w100 mb60">


                            <div className="newdriver-form mbtw20">

                                {(!this.state.formSent)?<div>
                                    <div className="h2 bold">Анкета водителя</div>

                                    <div className="form">
                                        {(!this.state.isPhoneValid)?<div>Для начала давайте подтвердим ваш номер телефона</div>:null}
                                        <div className="flex-block"><InputMask className="text-field w100" {...this.props} mask="+7(999) 999 99 99" placeholder="Номер телефона" maskChar=" " />{(!this.state.isPhoneValidateSent)?<div className="button nowrap" onClick={()=>this.validatePhone()}>Подтвердить номер</div>:null}</div>
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
                                        <div>Продолжим, укажите ваше ФИО и загрузите фотографии машин</div>
                                        <div><input type="text" className="text-field w100" placeholder="Как к вам обращаться?"/></div>
                                        <div className="h3">Фотографии автомобилей</div>

                                        <div>
                                            <div className="mb15">Пожалуйста никак не обрабатывайте фотографии.</div>
                                            <div>Наши специалисты самостоятельно произведут <span className="bold">обработку фотографий</span> и так же <span className="bold">скроют автономера</span></div>
                                        </div>

                                        <PhotoLoader/>

                                        <div className="taright"><div className="button" onClick={this.formSend.bind(this)}>Отправить</div></div>
                                    </div>:null}
                                </div>:
                                <div>
                                    <div className="h2">Спасибо за регистрацию в нашей компании</div>
                                    <div>Наши специалисты обработают фотографии ваших машин, добавлят в каталог и свяжутся с вами для согласования дальнейших действий</div>
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