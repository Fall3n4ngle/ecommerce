import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" >
      <div className="flex items-center gap-2">
        <ShoppingBag className="h-[1.5rem] w-[1.5rem] text-ring" />
        <h1 className="text-xl font-bold uppercase">Ecmrc</h1>
      </div>
    </Link>
  );
}
