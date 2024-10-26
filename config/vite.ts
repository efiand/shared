import type { Plugin, FSWatcher } from 'vite';

interface PatchedFSWatcher extends FSWatcher {
	_userIgnored?: unknown;
}

export const watchNodeModules = (modules: string[]): Plugin => {
	return {
		name: 'watch-node-modules',
		configureServer(server) {
			const regexp = `/node_modules\\/(?!${modules.join('|')}).*/`;
			const watcher = server.watcher as PatchedFSWatcher;
			watcher.options = {
				...server.watcher.options,
				ignored: ['**/.git/**', '**/test-results/**', new RegExp(regexp)],
			};
			watcher._userIgnored = undefined;
		},
		config() {
			return {
				optimizeDeps: {
					exclude: modules,
				},
			};
		},
	};
};
