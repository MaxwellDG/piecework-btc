export async function readFile(file: File): Promise<string | null> {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = (e) => {
            resolve(e.target?.result as string);
        };

        fileReader.onerror = (e) => {
            reject(null);
        };

        fileReader.readAsDataURL(file);
    });
}
