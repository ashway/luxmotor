import Link from 'next/link'
import "../scss/style.scss";

export default () => {
    return (
        <div className="content">
            <div className="h1 bold tacenter mb40">Услуги</div>

            <div className="service-card-container">
                <Link href="/service/premium">
                    <a className="service-card"><div style={{ backgroundImage: 'url(/static/img/service/sclass.jpg)' }}></div>
                    <div className="h3">Автомобили премиум класса</div></a>
                </Link>

                <Link href="/service/minivan">
                    <a className="service-card"><div style={{ backgroundImage: 'url(/static/img/service/miniven.jpg)' }}></div>
                    <div className="h3">Минивэны</div></a>
                </Link>

                <Link href="/service/retro">
                    <a className="service-card"><div style={{ backgroundImage: 'url(/static/img/service/retro.jpg)' }}></div>
                    <div className="h3">Ретроавтомобили</div></a>
                </Link>

                <Link href="/service/bus">
                    <a className="service-card"><div style={{ backgroundImage: 'url(/static/img/service/microbus.jpg)' }}></div>
                    <div className="h3">Автобусы</div></a>
                </Link>

                <Link href="/service/cortege">
                    <a className="service-card"><div style={{ backgroundImage: 'url(/static/img/service/kortage.jpg)' }}></div>
                    <div className="h3">Кортежи</div></a>
                </Link>

                <Link href="/service/wedding">
                    <a className="service-card"><div style={{ backgroundImage: 'url(/static/img/service/wedding.jpg)' }}></div>
                    <div className="h3">Автомобиль на свадьбу</div></a>
                </Link>

                <Link href="/service/transfer">
                    <a className="service-card"><div style={{ backgroundImage: 'url(/static/img/service/aeroport.jpg)' }}></div>
                    <div className="h3">Трансфер в аэропорт</div></a>
                </Link>

                <Link href="/service/business">
                    <a className="service-card"><div style={{ backgroundImage: 'url(/static/img/service/business.jpg)' }}></div>
                    <div className="h3">Бизнес-поездки</div></a>
                </Link>

                <Link href="/service/meeting">
                    <a className="service-card"><div style={{ backgroundImage: 'url(/static/img/service/baby.jpg)' }}></div>
                    <div className="h3">Встреча из роддома</div></a>
                </Link>

            </div>
        </div>
    )
}