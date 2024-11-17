// Конвертація об'єкта `snake_case` -> `camelCase`
export function toCamelCase<T extends Record<string, any>>(
	obj: T
): Record<string, any> {
	const result: any = {}
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
				letter.toUpperCase()
			)
			result[camelKey] = obj[key]
		}
	}
	return result
}

// Конвертація об'єкта `camelCase` -> `snake_case`
export function toSnakeCase<T extends Record<string, any>>(
	obj: T
): Record<string, any> {
	const result: any = {}
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
			result[snakeKey] = obj[key]
		}
	}
	return result
}
