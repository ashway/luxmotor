import Link from 'next/link'
import "../scss/style.scss";

import Car from './car.jsx';

export default (props) => {
    let car = props.data;
    if(props.isCar) car.showModel = true;
    return (car)?(props.isCar)?<Car data={car}/>:<Link href={`/cars/${car.class}${(!car.is_group)?`/${car.modelAlias}`:''}`}>
        <a className="auto-card">
            <div style={{ backgroundImage: `url(https://img.lux-motor.ru/car/${car.alias}/${car.cover}.jpg)`}}/>
            <div className="h3 bold">{car.markName || ''} {car.modelName || ''}</div>
            <div className="h4">от <span className="bold blue">{car.price}р</span> за час</div>
        </a>
    </Link>:null
}