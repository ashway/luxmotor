import "../scss/style.scss"

export default () => {
    return (
        <div className="footer">
            <div className="content h3 mb20">Прокат автомобилей в Екатеринбурге</div>
            <div className="content flex-block space-between fb-vbottom">
                <div className="w100">
                    <div className="footer-phone mb30"><a href="tel:+79089084811" className="h2 white bold">8 908 908 48 11</a></div>
                    <div>© 2019</div>
                </div>
                <div className="f-menu">
                    <a href="/terms">Условия аренды</a>
                    <a href="/cars/premium/w222">Парк автомобилей</a>
                    <a href="/contact">Контакты</a>
                </div>
            </div>
        </div>
    )
}