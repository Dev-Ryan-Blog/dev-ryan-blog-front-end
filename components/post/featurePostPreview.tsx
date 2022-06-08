import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { dateTimeToShortName } from "@util/dateTimeFormats";
import { AuthorPost } from "blogTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
	post: AuthorPost;
};

const FeaturePostPreview: React.FC<Props> = ({ post }) => {
	return (
		<Center h="auto" py="1rem">
			<Flex
				h="100%"
				width={["98%", "80%", "70%", "60%", "60%", "50%", "40%"]}
				align="center"
				direction="column"
				bg="background.200"
				rounded="10px"
				p="10px">
				<Box w="100%">
					<Link href={`/${post.slug}`} passHref>
						<a>
							<Image
								src={post.heroUrl}
								layout="responsive"
								alt="Project Tumbnail"
								width="2560px"
								height="1080px"
							/>
						</a>
					</Link>
				</Box>
				<Box py="10px" h="100%" w="100%">
					<Flex>
						<Link href={`/author/${post.Author.slug}`} passHref>
							<a>
								<Flex alignItems="center">
									<Image
										src={post.Author.avatarUrl}
										layout="fixed"
										alt="Author Avatar"
										width="50px"
										height="50px"
										css={css`
									border-radius: 50%;
								`}
									/>
									<Box pl="5px">
										<Text fontSize="sm" color="text.smoke">
											<i>{post.Author.name}</i>
										</Text>
										<Text fontSize="sm" color="text.smoke">
											<i>
												{dateTimeToShortName(
													new Date(post.createdAt)
												)}
											</i>
										</Text>
									</Box>
								</Flex>
							</a>
						</Link>
					</Flex>
					<Box px="50px" pt="10px">
						<Link href={`/${post.slug}`} passHref>
							<a>
								<Heading
									as="h1"
									textColor="white"
									noOfLines={2}
									maxW="100%">
									{post.title}
								</Heading>
								<Text
									textColor="white"
									noOfLines={2}
									maxW="100%">
									{post.description}
								</Text>
							</a>
						</Link>
					</Box>
				</Box>
			</Flex>
		</Center>
	);
};

export default FeaturePostPreview;
