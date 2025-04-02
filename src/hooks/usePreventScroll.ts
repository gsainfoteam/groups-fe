import { useEffect, useRef } from "react";

interface UsePreventScrollOptions {
  /**
   * 스크롤 위치를 저장할지 여부 (기본값: true)
   */
  savePosition?: boolean;

  /**
   * 스크롤을 방지할 대상 요소 (기본값: document.body)
   */
  targetElement?: HTMLElement | null;
}

/**
 * 모달이 열렸을 때 배경 스크롤을 방지하는 커스텀 훅
 * @param options - 스크롤 방지 옵션
 */
const usePreventScroll = (options: UsePreventScrollOptions = {}): void => {
  const {
    savePosition = true,
    targetElement = typeof document !== "undefined" ? document.body : null,
  } = options;

  const scrollPositionRef = useRef<number>(0);

  useEffect(() => {
    // SSR 대응
    if (typeof document === "undefined" || !targetElement) return;

    // 현재 스크롤 위치 저장
    if (savePosition) {
      scrollPositionRef.current = window.pageYOffset;
    }

    // 스크롤 방지 스타일 적용
    targetElement.style.overflow = "hidden";
    targetElement.style.position = "fixed";
    targetElement.style.top = `-${scrollPositionRef.current}px`;
    targetElement.style.width = "100%";

    return () => {
      // 컴포넌트 언마운트 시 스크롤 방지 스타일 제거
      targetElement.style.overflow = "";
      targetElement.style.position = "";
      targetElement.style.top = "";
      targetElement.style.width = "";

      // 스크롤 위치 복원
      if (savePosition) {
        window.scrollTo(0, scrollPositionRef.current);
      }
    };
  }, [savePosition, targetElement]);
};

export default usePreventScroll;
