import { create } from 'zustand'

interface State {
    access_token: string
}

interface Action {
    setAccessToken: (access_token: string) => void
    isLoggedIn: () => boolean
    logout: () => void
}

export const useAuthStore = create<State & Action>((set, get) => ({
    // State
    access_token: "",

    // Queries
    isLoggedIn: () => get().access_token !== "",

    // Mutations
    setAccessToken: (access_token) => set(() => ({ access_token })),
    logout: () => set(() => ({ access_token: "" })),
}))