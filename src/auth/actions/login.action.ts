import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse } from "../interfaces/AuthResponse";



export const LoginAction = async (email: string, pass: string): Promise<AuthResponse> => {
    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
            email: email,
            password: pass
        });
        console.log({ data });

        return data;

    } catch (error) {

        console.log({ error });
        throw error;
    }

}