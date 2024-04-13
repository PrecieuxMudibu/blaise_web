import { create } from 'zustand';
import { userSlice } from './user';
import { professorsSlice } from './professors';

const globalStore = create((set: any) => ({
    ...userSlice(set),
    ...professorsSlice(set),
}));

export default globalStore;