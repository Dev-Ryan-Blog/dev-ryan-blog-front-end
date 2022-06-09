import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import MarkdownRenderer from "@components/markdown/markdownRenderer";
import { css } from "@emotion/react";
import Image from "next/image";
import React from "react";

type Props = {
	avatarUrl: string;
	name: string;
	slug: string;
	bio: string;
};

const Post: React.FC<Props> = ({ avatarUrl, name, slug, bio }) => {
	return (
		<Center h="auto">
			<Flex
				h="100%"
				width={["98%", "80%", "70%", "60%", "60%", "50%", "40%"]}
				align="center"
				direction="column"
				bg="background.200"
				rounded="10px"
				p="10px"
				my="1rem">
				<Box
					w={{ base: "50%", sm: "40%", md: "30%", lg: "20%" }}
					minW="100px">
					<Image
						src={avatarUrl}
						layout="responsive"
						alt="Project Tumbnail"
						width="1000px"
						height="1000px"
						css={css`
						border-radius: 50%;
					`}
					/>
				</Box>
				<Box
					py={{ base: "0px", sm: "10px" }}
					px={{ base: "0px", sm: "10%" }}
					h="100%"
					w="100%">
					<Heading
						as="h1"
						textColor="white"
						textAlign="center"
						fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
						p="10px">
						{name}
					</Heading>
					<MarkdownRenderer>{bio}</MarkdownRenderer>
				</Box>
			</Flex>
		</Center>
	);
};

export default Post;
