import { cn } from "@/common/utils";
import { X, Check } from "lucide-react";

type Props = {
  variant: "error" | "success";
  messages: string;
};

export default function ToastMessage({ messages, variant }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full",
          variant === "error" ? "bg-destructive" : "bg-primary",
        )}
      >
        {variant === "error" ? (
          <X className="h-5 w-5 text-[#f8f8f7]" />
        ) : (
          <Check className="h-5 w-5 text-[#f8f8f7]" />
        )}
      </div>
      {messages}
    </div>
  );
}
