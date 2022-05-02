import { Box, BoxProps } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo: React.FC<BoxProps> = (props) => {
	return (
		<Box {...props}>
			<Link href="/">
				<a>
					<Image
						src="/DevRyanLogo.svg"
						alt="Dev Ryan Svg"
						width="70px"
						height="54px"
						loading="eager"
					/>
				</a>
			</Link>
		</Box>
	);
};

export default Logo;
