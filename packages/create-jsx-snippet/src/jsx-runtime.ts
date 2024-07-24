import type { SvelteHTMLElements } from 'svelte/elements';

interface JsxDevOpts {
	fileName: string;
	lineNumber: number;
	columnNumber: number;
}

export const Fragment = { type: 'fragment', props: {} } as const;
export type Fragment = typeof Fragment;
const jsxDEV = <T extends keyof JsxIntrinsicElements | Fragment['type']>(
	type?: T,
	props: Record<string, unknown> = {},
	_key?: string | number | null | undefined,
	_isStatic?: boolean,
	_opts?: JsxDevOpts,
	_ctx?: unknown
): JSXElement | Fragment => {
	if (type === undefined || type === Fragment['type']) return { type: Fragment['type'], props };
	return { type, props };
};

export { jsxDEV as jsx, jsxDEV as jsxDEV, jsxDEV as jsxs, jsxDEV as jsxsDEV };

export type JsxIntrinsicElements = {
	[K in keyof SvelteHTMLElements]: K extends `svelte:${string}`
		? never
		: Omit<
				SvelteHTMLElements[K],
				`on:${string}` | `bind:${string}` | `sapper:${string}` | 'children'
			> & { children?: JSXChildren };
};

export type Tag = keyof JsxIntrinsicElements;

export type JSXElement = {
	type: Tag;
	props: JsxIntrinsicElements[Tag];
};

export type JSXChildren = JSXElement | Fragment | string | number | boolean | null | undefined;

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		// eslint-disable-next-line @typescript-eslint/no-empty-object-type
		interface IntrinsicElements extends JsxIntrinsicElements {}
		type Element = JSXElement;
	}
}
