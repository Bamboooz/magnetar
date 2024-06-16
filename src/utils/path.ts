function fileName(path: string): string {
    const normalizedPath = path.replace(/\\/g, '/');
    
    return normalizedPath.split('/').pop() || '';
}

export { fileName };
