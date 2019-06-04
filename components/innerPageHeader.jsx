import "../scss/style.scss"

export default (props) => {
    return (
        <div className="header inner-page background-img" style={{ backgroundImage: `url(/${props.background})` }}>

            <div className="bg-mask top">
                <div></div>
                <div className="central"></div>
                <div></div>
            </div>
            <div className="bg-mask bottom">
                <div></div>
                <div className="central">
                    <div className="bottom-bg-mask"></div>
                </div>
                <div></div>
            </div>

            <div className="content flex-block space-between stretch">
                <div className="logo w100"><a href="/"></a></div>
                <div className="top-contacts">
                    <h2 className="h3 mb10">Прокат автомобилей в Екатеринбурге</h2>
                    <div className="hc-phone"><span className="phone-icon"></span><a href="tel:+79089084811" className="h2 bold">8 908 908 48 11</a></div>
                    <div className="hc-social">
                        <a href="https://wa.me/79089084811" className="socialicon round WHATSAPP"></a>
                        <a href="" className="socialicon round TELEGRAM"></a>
                        <div className="socialicon round INSTAGRAM" ></div>
                    </div>
                </div>
            </div>

            <div className="content">
                <div className="flex-block space-between fb-vbottom">
                    <div className="h-menu">
                    </div>
                    <div>
                        <h1 className="h0 inner-page-caption">{props.caption}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}