import create from "zustand";

export const useOpenMenu = create(set => ({
	open:false,
	setOpen: (data)=>{set({open: data})},

	act:'HOME',
	setAct: (data)=>{set({act: data})},
}))
