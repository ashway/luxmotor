import Link from 'next/link'
import "../scss/style.scss";
import carsList from '../infolib/carmodels.js';

export default (props) => {
    let car = carsList[props.alias];
    return (car)?(car.url)?<Link href={car.url}>
        <a className="auto-card">
            <div style={{ backgroundImage: `url(${car.image})` }}/>
            <div className="h3 bold">{car.mark || ''} {car.model || ''}</div>
            <div className="h4">от <span className="bold blue">{car.price}р</span> за час</div>
        </a>
    </Link>:<a className="auto-card">
        <div style={{ backgroundImage: `url(${car.image})` }}/>
        <div className="h3 bold">{car.mark || ''} {car.model || ''}</div>
        <div className="h4">от <span className="bold blue">{car.price}р</span> за час</div>
    </a>:null
}