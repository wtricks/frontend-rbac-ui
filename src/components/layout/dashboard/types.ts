/**
 * Sidebar menu item
 */
export interface SidebarMenuItem {
  label: string
  path?: string
  icon?: string | object
  children?: SidebarMenuItem[]
}
