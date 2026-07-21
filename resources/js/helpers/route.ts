const modules = import.meta.glob('../routes/**/index.ts', {
    eager: true,
}) as Record<string, any>;

function toCamelCase(value: string) {
    return value.replace(/-([a-z])/g, (_, letter: string) =>
        letter.toUpperCase(),
    );
}

function resolveRoute(name: string) {
    const parts = name.split('.');

    if (parts.length === 1) {
        const root = modules['../routes/index.ts'];

        if (root && typeof root[parts[0]] === 'function') {
            return { fn: root[parts[0]] };
        }
    }

    if (parts.length >= 2) {
        const group = parts[0];
        const fnName = parts.slice(1).map(toCamelCase).join('.');
        const modPath = `../routes/${group}/index.ts`;
        const mod = modules[modPath];

        if (mod && typeof mod[fnName] === 'function') {
            return { fn: mod[fnName] };
        }
    }

    return null;
}

export function route(name: string, ...args: any[]) {
    const resolved = resolveRoute(name);

    if (!resolved) {
        throw new Error(`Route not found: ${name}`);
    }

    return resolved.fn(...args);
}

// Attach to global for templates that call `route(...)` directly
(globalThis as any).route = route;

export default route;
