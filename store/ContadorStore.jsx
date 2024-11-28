const { create } = require("zustand");

export const useContadorStore = create((set)=>({
    count :1,
    inc: ()=>set((state)=>({count:state.count + 1}))
}))