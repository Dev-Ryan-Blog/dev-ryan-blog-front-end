import { css } from "@emotion/react";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
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
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
