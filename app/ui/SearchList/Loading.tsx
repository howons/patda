import SkeletonItem from "#ui/SearchList/SkeletonItem.jsx";

export default function Loading() {
  return (
    <div className="flex w-full flex-col">
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </div>
  );
}
