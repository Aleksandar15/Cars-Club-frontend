import { FC, ReactElement } from "react";
import ScrollToTop from "react-scroll-to-top";
// NOTE JSX.Element shorthand of === ReactElement
const ScrollToTopCustomized: FC = (): JSX.Element => {
  return (
    <ScrollToTop
      // topPosition={800} // not available
      color="cyan"
      // size="2rem" // doesn't do anything
      smooth
      className="scrollToTopComponent"
      style={{
        borderRadius: "15px 8px",
        backgroundColor: "darkmagenta",
        // backgroundColor: "blue",
      }}
    />
  );
};

export default ScrollToTopCustomized;
