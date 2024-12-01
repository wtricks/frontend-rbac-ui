/**
 * Input props
 */
export interface InputProps {
  label?: string
  id?: string
  type?: string
  modelValue?: string | number
  placeholder?: string
  iconLeft?: string | object | (() => void)
  iconRight?: string | object | (() => void)
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  helperText?: string
  name: string
}

/**
 * Button props
 */
export interface ButtonProps {
  label?: string
  icon?: string | object | (() => void)
  variant?: 'primary' | 'secondary' | 'outline' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
}
