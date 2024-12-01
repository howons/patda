import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";

export default function useDuplTimeout(
  isActive: boolean,
  setIsActive: Dispatch<SetStateAction<boolean>>,
  isDuplActive: boolean,
  setIsDuplActive: Dispatch<SetStateAction<boolean>>
) {
  const activeTimeoutRef = useRef<NodeJS.Timeout | undefined>();
  useEffect(() => {
    if (isActive || isDuplActive) {
      activeTimeoutRef.current = setTimeout(() => {
        setIsActive(false);
      }, 2000);
    }

    return () => clearTimeout(activeTimeoutRef.current);
  }, [isActive, isDuplActive, setIsActive]);

  const duplTimeoutRef = useRef<NodeJS.Timeout | undefined>();
  useEffect(() => {
    if (isDuplActive) {
      duplTimeoutRef.current = setTimeout(() => {
        setIsDuplActive(false);
      }, 100);
    }

    return () => clearTimeout(duplTimeoutRef.current);
  }, [isDuplActive, setIsDuplActive]);
}
