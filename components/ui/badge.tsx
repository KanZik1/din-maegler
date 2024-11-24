import { ReactNode } from 'react'

interface BadgeProps {
    children: ReactNode
    variant?: 'default' | 'secondary' | 'destructive' | 'green'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
    const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'
    const variantClasses = {
        default: 'bg-blue-100 text-blue-800',
        secondary: 'bg-gray-100 text-gray-800',
        destructive: 'bg-red-100 text-red-800',
        green: 'bg-green-100 text-green-800'
    }

    return (
        <span className={`${baseClasses} ${variantClasses[variant]}`}>
            {children}
        </span>
    )
}

