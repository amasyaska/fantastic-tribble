import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@lib/utils'
import { LoaderCircleIcon } from 'lucide-react'

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300 relative',
	{
		variants: {
			variant: {
				default:
					'bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90',
				destructive:
					'bg-red-500 text-zinc-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90',
				outline:
					'border border-zinc-200 shadow-sm hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
				secondary:
					'bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80',
				ghost:
					'hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
				link: 'text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'h-9 w-9',
				icon_sm: 'size-7',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	isLoading?: boolean
	withOneChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			isLoading,
			disabled,
			children,
			withOneChild,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button'

		if (variant == 'link' || withOneChild) {
			return (
				<Comp
					className={cn(buttonVariants({ variant, size, className }))}
					ref={ref}
					disabled={disabled}
					children={children}
					{...props}
				/>
			)
		}

		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				disabled={disabled || isLoading}
				{...props}
			>
				{isLoading && <LoaderCircleIcon className='animate-spin absolute' />}
				<div
					className={cn('flex gap-2 items-center justify-center', {
						'opacity-0': isLoading,
					})}
				>
					{children}
				</div>
			</Comp>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
