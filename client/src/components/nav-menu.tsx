import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Link } from "wouter";

export function NavMenu() {
  return (
    <NavigationMenu className="max-w-screen-xl mx-auto px-4 py-6">
      <NavigationMenuList className="flex gap-6">
        <NavigationMenuItem>
          <Link href="/">
            <NavigationMenuLink className="text-lg font-semibold hover:text-primary">
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/products">
            <NavigationMenuLink className="text-lg font-semibold hover:text-primary">
              Products
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact">
            <NavigationMenuLink className="text-lg font-semibold hover:text-primary">
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
