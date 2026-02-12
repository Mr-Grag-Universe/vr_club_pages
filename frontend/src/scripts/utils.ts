export function import_files<T extends string>(path_pattern: T) {
    return import.meta.glob<T>(path_pattern, { 
        eager: true,
        import: 'default'
    });
}
