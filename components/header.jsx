import Head from 'next/head';
import { YMInitializer } from 'react-yandex-metrika';

export default (props) => {
    return (
        <Head>
            <meta charSet="utf-8" />
            <title>{props.title}</title>
            <link rel="shortcut icon" href="/static/favicon/favicon.ico" type="image/x-icon"/>
            <meta name="description" content={props.description} />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" />
            <link rel="icon" href="/static/favicon/favicon.ico" type="image/x-icon" />
            <YMInitializer accounts={[53717281]} options={{
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
            }} />
        </Head>
    )
}


