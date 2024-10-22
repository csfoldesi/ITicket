import { useParams } from "react-router-dom";

const useIdParam = (): string | undefined => {
  let { id } = useParams<{ id: string }>();
  return id;
};

export default useIdParam;
