import "../scss/style.scss"

export default () => {
    return (
        <div className="inner-page-request-call-form">
            <div className="h-form">
                <div className="h2" style={{ textAlign: `left`}}>Заказать автомобиль</div>
                <div className="h-fields">
                    <div><input className="fio-field text-field w100" placeholder="ФИО"/></div>
                    <div><input className="phone-field text-field w100" placeholder="Контактный телефон"/></div>
                    <div><div className="sendMailButton button" style={{ whiteSpace: `nowrap`}}>Оставить заявку</div></div>
                </div>
            </div>

            <div className="form-message h3">
                <div className="h1">Спасибо!<br/>В ближайшее время мы свяжемся с Вами.</div>
            </div>
        </div>
    )
}