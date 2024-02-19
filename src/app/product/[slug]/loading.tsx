import { Skeleton } from "@/ui";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <Skeleton className="w-full pt-[100%]" />
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-3">
            <Skeleton className="min-w-[25%] pt-[23%]" />
            <Skeleton className="min-w-[25%] pt-[23%]" />
            <Skeleton className="min-w-[25%] pt-[23%]" />
            <Skeleton className="min-w-[25%] pt-[23%]" />
          </div>
        </div>
      </div>
      <div className="sm:col-start-2 sm:col-end-4 lg:pt-12">
        <Skeleton className="mb-2 h-9 w-60" />
        <Skeleton className="mb-6 h-8 w-20" />
        <Skeleton className="mb-2 h-7 w-14" />
        <div className="mb-4 flex items-center gap-3">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
        <Skeleton className="mb-2 h-7 w-14" />
        <Skeleton className="mb-4 h-10 w-20" />
        <Skeleton className="mb-2 h-7 w-14" />
        <div className="mb-6 flex items-center gap-3">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="mb-2 h-7 w-20" />
        <Skeleton className="h-40" />
      </div>
    </div>
  );
}
