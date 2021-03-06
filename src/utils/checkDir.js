import { promises as fs } from "fs";

export async function checkDir(dir) {
    /* Check existence of dir */
    try {
        await fs.access(dir);
    }

    /* doesn't exist. Create new directory */
    catch (error) {
        await fs.mkdir(dir);
    }
}