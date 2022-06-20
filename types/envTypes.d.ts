declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: "development" | "production";
		TZ?: string;
		PORT?: string;
		PWD: string;
		INTERNAL_STRAPI_URL: string;
		EXTERNAL_STRAPI_URL: string;
		NEXT_PUBLIC_BASE_URL: string;
		NEXT_PUBLIC_GOOGLE_ANALYTICS: string;
		NEXTAUTH_URL: string;
		GOOGLE_CLIENT_ID: string;
		GOOGLE_CLIENT_SECRET: string;
	}
}
