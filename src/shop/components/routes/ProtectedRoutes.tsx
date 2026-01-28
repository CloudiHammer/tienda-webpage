import { useAuthState } from "@/auth/store/auth.store"
import type { PropsWithChildren } from "react"
import { Navigate } from "react-router"

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {

    const { authStatus } = useAuthState()

    if (authStatus === 'checking') return null

    if (authStatus === 'not-authenticated') return <Navigate to="/auth/login" />

    return children;
}

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {

    const { authStatus } = useAuthState()

    if (authStatus === 'checking') return null

    if (authStatus === 'authenticated') return <Navigate to="/" />

    return children;
}

export const AdminRoute = ({ children }: PropsWithChildren) => {

    const { authStatus, isAdmin } = useAuthState()

    if (authStatus === 'checking') return null

    if (authStatus === 'not-authenticated') return <Navigate to="/auth/login" />
    if (!isAdmin()) return <Navigate to="/" />

    return children;
}