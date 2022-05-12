import Post from "@components/post/post";
import { css } from "@emotion/react";
import * as GraphQLGetPost from "@graphql/getPost";
import { Post as PostType } from "blogTypes";
import { request } from "graphql-request";
import type { GetStaticPropsResult, NextPage, NextPageContext } from "next";

type Props = {
	data: PostType;
};

export async function getServerSideProps(
	context: NextPageContext
): Promise<GetStaticPropsResult<Props | undefined>> {
	const { slug } = context.query;

	const args: GraphQLGetPost.Args = {
		slug: slug as string
	};
	const response = await request<GraphQLGetPost.Response>(
		GraphQLGetPost.getEndpoint(process.env.INTERNAL_STRAPI_URL),
		GraphQLGetPost.query,
		args
	);

	const post: PostType = GraphQLGetPost.responseToPost(response);

	if (post.id == null) {
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
			<Post {...props.data} />
		</main>
	);
};

export default Home;
