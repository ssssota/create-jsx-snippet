# create-jsx-snippet

JSX for `createRawSnippet` in Svelte.

## Usage

```jsx
import { createJsxSnippet } from 'create-jsx-snippet';
export const snippet = createJsxSnippet<[string]>((name: Fn<string>) => ({
	render: () => <h1>Hello, {name()}</h1>,
	setup: (node: Element) => {
		const onClick = () => alert(`Hello, ${name()}`);
		node.addEventListener('click', onClick);
		return () => {
			node.removeEventListener('click', onClick);
		};
	}
}));
```

## Constraints

- UI is not reactive
  - If you want to change the UI, you need to use DOM APIs in the `setup` function directly
- You cannot use runes in JSX files (e.g. `index.svelte.jsx`)
  - Because svelte compiler cannot handle JSX files.

## License

MIT
