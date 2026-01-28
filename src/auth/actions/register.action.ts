import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse } from "../interfaces/AuthResponse";



export const RegisterAction = async (email: string, pass: string, name: string): Promise<AuthResponse> => {
    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
            email: email,
            password: pass,
            fullName: name
        });
        console.log({ data });

        return data;

    } catch (error) {

        console.log({ error });
        throw error;
    }

}