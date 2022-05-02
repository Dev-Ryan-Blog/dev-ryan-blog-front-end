import { Flex, Heading, Stack } from "@chakra-ui/react";
import { css } from "@emotion/react";
import type { NextPage } from "next";
import Image from "next/image";

const Contact: NextPage = () => {
	return (
		<main
			css={css`
		height:100%
		`}>
			<Flex
				as="nav"
				align="center"
				justify="space-between"
				direction="column">
				<Image
					src="/avatar.png"
					alt="Dev Ryan Avatar"
					layout="intrinsic"
					loading="eager"
					width="400px"
					height="400px"
				/>
				<Heading as="h1" color="white" fontSize="4xl" mb="20px">
					Say Hello 🙌
				</Heading>
				<Stack
					direction={["column", "row"]}
					w="100%"
					spacing="10%"
					align="center"
					justify="center">
					<a href="https://github.com/RyanCallahan312">
						<Image
							src="/github-mark-white.svg"
							alt="Github Logo"
							loading="eager"
							layout="fixed"
							width="100px"
							height="100px"
						/>
					</a>
					<a href="mailto:Ryan@DevRyan.io">
						<Image
							src="/gmail.svg"
							alt="Gmail Logo"
							loading="eager"
							layout="fixed"
							width="100px"
							height="100px"
						/>
					</a>
					<a href="https://www.linkedin.com/in/ryancallahan312/">
						<Image
							src="/linkedin.png"
							alt="Linkedin Logo"
							loading="eager"
							layout="fixed"
							width="100px"
							height="100px"
						/>
					</a>
				</Stack>
			</Flex>
		</main>
	);
};

export default Contact;
