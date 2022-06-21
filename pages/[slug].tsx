import Post from "@components/post/post";
import PostSEO from "@components/post/postSEO";
import { css } from "@emotion/react";
import * as GraphQLGetPost from "@graphql/getPost";
import { SeoReactionPostWithUser } from "blogTypes";
import { request } from "graphql-request";
import type { GetStaticPropsResult, NextPage, NextPageContext } from "next";
import { Session } from "next-auth/core/types";
import { getSession } from "next-auth/react";

type Props = {
	data: SeoReactionPostWithUser;
};

export async function getServerSideProps(
	context: NextPageContext
): Promise<GetStaticPropsResult<Props | undefined>> {
	const { slug } = context.query;
	const session: Session | null = await getSession(context);

	const postArgs: GraphQLGetPost.Args = {
		slug: slug as string
	};

	const postResponse = await request<GraphQLGetPost.GraphqlResponse>(
		GraphQLGetPost.getEndpoint(process.env.INTERNAL_STRAPI_URL),
		GraphQLGetPost.query,
		postArgs
	);

	let post: SeoReactionPostWithUser =
		GraphQLGetPost.responseToSEOReactionPostWithUser(
			postResponse,
			session?.id as number
		);

	if (post.slug == null) {
		return {
			redirect: {
				destination: "/",
				permanent: false
			},
			props: undefined
		};
	}

	return {
		props: {
			data: post
		}
	};
}

const Home: NextPage<Props> = (props: Props) => {
	return (
		<main
			css={css`
		height: 100%;
		`}>
			<PostSEO post={props.data} />
			<Post {...props.data} />
		</main>
	);
};

export default Home;
