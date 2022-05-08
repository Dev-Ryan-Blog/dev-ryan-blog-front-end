import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { Author } from "blogTypes";
import Image from "next/image";
import React from "react";

type Props = {
	id: number;
	title: string;
	slug: string;
	content: string;
	heroUrl: string;
	description: string;
	Author: Author;
};

const Post: React.FC<Props> = ({ title, content, heroUrl, Author }) => {
	return (
		<Center h="auto" my="1rem">
			<Flex
				h="100%"
				width={["98%", "80%", "70%", "60%", "50%", "40%", "30%"]}
				align="center"
				direction="column"
				bg="background.200"
				rounded="10px"
				p="10px">
				<Box w="100%">
					<Image
						src={heroUrl}
						layout="responsive"
						alt="Project Tumbnail"
						width="2560px"
						height="1080px"
					/>
				</Box>
				<Box py="10px" px="10%" h="100%" w="100%">
					<Heading as="h1" textColor="white">
						{title}
					</Heading>
					<Text textColor="white">{content}</Text>
				</Box>
			</Flex>
		</Center>
	);
};

export default Post;
