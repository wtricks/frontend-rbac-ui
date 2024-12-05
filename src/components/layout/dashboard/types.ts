/**
 * Sidebar menu item
 */
export interface SidebarMenuItem {
  label: string
  path?: string
  icon?: string | object
  canBeShown?: boolean
  children?: SidebarMenuItem[]
}
