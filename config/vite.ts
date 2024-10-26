import type { FSWatcher, Plugin } from 'vite';

interface PatchedFSWatcher extends FSWatcher {
	_userIgnored?: unknown;
}

export const watchNodeModules = (modules: string[]): Plugin => {
	return {
		config() {
			return {
				optimizeDeps: {
					exclude: modules,
				},
			};
		},
		configureServer(server) {
			const regexp = `/node_modules\\/(?!${modules.join('|')}).*/`;
			const watcher = server.watcher as PatchedFSWatcher;
			watcher.options = {
				...server.watcher.options,
				ignored: ['**/.git/**', '**/test-results/**', new RegExp(regexp)],
			};
			watcher._userIgnored = undefined;
		},
		name: 'watch-node-modules',
	};
};
