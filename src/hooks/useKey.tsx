import { useEffect } from "react";

type KeyType = string | string[];

/**
 * 특정 키를 누르면 지정된 콜백 함수를 실행하는 훅
 * @param key 감지할 키 또는 키 배열 (예: "Escape", "Enter", ["Escape", "Enter"])
 * @param callback 키를 눌렀을 때 실행할 함수
 * @param event 이벤트 타입 ("keydown" | "keyup" | "keypress") - 기본값: "keydown"
 */
const useKey = (
  key: KeyType,
  callback?: () => void,
  event: "keydown" | "keyup" | "keypress" = "keydown",
) => {
  useEffect(() => {
    if (!callback) return;

    const handleKeyEvent = (e: KeyboardEvent) => {
      if (
        (Array.isArray(key) && key.includes(e.key)) ||
        (!Array.isArray(key) && e.key === key)
      ) {
        callback();
      }
    };

    document.addEventListener(event, handleKeyEvent);

    return () => {
      document.removeEventListener(event, handleKeyEvent);
    };
  }, [key, callback, event]);
};

export default useKey;
