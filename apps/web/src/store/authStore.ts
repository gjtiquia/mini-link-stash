import { create } from 'zustand'

type State = {
    isLoggedIn: boolean
}

type Action = {
    login: () => void
    logout: () => void
}

export const useAuthStore = create<State & Action>((set) => ({
    isLoggedIn: false,
    login: () => set(() => ({ isLoggedIn: true })),
    logout: () => set(() => ({ isLoggedIn: false })),
}))