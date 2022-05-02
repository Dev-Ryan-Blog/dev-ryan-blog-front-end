import { Box, Center, Flex, Spacer } from "@chakra-ui/react";
import { Post } from "blogTypes";
import Image from "next/image";
import React from "react";

type Props = {
	post: Post;
};

const FeaturePostPreview: React.FC<Props> = ({ post }) => {
	console.log(post);
	return (
		<Center h="80%" mb="4rem">
			<Flex
				h="100%"
				width={["95%", "80%", "80%", "60%", "60%", "50%"]}
				align={{ base: "center", md: "flex-start" }}
				justify="center"
				direction="column">
				<Spacer />
				<Center width="100%">
					<Box width="80%">
						<Image
							src={post.HeroUrl}
							layout="responsive"
							alt="Project Tumbnail"
							height="1000px"
							width="1000px"
						/>
					</Box>
				</Center>
				<Spacer />
			</Flex>
		</Center>
	);
};

export default FeaturePostPreview;
