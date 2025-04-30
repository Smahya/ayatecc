import { useEffect, useState } from "react";

export const useDocument = () => {
  const [_document, set_document] = useState<Document | null>(null);

  useEffect(() => {
    set_document(document);
  }, []);

  return { _document };
};
