import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface GroupCreationState {
  groupName: string;
  description: string;
  notionPageId: string;
  profileImageUrl: string;
  groupUuid?: string;
}

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
  const parsedState = savedState ? JSON.parse(savedState) : initialState;

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
