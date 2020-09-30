import fs from "fs/promises";

export async function idTracker(path) {
    const ids = [];
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    try {
        await fs.access(path);
        const idData = await fs.readFile(path);
        ids.push(...idData.toString().split("\n"));
    }

    catch (error) {
        await fs.writeFile(path, "");
    }

    return {
        async create() {
            let result = "";
            for (let i = 64; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            if (ids.includes(result)) {
                return await this.create();
            }

            else {
                ids.push(result);
                await fs.appendFile(path, `\n${result}`);
                return result;
            }
        }
    };
}