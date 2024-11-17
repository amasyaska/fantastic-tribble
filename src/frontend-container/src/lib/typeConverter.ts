// Конвертація об'єкта `snake_case` -> `camelCase`
export function toCamelCase<T extends Record<string, any>>(
	obj: T
): Record<string, any> {
	const result: Record<string, any> = {}

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			// Перетворення ключа в camelCase
			const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
				letter.toUpperCase()
			)

			// Рекурсія для вкладених об'єктів
			if (
				obj[key] !== null &&
				typeof obj[key] === 'object' &&
				!Array.isArray(obj[key])
			) {
				result[camelKey] = toCamelCase(obj[key])
			} else {
				// Примітивні значення
				result[camelKey] = obj[key]
			}
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
