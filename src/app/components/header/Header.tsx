"use client";

import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import { Button, Input } from "@/ui";
import { Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import SearchInput from "./SearchInput";
import CartButton from "./CartButton";

export default function Header() {
  const pathname = usePathname();
  const [searchActive, setSearchActive] = useState(false);

  const handleSearchClose = () => {
    setSearchActive(false);
  };

  if (pathname.includes("/studio")) return null;
  const isOnProductsPage = pathname === "/";

  const searchInput = (
    <Suspense fallback={<Input className="w-full" />}>
      <SearchInput />
    </Suspense>
  );

  let content;
  if (searchActive) {
    content = (
      <div className="flex items-center justify-center gap-2">
        <div className="w-full max-w-[500px]">{searchInput}</div>
        <Button variant="outline" size="icon" onClick={handleSearchClose}>
          <X className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
    );
  } else {
    content = (
      <div className="flex items-center justify-between gap-4">
        <Logo />
        <div className="hidden w-full max-w-[500px] sm:block">
          {isOnProductsPage ? searchInput : null}
        </div>
        <div className="flex items-center gap-2">
          {isOnProductsPage ? (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSearchActive(true)}
              className="sm:hidden"
            >
              <Search className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          ) : null}
          <CartButton />
          <ModeToggle />
        </div>
      </div>
    );
  }

  return (
    <header className="container sticky top-0 z-50 bg-background py-4">
      {content}
    </header>
  );
}
