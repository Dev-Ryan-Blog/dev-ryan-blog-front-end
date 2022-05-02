import { Box, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import Logo from "./logo";
import MenuButton from "./menuButton";
import MenuItem from "./menuItem";

type MenuLinksProps = {
	isOpen: boolean;
	children?: React.ReactNode;
};

type Children = {
	children?: React.ReactNode;
};

const NavBar = () => {
	const [isOpen, setIsOpen] = React.useState(false);

	const onToggle = () => setIsOpen(!isOpen);

	return (
		<NavBarContainer>
			<Logo
				w="70px"
				color={["white", "white", "primary.500", "primary.500"]}
			/>
			<MenuButton onToggle={onToggle} isOpen={isOpen} />
			<MenuLinks isOpen={isOpen}>
				<MenuItem to="/archive">Archive</MenuItem>
				<MenuItem to="https://portfolio.devryan.io">About Me</MenuItem>
				<MenuItem to="/contact">Contact</MenuItem>
			</MenuLinks>
		</NavBarContainer>
	);
};

const NavBarContainer: React.FC<Children> = ({ children }) => (
	<Flex
		as="nav"
		align="center"
		justify="space-between"
		wrap="wrap"
		w="100%"
		h="4.3rem"
		bg="background"
		p={2}
		pr={5}
		color="white">
		{children}
	</Flex>
);

const MenuLinks: React.FC<MenuLinksProps> = ({ children, isOpen }) => {
	return (
		<>
			<Box
				display={{ base: isOpen ? "block" : "none", sm: "none" }}
				flexBasis="auto"
				bg="background"
				position="absolute"
				left="0px"
				top="4.3rem"
				w="100%"
				height="auto"
				zIndex={1}
				opacity="75%">
				<Stack
					align="center"
					justify="space-around"
					direction="column"
					height="50%"
					opacity="100%">
					{children}
				</Stack>
			</Box>
			<Box
				display={{ base: "none", sm: "block" }}
				flexBasis="auto"
				bg="background">
				<Stack align="center" justify="space-around" direction="row">
					{children}
				</Stack>
			</Box>
		</>
	);
};

export default NavBar;
