function fileName(path: string): string {
    const normalizedPath = path.replace(/\\/g, '/');
    const fullFileName = normalizedPath.split('/').pop() || '';
    const lastDotIndex = fullFileName.lastIndexOf('.');
    const fileNameWithoutExtension = lastDotIndex !== -1 ? fullFileName.slice(0, lastDotIndex) : fullFileName;

    return fileNameWithoutExtension;
}

export { fileName };
