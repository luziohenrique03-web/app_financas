"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt, LogOut, Menu, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/actions/auth";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/transactions", label: "Transações", icon: Receipt },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2 px-2 py-1 text-lg font-semibold">
      <Wallet className="size-5 text-primary" />
      Meu Bolso
    </div>
  );
}

export function AppSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r bg-background md:flex md:flex-col md:gap-6 md:p-4">
      <Brand />
      <NavLinks />
      <form action={logout} className="mt-auto">
        <Button variant="ghost" className="w-full justify-start gap-3" type="submit">
          <LogOut className="size-4" />
          Sair
        </Button>
      </form>
    </aside>
  );
}

export function AppTopbar() {
  return (
    <header className="flex items-center justify-between border-b bg-background p-4 md:hidden">
      <Brand />
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="outline" size="icon">
              <Menu className="size-4" />
            </Button>
          }
        />
        <SheetContent side="left" className="flex flex-col gap-6 p-4">
          <SheetTitle render={<Brand />} />
          <NavLinks />
          <form action={logout} className="mt-auto">
            <Button variant="ghost" className="w-full justify-start gap-3" type="submit">
              <LogOut className="size-4" />
              Sair
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </header>
  );
}
