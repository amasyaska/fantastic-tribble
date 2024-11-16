import { useEffect, useState } from 'react'

export const useTheme = () => {
	const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light')
	const toggleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark'
		setTheme(newTheme)
		localStorage.setItem('theme', newTheme)
		document.documentElement.classList.toggle('dark', newTheme === 'dark')
	}

	useEffect(() => {
		document.documentElement.classList.remove('light', 'dark')
		document.documentElement.classList.add(theme)
	}, [])

	return { toggleTheme }
}
