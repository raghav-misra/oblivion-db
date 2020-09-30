import { promises as fs } from "fs";

const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export async function idTracker(path) {
    const ids = [];

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
                await fs.appendFile(path, `${result}\n`);
                return result;
            }
        }
    };
}