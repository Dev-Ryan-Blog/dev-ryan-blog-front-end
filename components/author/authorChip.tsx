import { Box, Flex, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { dateTimeToShortName } from "@util/dateTimeFormats";
import Link from "next/dist/client/link";
import Image from "next/image";
import React from "react";

type Props = {
	avatarUrl: string;
	name: string;
	slug: string;
	createdAt: string;
};

const AuthorChip: React.FC<Props> = ({ avatarUrl, name, slug, createdAt }) => {
	return (
		<Flex>
			<Link href={`/author/${slug}`} passHref>
				<a>
					<Flex alignItems="center">
						<Image
							src={avatarUrl}
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
								<i>{name}</i>
							</Text>
							<Text fontSize="sm" color="text.smoke">
								<i>
									{dateTimeToShortName(new Date(createdAt))}
								</i>
							</Text>
						</Box>
					</Flex>
				</a>
			</Link>
		</Flex>
	);
};

export default AuthorChip;
