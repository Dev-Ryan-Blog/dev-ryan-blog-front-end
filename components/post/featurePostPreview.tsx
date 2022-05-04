import { Box, Center, Flex } from "@chakra-ui/react";
import { Post } from "blogTypes";
import Image from "next/image";
import React from "react";

type Props = {
	post: Post;
};

const FeaturePostPreview: React.FC<Props> = ({ post }) => {
	console.log(post);
	return (
		<Center h="50%">
			<Flex
				h="100%"
				width={["95%", "80%", "80%", "60%", "60%", "40%"]}
				justify="center"
				align="center"
				direction="column">
				<Box width="80%">
					<Image
						src={post.HeroUrl}
						layout="responsive"
						alt="Project Tumbnail"
						width="2560px"
						height="1080px"
					/>
				</Box>
			</Flex>
		</Center>
	);
};

export default FeaturePostPreview;
