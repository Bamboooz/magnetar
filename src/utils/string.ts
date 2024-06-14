function trim(input: string, target: number): string {
    return input.length <= target ? input : `${input.substring(0, target)}...`;
}

export { trim };
