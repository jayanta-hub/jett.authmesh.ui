// Utility to extract allowed MenuIds from menu API response
export function extractAllowedMenuIds(menuApiResponse: any): string[] {
  const menuIds = new Set<string>();
  if (!menuApiResponse?.Pages) return [];
  menuApiResponse.Pages.forEach((page: any) => {
    page.Sections?.forEach((section: any) => {
      // Include MenuIds from all relevant categories: Header, SubMenu, Content, etc.
      if (["Header", "SubMenu", "Content"].includes(section.Category)) {
        section.Menus?.forEach((menu: any) => {
          if (menu.MenuId) menuIds.add(menu.MenuId);
        });
      }
    });
  });
  return Array.from(menuIds);
} 