import {
	Code,
	Heading,
	Link,
	ListItem,
	OrderedList,
	Text,
	UnorderedList
} from "@chakra-ui/react";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import csharp from "react-syntax-highlighter/dist/cjs/languages/prism/csharp";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import py from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import rust from "react-syntax-highlighter/dist/cjs/languages/prism/rust";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import ts from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", ts);
SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("csharp", csharp);
SyntaxHighlighter.registerLanguage("rust", rust);
SyntaxHighlighter.registerLanguage("python", py);

type Props = {
	children: string;
};

type AnchorProps = React.ClassAttributes<HTMLAnchorElement> &
	React.AnchorHTMLAttributes<HTMLAnchorElement> &
	ReactMarkdownProps;

const markdownTheme = {
	p: ({ children }: ReactMarkdownProps) => (
		<Text
			fontSize="xl"
			color="white"
			my="clamp(12px,1rem,15px)"
			lineHeight={8}>
			{children}
		</Text>
	),
	h1: ({ children }: ReactMarkdownProps) => (
		<Heading fontSize="3xl" color="white" as="h1" mt="50px">
			{children}
		</Heading>
	),
	h2: ({ children }: ReactMarkdownProps) => (
		<Heading
			fontSize="2xl"
			color="white"
			as="h2"
			mt="clamp(20px,3rem,50px)"
			mb="clamp(10px,1.5rem,50px)">
			{children}
		</Heading>
	),
	h3: ({ children }: ReactMarkdownProps) => (
		<Heading
			fontSize="xl"
			color="white"
			as="h3"
			mt="clamp(20px,3rem,50px)"
			mb="clamp(10px,1.5rem,50px)">
			{children}
		</Heading>
	),
	ul: ({ children }: ReactMarkdownProps) => (
		<UnorderedList fontSize="xl" color="white">
			{children}
		</UnorderedList>
	),
	li: ({ children }: ReactMarkdownProps) => (
		<ListItem fontSize="xl" color="white">
			{children}
		</ListItem>
	),
	ol: ({ children }: ReactMarkdownProps) => (
		<OrderedList fontSize="xl" color="white">
			{children}
		</OrderedList>
	),
	a: ({ href, children }: AnchorProps) => (
		<NextLink href={href ?? "/"} passHref>
			<Link textColor="link">{children.join("")}</Link>
		</NextLink>
	),
	blockquote: ({ children }: ReactMarkdownProps) => (
		<Text
			rounded=".3em"
			ml="10px"
			my="10px"
			as="blockquote"
			bg="rgba(255,255,255,0.1)"
			width="fit-content"
			p="5px">
			<Text fontSize="xl" color="white" as="i">
				{children}
			</Text>
		</Text>
	),
	code: ({ children, inline, className }: CodeProps) => {
		const code = children.join("\n").trim();
		const language = className?.replace("language-", "");
		return !inline && language ? (
			<SyntaxHighlighter
				style={atomDark}
				language={language}
				showLineNumbers>
				{code}
			</SyntaxHighlighter>
		) : (
			<Code colorScheme="blackAlpha" variant="solid" rounded="5px">
				{code}
			</Code>
		);
	}
};

const MarkdownRenderer: React.FC<Props> = ({ children }) => {
	return (
		<ReactMarkdown
			components={markdownTheme}
			remarkPlugins={[remarkGfm, remarkBreaks]}
			rehypePlugins={[rehypeRaw]}>
			{children}
		</ReactMarkdown>
	);
};

export default MarkdownRenderer;
