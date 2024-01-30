import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface State {
    access_token: string
}

interface Action {
    setAccessToken: (access_token: string) => void
    isLoggedIn: () => boolean
    discardAccessToken: () => void
}

export const useAuthStore = create<State & Action>()(
    persist(
        (set, get) => ({
            // State
            access_token: "",

            // Queries
            isLoggedIn: () => get().access_token !== "",

            // Mutations
            setAccessToken: (access_token) => set(() => ({ access_token })),
            discardAccessToken: () => set(() => ({ access_token: "" })),
        }),
        {
            name: 'mini-link-stash-auth-store', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    )
)