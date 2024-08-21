import create from "zustand";

export const useDarkTheme = create(set => ({
	isDarkMode: false,
	setIsDarkMode: (data) => {set({isDarkMode: data})}
}))
