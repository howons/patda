import SkeletonItem from "#ui/SearchList/SkeletonItem.jsx";

interface NoResultsProps {
  error?: boolean;
  single?: boolean;
}

export default function NoResults({ error, single }: NoResultsProps) {
  let errorMessage = "";
  if (error) {
    errorMessage = "데이터 처리 중 에러가 발생했어요. 다시 시도해주세요.";
  } else if (!single) {
    errorMessage = "검색 결과가 없어요...";
  }

  return (
    <div className="relative">
      {!single && (
        <div className="absolute left-1/2 top-1/2 h-6 w-1/2">
          <p className="absolute -left-1/2 -top-1/2 size-full text-center">
            {errorMessage}
          </p>
        </div>
      )}
      <div className="flex w-full animate-pade-out flex-col">
        <SkeletonItem />
        {!single && (
          <>
            <SkeletonItem />
            <SkeletonItem />
          </>
        )}
      </div>
    </div>
  );
}
