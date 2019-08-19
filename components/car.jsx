import Popup from 'reactjs-popup'
import ReactSwipe from 'react-swipe';
import _ from 'lodash';
import "../scss/style.scss";
import React from "react";
import PreloadImage from 'react-preload-image'

class Car extends React.Component {

    state = { show: false };
    reactSwipeEl;

    toggleInfo = (isClosed) => {
        this.setState({ show: isClosed });
    };

    render() {
        let car = this.props.data;

        return (car) ? <div className="auto-card-fullinfo">
            <div onClick={()=>this.toggleInfo(true)} style={{ backgroundImage: `url(https://img.lux-motor.ru/car/${car.alias}/${car.cover}.jpg)` }}>
                <img className="imgse" src={`https://img.lux-motor.ru/car/${car.alias}/${car.cover}.jpg`}/>
                {(car.seats)?<div className="ac-capacity">{car.seats} {(car.seats%100%10>0&&car.seats%100%10<5)?(car.seats%100%10===1)?'место':'места':'мест'}</div>:null}
            </div>
            {(car.showModel)?<div className="h3 bold mt10">{car.markName || ''} {car.modelName || ''}</div>:null}
            {(car.price || car.outcity_price || car.mintime)?<div className="flex-block pos-center">
                {(car.price && car.price>0)?<div className="h4"><span className="bold blue">{car.price}р</span> в час</div>:null}
                {(car.outcity_price && car.outcity_price>0)?<div><span className="bold blue">{car.outcity_price}р</span> за км</div>:null}
                {(car.mintime && car.mintime>0)?<div><span className="bold blue">{car.mintime}</span> часа</div>:null}
            </div>:null}

            <Popup open={this.state.show}
                modal
                lockScroll
                closeOnEscape
                closeOnDocumentClick
                onClose={()=>{ this.toggleInfo(false)}}
                contentStyle={{background: 'transparent', width: '100%', maxWidth: '600px', padding: 0, border: 'none'}}>
                <div className="car-popup" onClick={() => this.reactSwipeEl.next()}>
                    <ReactSwipe className="car-p-photos"
                        swipeOptions={{ continuous: true }}
                        ref={el => (this.reactSwipeEl = el)}>
                        {_.map(car.photos, photo=><div key={photo}>
                            <img className="imgse" src={`https://img.lux-motor.ru/car/${car.alias}/${photo}.jpg`} alt=""/>
                            <PreloadImage lazy={true} src={`https://img.lux-motor.ru/car/${car.alias}/${photo}.jpg`} />
                            </div>)}
                    </ReactSwipe>
                    <div className="car-p-controls">
                        <div className="close" onClick={()=>this.toggleInfo(false)}/>
                        {(car.photos.length>1)?<div className="controls">
                            <div className="prev" onClick={(e) => { this.reactSwipeEl.prev(); e.stopPropagation(); }}/>
                            <div className="next" onClick={(e) => { this.reactSwipeEl.next(); e.stopPropagation(); }}/>
                        </div>:null}
                    </div>
                </div>
            </Popup>
        </div> : null
    }
}

export default Car;