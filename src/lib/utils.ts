import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cva(base: string, variants: Record<string, Record<string, string>>) {
  return function(props: Record<string, any> = {}) {
    const classes = [base]
    
    Object.entries(variants).forEach(([variant, options]) => {
      const value = props[variant]
      if (value && options[value]) {
        classes.push(options[value])
      }
    })
    
    return cn(...classes)
  }
}
