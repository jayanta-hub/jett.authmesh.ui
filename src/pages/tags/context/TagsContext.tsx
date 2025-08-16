import React, { createContext, useContext, useState, ReactNode } from 'react';

type TagsContextType = {
  editFlag: boolean;
  setEditFlag: React.Dispatch<React.SetStateAction<boolean>>;
  editTagOnLastPage: boolean;
  setEditTagOnLastPage: React.Dispatch<React.SetStateAction<boolean>>;
};

const TagsContext = createContext<TagsContextType | undefined>(undefined);

export const TagsProvider = ({ children }: { children: ReactNode }) => {
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [editTagOnLastPage, setEditTagOnLastPage] = useState<boolean>(false);

  const value = React.useMemo(
    () => ({
      editFlag,
      setEditFlag,
      editTagOnLastPage,
      setEditTagOnLastPage
    }),
    [editFlag, editTagOnLastPage]
  );

  return (
    <TagsContext.Provider value={value}>
      {children}
    </TagsContext.Provider>
  );
};

export const useTagsContext = () => {
  const context = useContext(TagsContext);
  if (!context) {
    throw new Error('useTagsContext must be used within a TagsProvider');
  }
  return context;
};
