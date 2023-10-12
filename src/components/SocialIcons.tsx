import Link from "next/link";
import { Button } from "./ui/Button";
import { Instagram, Youtube, Twitter, Facebook } from "lucide-react";

export default function SocialIcons() {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Link href="/">
        <Button variant="link" size="icon">
          <Instagram />
        </Button>
      </Link>
      <Link href="/">
        <Button variant="link" size="icon">
          <Youtube />
        </Button>
      </Link>
      <Link href="/">
        <Button variant="link" size="icon">
          <Twitter />
        </Button>
      </Link>
      <Link href="/">
        <Button variant="link" size="icon">
          <Facebook />
        </Button>
      </Link>
    </div>
  );
}
