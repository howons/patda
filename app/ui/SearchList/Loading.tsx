export default function Loading() {
  return (
    <div className="flex w-full flex-col">
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </div>
  );
}

function SkeletonItem() {
  return (
    <div className="h-[6.5rem] rounded-3xl border-2 border-white bg-zinc-100/70 xs:h-[7.5rem]">
      <div className="flex animate-pulse p-3">
        <div className="size-20 shrink-0 rounded-full bg-zinc-200 xs:size-24" />
        <div className="ml-4 flex grow flex-col justify-around">
          <div className="flex gap-3">
            <div className="h-5 w-20 rounded-xl bg-zinc-200" />
            <div className="h-5 w-24 rounded-xl bg-zinc-200" />
          </div>
          <div className="ml-2 flex items-center gap-3">
            <div className="size-8 rotate-45 bg-zinc-200" />
            <div className="h-5 w-20 rounded-xl bg-zinc-200" />
          </div>
        </div>
        <div className="flex flex-col items-end justify-between pr-1">
          <div className="h-4 w-12 rounded-xl bg-zinc-200" />
          <div className="h-5 w-10 rounded-xl bg-zinc-200" />
        </div>
      </div>
    </div>
  );
}
