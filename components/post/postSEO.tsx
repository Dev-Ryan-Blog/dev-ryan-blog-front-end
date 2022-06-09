import { SEOPost } from "blogTypes";
import Head from "next/head";
import React from "react";

type Props = {
	post: SEOPost;
};

const PostSEO: React.FC<Props> = ({ post }) => {
	const { heroUrl, Author, SEO, slug } = post;
	return (
		<Head>
			<title>{SEO.metaTitle}</title>
			<meta name="description" content={SEO.metaDescription} />

			<meta name="og:title" content={SEO.metaTitle} />
			<meta name="og:description" content={SEO.metaDescription} />
			<meta name="og:image" content={heroUrl} />
			<meta
				name="og:url"
				content={`${process.env.NEXT_PUBLIC_BASE_URL}${slug}`}
			/>

			<meta name="twitter:title" content={SEO.metaTitle} />
			<meta name="twitter:description" content={SEO.metaDescription} />
			<meta name="twitter:image" content={heroUrl} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta
				name="twitter:url"
				content={process.env.NEXT_PUBLIC_BASE_URL}
			/>

			<meta name="author" content={Author.name} />
			<meta name="publisher" content={Author.name} />
			<meta name="copyright" content={Author.name} />
		</Head>
	);
};

export default PostSEO;
