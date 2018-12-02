import Loadable from "react-loadable";
import { PageLoader } from "../components";

const loadablePage = importComponent => {
  return Loadable({
    loader: () => importComponent(),
    loading: PageLoader
  });
};

export default loadablePage;
