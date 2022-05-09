declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: "development" | "production";
		TZ?: string;
		PORT?: string;
		PWD: string;
		INTERNAL_STRAPI_URL: string;
		EXTERNAL_STRAPI_URL: string;
	}
}
