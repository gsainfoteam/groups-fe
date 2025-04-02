import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { z } from "zod";

// Zod 스키마 정의
const groupCreationSchema = z.object({
  groupName: z.string().default(""),
  description: z.string().default(""),
  notionPageId: z.string().default(""),
  profileImageUrl: z.string().default(""),
  groupUuid: z.string().optional(),
});

// 타입을 Zod 스키마에서 추론
type GroupCreationState = z.infer<typeof groupCreationSchema>;

interface GroupCreationContextType {
  state: GroupCreationState;
  updateState: (newState: Partial<GroupCreationState>) => void;
  resetState: () => void;
}

const initialState: GroupCreationState = {
  groupName: "",
  description: "",
  notionPageId: "",
  profileImageUrl: "",
};

export const LOCAL_STORAGE_KEY_GROUP_CREATION_STATE = "groupCreationState";

const GroupCreationContext = createContext<
  GroupCreationContextType | undefined
>(undefined);

export const GroupCreationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const savedState = localStorage.getItem(
    LOCAL_STORAGE_KEY_GROUP_CREATION_STATE,
  );
  let parsedState = initialState;

  if (savedState) {
    try {
      // Zod를 사용한 유효성 검증 및 파싱
      const parsed = JSON.parse(savedState);
      const result = groupCreationSchema.safeParse(parsed);

      if (result.success) {
        parsedState = result.data;
      } else {
        console.warn(
          "Stored group creation state validation failed:",
          result.error.flatten().fieldErrors,
        );
      }
    } catch (error) {
      console.error("Failed to parse stored group creation state:", error);
    }
  }

  const [state, setState] = useState<GroupCreationState>(parsedState);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_GROUP_CREATION_STATE,
      JSON.stringify(state),
    );
  }, [state]);

  const updateState = (newState: Partial<GroupCreationState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const resetState = () => {
    setState(initialState);
    localStorage.removeItem(LOCAL_STORAGE_KEY_GROUP_CREATION_STATE);
  };

  return (
    <GroupCreationContext.Provider value={{ state, updateState, resetState }}>
      {children}
    </GroupCreationContext.Provider>
  );
};

export const useGroupCreation = () => {
  const context = useContext(GroupCreationContext);
  if (!context) {
    throw new Error(
      "useGroupCreation must be used within a GroupCreationProvider",
    );
  }
  return context;
};
