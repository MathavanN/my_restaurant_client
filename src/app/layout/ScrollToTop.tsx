import { withRouter } from 'react-router-dom';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ScrollToTop = ({ children, location: { pathname } }: any) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return children;
};

export default withRouter(ScrollToTop);
