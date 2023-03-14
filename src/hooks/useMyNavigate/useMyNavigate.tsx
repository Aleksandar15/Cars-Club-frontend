import { useNavigate } from "react-router-dom";

const useMyNavigate = () => {
  const navigate = useNavigate();
  const navigatePage = (route: string) => navigate(route);
  return navigatePage;
};

export default useMyNavigate;
