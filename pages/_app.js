import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    componentDidMount() {
        Router.onRouteChangeComplete = url => {
            try {
                window.gtag('config', 'UA-142313880-1', {
                    page_location: url
                });
            } catch (error) {
                // silences the error in dev mode
                // and/or if gtag fails to load
            }
        };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Component {...pageProps} />
            </Container>
        );
    }
}

export default MyApp;