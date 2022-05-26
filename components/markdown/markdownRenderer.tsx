import {
	Code,
	Heading,
	ListItem,
	OrderedList,
	Text,
	UnorderedList
} from "@chakra-ui/react";
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

const markdownTheme = {
	p: ({ children }: ReactMarkdownProps) => (
		<Text fontSize="l" color="white">
			{children}
		</Text>
	),
	h1: ({ children }: ReactMarkdownProps) => (
		<Heading mb={2} fontSize="3xl" color="white" as="h1">
			{children}
		</Heading>
	),
	h2: ({ children }: ReactMarkdownProps) => (
		<Heading mb={2} fontSize="2xl" color="white" as="h2">
			{children}
		</Heading>
	),
	h3: ({ children }: ReactMarkdownProps) => (
		<Heading mb={2} fontSize="xl" color="white" as="h3">
			{children}
		</Heading>
	),
	ul: ({ children }: ReactMarkdownProps) => (
		<UnorderedList fontSize="l" color="white">
			{children}
		</UnorderedList>
	),
	li: ({ children }: ReactMarkdownProps) => (
		<ListItem fontSize="l" color="white">
			{children}
		</ListItem>
	),
	ol: ({ children }: ReactMarkdownProps) => (
		<OrderedList fontSize="l" color="white">
			{children}
		</OrderedList>
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
			<Text fontSize="l" color="white" as="i">
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
			<Code colorScheme="whiteAlpha">{code}</Code>
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
