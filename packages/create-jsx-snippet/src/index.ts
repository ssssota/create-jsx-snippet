import { createRawSnippet, type Snippet } from 'svelte';
import type { JSXElement } from './jsx-runtime';
import { Fragment } from './jsx-runtime';

export type Fn<T> = () => T;

const emptyTags = new Set([
	'area',
	'base',
	'br',
	'col',
	'embed',
	'hr',
	'img',
	'input',
	'keygen',
	'link',
	'meta',
	'param',
	'source',
	'track',
	'wbr'
]);

export function renderJsxElement(element: JSXElement): string {
	const tag = element.type.toString();
	const attributes = Object.entries(element.props)
		.map(([key, value]) => {
			if (key === 'children') return;
			if (value === true) return key;
			if (value === '') return `${key}=""`;
			if (!value) return;
			return `${key}="${value}"`;
		})
		.filter((v) => v !== undefined)
		.join(' ');
	const children = renderChildren(element.props.children);
	if (tag === Fragment.type) return children;
	if (emptyTags.has(tag)) return `<${tag} ${attributes}>`;
	return `<${tag} ${attributes}>${children}</${tag}>`;
}
function renderChildren(children: JSXElement['props']['children']): string {
	if (typeof children === 'string' || typeof children === 'number') return children.toString();
	if (!children || children === true) return '';
	if (Array.isArray(children)) return children.map(renderChildren).join('');
	return renderJsxElement(children);
}

export function createJsxSnippet<Args extends unknown[]>(
	fn: (...args: Parameters<Parameters<typeof createRawSnippet<Args>>[0]>) => {
		render: () => JSXElement;
		setup?: (node: Element) => void;
	}
): Snippet<Args> {
	return createRawSnippet<Args>((...args) => {
		const result = fn(...args);
		return {
			render: () => renderJsxElement(result.render()),
			setup: result.setup
		};
	});
}
