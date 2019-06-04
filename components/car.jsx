import Link from 'next/link'
import Popup from 'reactjs-popup'
import ReactSwipe from 'react-swipe';
import _ from 'lodash';
import "../scss/style.scss";

class Car extends React.Component {

    state = { show: false };
    reactSwipeEl;

    toggleInfo = (state) => {
        console.log(state);
        this.setState({ show: state });
    };

    render() {
        let car = this.props.data;
        return (car) ? <div className="auto-card-fullinfo" onClick={()=>this.toggleInfo(true)}>
            <div style={{ backgroundImage: `url(/static/img/cars/${this.props.model}/${this.props.index}/1.jpg)` }}/>
            <div className="h3 bold">{car.mark || ''} {car.model || ''}</div>
            <div className="h4">от <span className="bold blue">{car.price}р</span> за час</div>
            <Popup open={this.state.show}
                modal
                lockScroll
                closeOnEscape
                closeOnDocumentClick
                onClose={()=>this.toggleInfo(false)}
                contentStyle={{background: 'transparent', width: '100%', maxWidth: '600px', padding: 0, border: 'none'}}>
                <div className="car-popup" onClick={() => this.reactSwipeEl.next()}>
                    <ReactSwipe className="car-p-photos"
                        swipeOptions={{ continuous: true }}
                        ref={el => (this.reactSwipeEl = el)}>
                        {_.map([ ...Array(car.photos).keys() ], index=><div><div key={index} style={{ backgroundImage: `url(/static/img/cars/${this.props.model}/${this.props.index}/${index+1}.jpg)` }}/></div>)}

                    </ReactSwipe>
                    <div className="car-p-controls">
                        <div className="close" onClick={()=>this.toggleInfo(false)}/>
                        <div className="next" onClick={(e) => { this.reactSwipeEl.next(); e.stopPropagation(); }}/>
                        <div className="prev" onClick={(e) => { this.reactSwipeEl.prev(); e.stopPropagation(); }}/>
                    </div>

                </div>
            </Popup>
        </div> : null
    }
}

export default Car;