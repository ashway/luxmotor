import "../scss/style.scss"
import Link from 'next/link';

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
                    <Link href="/terms"><a>Условия аренды</a></Link>
                    <Link href="/cars/premium/w222"><a>Парк автомобилей</a></Link>
                    <Link href="/workwithus"><a>Работайте с нами</a></Link>
                    <Link href="/contact"><a>Контакты</a></Link>
                </div>
            </div>
        </div>
    )
}