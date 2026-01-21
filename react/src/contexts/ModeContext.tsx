import {
  useState,
  createContext,
  SetStateAction,
  Dispatch,
  ReactNode,
} from "react";

interface ModeProviderValue {
  showAll: boolean;
  setShowAll: Dispatch<SetStateAction<boolean>>;
}

export const ModeContext = createContext<ModeProviderValue>({
  showAll: false,
  setShowAll: () => {},
});

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [showAll, setShowAll] = useState<boolean>(true);

  return (
    <ModeContext.Provider value={{ showAll, setShowAll }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeProvider;
