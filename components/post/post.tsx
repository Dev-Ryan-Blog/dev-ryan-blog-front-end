import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import AuthorChip from "@components/author/authorChip";
import MarkdownRenderer from "@components/markdown/markdownRenderer";
import { Author } from "blogTypes";
import Image from "next/image";
import React from "react";

type Props = {
	title: string;
	slug: string;
	content: string;
	heroUrl: string;
	description: string;
	Author: Author;
	createdAt: string;
};

const Post: React.FC<Props> = ({
	title,
	content,
	heroUrl,
	Author,
	createdAt
}) => {
	return (
		<Center h="auto">
			<Flex
				h="100%"
				width={["98%", "90%", "75%", "60%", "60%", "50%", "40%"]}
				align="center"
				direction="column"
				bg="background.200"
				rounded="10px"
				p="10px"
				my="1rem">
				<Box w="100%" pb="8px">
					<Image
						src={heroUrl}
						layout="responsive"
						alt="Project Tumbnail"
						width="2560px"
						height="1080px"
					/>
				</Box>
				<Box w="100%">
					<AuthorChip
						avatarUrl={Author.avatarUrl}
						name={Author.name}
						slug={Author.slug}
						createdAt={createdAt}
					/>
				</Box>
				<Box
					py={{ base: "0px", sm: "10px" }}
					px={{ base: "0px", sm: "4%", md: "5%", lg: "4%" }}
					h="100%"
					w="100%">
					<Heading
						as="h1"
						textColor="white"
						fontSize={{ base: "3xl", sm: "4xl", xl: "5xl" }}
						p="10px">
						{title}
					</Heading>
					<MarkdownRenderer>{content}</MarkdownRenderer>
				</Box>
			</Flex>
		</Center>
	);
};

export default Post;
