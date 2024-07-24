import { createJsxSnippet, type Fn } from 'create-jsx-snippet';

export const page = createJsxSnippet<[string]>((name: Fn<string>) => ({
	render: () => <h1>Hello, {name()}</h1>,
	setup: (node: Element) => {
		const onClick = () => alert(`Hello, ${name()}`);
		node.addEventListener('click', onClick);
		return () => {
			node.removeEventListener('click', onClick);
		};
	}
}));
