import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 12;
    return (await bcrypt.hash(password, saltRounds));
}

export async function comparePasswords(plainText: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainText,hash); 
}