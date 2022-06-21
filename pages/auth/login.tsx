import { Box, Button, Flex, Stack, useToast } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { BuiltInProviderType } from "next-auth/providers";
import {
	ClientSafeProvider,
	getProviders,
	LiteralUnion,
	signIn
} from "next-auth/react";
import {
	GetServerSidePropsContext,
	GetStaticPropsResult,
	NextPage
} from "next/types";
import { useEffect } from "react";

type Props = {
	providers: Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null;
	error: string | null;
	returnUrl: string | null;
};

export async function getServerSideProps(
	context: GetServerSidePropsContext
): Promise<GetStaticPropsResult<Props>> {
	const providers = await getProviders();
	const error = context.query.error?.toString() ?? null;
	const returnUrl = context.query.returnUrl?.toString() ?? null;
	context.query = {};
	return {
		props: { providers, error, returnUrl }
	};
}

const Login: NextPage<Props> = ({ providers, error, returnUrl }) => {
	const toast = useToast();

	useEffect(() => {
		if (error) {
			toast({
				title: "Login Failed",
				description: "Try using another account",
				status: "error",
				duration: 3000,
				variant: "subtle",
				isClosable: true
			});
		}
	}, [toast, error]);

	return (
		<main
			css={css`
			height: 100%;
		`}>
			<Flex justifyContent="center" alignItems="center" height="100%">
				<Stack>
					{Object.values(providers!).map((provider) => (
						<Box key={provider.name}>
							<Button
								onClick={(e) => {
									e.preventDefault();
									signIn(provider.id, {
										callbackUrl: returnUrl ?? "/"
									});
								}}>
								Log in with {provider.name}
							</Button>
						</Box>
					))}
				</Stack>
			</Flex>
		</main>
	);
};

export default Login;
