import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";

type Props = {
	isLiked: boolean;
	likeCount?: number;
	isBookmarked: boolean;
	bookmarkCount?: number;
};

const Reactions: React.FC<Props> = ({
	isLiked = false,
	likeCount = 0,
	isBookmarked = false,
	bookmarkCount = 0
}) => {
	return (
		<Box
			bg="background"
			borderRadius="20px"
			position="sticky"
			bottom="10px">
			<Button
				colorScheme="gray"
				variant="ghost"
				_hover={{ bg: "background.50" }}
				borderRadius="inherit"
				borderRightRadius="0px"
				pl="10px"
				pr="2px"
				_focus={{ outline: "none" }}>
				<Flex justifyContent="space-around" w="100%" minW="35px">
					{isLiked ? (
						<IoMdHeart color="red" />
					) : (
						<IoMdHeartEmpty color="white" />
					)}
					<Text fontSize="sm" color="white">
						{likeCount}
					</Text>
				</Flex>
			</Button>
			<Button
				colorScheme="gray"
				variant="ghost"
				_hover={{ bg: "background.50" }}
				borderRadius="inherit"
				borderLeftRadius="0px"
				pl="2px"
				pr="10px"
				_focus={{ outline: "none" }}>
				<Flex justifyContent="space-around" w="100%" minW="35px">
					{isBookmarked ? (
						<MdBookmark color="yellow" />
					) : (
						<MdBookmarkBorder color="white" />
					)}
					<Text fontSize="sm" color="white">
						{bookmarkCount}
					</Text>
				</Flex>
			</Button>
		</Box>
	);
};

export default Reactions;
