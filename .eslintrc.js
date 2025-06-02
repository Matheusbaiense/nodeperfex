module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	ignorePatterns: ['dist/**/*'],
	plugins: ['@typescript-eslint'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:n8n-nodes-base/nodes',
	],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'n8n-nodes-base/node-param-display-name-miscased': 'off',
		'n8n-nodes-base/node-param-display-name-untrimmed': 'off',
		'n8n-nodes-base/node-param-options-type-unsorted-items': 'off',
	},
}; 