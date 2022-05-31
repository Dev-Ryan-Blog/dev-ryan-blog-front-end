import { css } from "@emotion/react";
import Script from "next/dist/client/script";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				{/*<!-- Google Tag Manager -->*/}
				{/* <Script
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
						new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
						j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
						'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
						})(window,document,'script','dataLayer','GTM-K4LFZ2N');`
					}}
				/> */}
				{/* <!-- End Google Tag Manager --> */}
				{/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
				<Script
					strategy="afterInteractive"
					src="https://www.googletagmanager.com/gtag/js?id=G-DPB94Z1YV5"
				/>
				<Script
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', 'G-DPB94Z1YV5');`
					}}
				/>
				{/* <!-- End Global site tag (gtag.js) - Google Analytics --> */}
				<link rel="shortcut icon" href="/DevRyanLogo.svg" />
				<link rel="canonical" href="https://blog.devryan.io/" />
				<meta name="language" content="en" />
				<meta name="robots" content="index, follow" />
				<meta name="referrer" content="origin" />
			</Head>
			<body
				css={css`
				overflow-y: scroll;
				height: 100%;
				background-color: #252834;
			`}>
				{/* <!-- Google Tag Manager (noscript) --> */}
				{/* <noscript
					dangerouslySetInnerHTML={{
						__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K4LFZ2N"
						height="0" width="0" style="display:none;visibility:hidden"></iframe>`
					}}
				/> */}
				{/* <!-- End Google Tag Manager (noscript) --> */}
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
