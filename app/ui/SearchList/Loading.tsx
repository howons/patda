import SkeletonItem from "#ui/SearchList/SkeletonItem.jsx";

interface LoadingProps {
  single?: boolean;
}

export default function Loading({ single }: LoadingProps) {
  return (
    <div className="flex w-full flex-col">
      <SkeletonItem />
      {!single && (
        <>
          <SkeletonItem />
          <SkeletonItem />
        </>
      )}
    </div>
  );
}
