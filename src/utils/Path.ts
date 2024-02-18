const Path = (path: string): string => {
    const finalPath: string = process.cwd() + path;
    console.log(finalPath);
    return finalPath;
}

export default Path;