export const userSlice = (set: any) => ({
    user: { name: '', id: '' },
    setUser: (user: any) => set({ user })
    // addUser: () => set((state: any) => ({ fishes: state.fishes + 1 }))
});