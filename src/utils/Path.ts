const Path = (path: string): string => {
    const finalPath: string = process.cwd() + path;
    return finalPath;
}

export default Path;