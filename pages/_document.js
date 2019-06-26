// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Fragment } from 'react';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const isProduction = process.env.NODE_ENV === 'production';
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps, isProduction };
    }

    setAnalytics() {

        return {
            __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(53717281, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            });

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-142313880-1');

            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T2TVG4J');`
        };
    }

    render() {

        const { isProduction } = this.props;

        return (
            <Html>
            <Head>
                {isProduction && (
                    <Fragment>
                        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-142313880-1"/>
                        {/* We call the function above to inject the contents of the script tag */}
                        <script dangerouslySetInnerHTML={this.setAnalytics()} />
                    </Fragment>
                )}
            </Head>
            <body className="custom_class">
            <Main />
            <NextScript />

            </body>
            </Html>
        );
    }
}

export default MyDocument;