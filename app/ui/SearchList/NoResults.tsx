import SkeletonItem from "#ui/SearchList/SkeletonItem.jsx";

interface NoResultsProps {
  error?: boolean;
}

export default function NoResults({ error }: NoResultsProps) {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-1/2 h-6 w-1/2">
        <p className="absolute -left-1/2 -top-1/2 size-full text-center">
          {!error
            ? "검색 결과가 없어요..."
            : "데이터 처리 중 에러가 발생했어요. 다시 시도해주세요."}
        </p>
      </div>
      <div className="flex w-full animate-pade-out flex-col">
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </div>
    </div>
  );
}
