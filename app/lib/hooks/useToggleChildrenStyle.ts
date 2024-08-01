import { useCallback, useEffect, useRef } from "react";

/**
 * 어떤 컨테이너의 자식 엘레먼트들의 className을 trigger에 따라 toggle하는 훅.
 * @param {string} styleToToggle - toggle할 className.
 * @param {any} trigger - toggle을 유발할 값.
 * @param {number} delay - toggle 후 delay 밀리초 이후 값을 원복, 미지정시 원복하지 않음.
 * @param {boolean} shouldTriggerAtChange - trigger의 값이 변경될 때 toggle을 true로 할지 여부, delay와 함께 사용.
 */
function useToggleChildrenStyle<ChildElement extends HTMLElement>(
  styleToToggle: string,
  trigger: any,
  delay?: number,
  shouldTriggerAtChange?: boolean
) {
  const parentRef = useRef<ChildElement | null>(null);
  const initRef = useRef(false);

  const toggleDuration = useCallback(
    (force?: boolean) => {
      Array.from(parentRef.current?.children ?? []).forEach((container) => {
        container.classList.toggle(styleToToggle, force);
      });
    },
    [styleToToggle]
  );

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      return;
    }

    toggleDuration(shouldTriggerAtChange || !!trigger);
    delay &&
      setTimeout(() => {
        toggleDuration(!shouldTriggerAtChange && !trigger);
      }, delay);
  }, [styleToToggle, trigger, delay, shouldTriggerAtChange, toggleDuration]);

  return { parentRef };
}

export default useToggleChildrenStyle;
