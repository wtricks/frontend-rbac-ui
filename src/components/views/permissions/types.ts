/**
 * Permission
 */
export interface Permission {
  title: string
  description: string
  slug: string
  module: string
}

/**
 * Module
 */
export interface Module {
  title: string
  description: string
  slug: string
  permissions: Permission[]
}
