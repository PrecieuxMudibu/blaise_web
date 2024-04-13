export const professorsSlice = (set: any) => ({
    professors: [],
    setProfessors: (professors: any[]) =>
        set((state: any) => ({ ...state, professors }))
});