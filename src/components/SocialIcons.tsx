import Link from "next/link";
import { Button } from "./ui/Button";
import { Instagram, Youtube, Twitter, Facebook } from "lucide-react";

export default function SocialIcons() {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Link href="https://www.instagram.com/">
        <Button variant="link" size="icon" aria-label="instagram">
          <Instagram />
        </Button>
      </Link>
      <Link href="https://www.youtube.com/">
        <Button variant="link" size="icon" aria-label="youtube">
          <Youtube />
        </Button>
      </Link>
      <Link href="https://www.twitter.com/">
        <Button variant="link" size="icon" aria-label="twitter">
          <Twitter />
        </Button>
      </Link>
      <Link href="https://www.twitter.com/">
        <Button variant="link" size="icon" aria-label="twitter">
          <Facebook />
        </Button>
      </Link>
    </div>
  );
}
