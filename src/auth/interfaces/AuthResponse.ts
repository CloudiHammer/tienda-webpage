import type { User } from "@/interfaces/user.interface";


//Funciona para login, register, check status
export interface AuthResponse {
    user: User;
    token: string;
}
