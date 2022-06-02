import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "@components/navigation/navBar";
import "@fontsource/roboto";
import "@styles/document.css";
import Theme from "@themes/theme";
import type { AppProps } from "next/app";
import Head from "next/dist/shared/lib/head";

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta
					name="description"
					content="Dev Ryan's blog features articles that aim to help developers overcome obsticles that are poorly documented. Every article is a learning experience documented for future developers!"
				/>
			</Head>
			<ChakraProvider theme={Theme}>
				<Grid templateRows="3.4rem auto">
					<GridItem position="sticky" top="0px" left="0px" zIndex="1">
						<NavBar />
					</GridItem>
					<GridItem minHeight="calc(100vh - 3.4rem)">
						<Component {...pageProps} />
					</GridItem>
				</Grid>
			</ChakraProvider>
		</>
	);
}

export default App;
