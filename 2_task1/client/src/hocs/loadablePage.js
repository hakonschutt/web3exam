import Loadable from "react-loadable";
import { PageLoader } from "../components";

/**
 * High order component for lazy loading pages
 */
const loadablePage = importComponent => {
  return Loadable({
    loader: () => importComponent(),
    loading: PageLoader
  });
};

export default loadablePage;
