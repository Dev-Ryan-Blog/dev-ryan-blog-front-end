import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";

type Props = {
	isLiked: boolean;
	isBookmarked: boolean;
};

const Reactions: React.FC<Props> = ({
	isLiked = false,
	isBookmarked = false
}) => {
	return (
		<Box bg="background" borderRadius="10px">
			<Button
				colorScheme="gray"
				variant="ghost"
				_hover={{ bg: "background.50" }}
				borderRadius="inherit"
				borderRightRadius="0px">
				{isLiked ? (
					<IoMdHeart color="red" />
				) : (
					<IoMdHeartEmpty color="white" />
				)}
			</Button>
			<Button
				colorScheme="gray"
				variant="ghost"
				_hover={{ bg: "background.50" }}
				borderRadius="inherit"
				borderLeftRadius="0px">
				{isBookmarked ? (
					<MdBookmark color="yellow" />
				) : (
					<MdBookmarkBorder color="white" />
				)}
			</Button>
		</Box>
	);
};

export default Reactions;
