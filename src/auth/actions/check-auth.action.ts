import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/AuthResponse";

export const CheckAuthAction = async (): Promise<AuthResponse> => {

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    try {
        const { data } = await tesloApi.get<AuthResponse>('auth/check-status');
        localStorage.setItem('token', data.token);
        return data;

    } catch (error) {
        localStorage.removeItem('token');
        throw new Error('Token spired or not valid');
    }


}