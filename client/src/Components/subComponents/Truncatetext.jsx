import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const TruncateText = ({ text, maxHeight, className }) => {
  const containerRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (container.scrollHeight > maxHeight) {
      setIsTruncated(true);
    } else {
      setIsTruncated(false);
    }
  }, [text, maxHeight]);

  const truncatedStyle = isTruncated ? { maxHeight, overflow: "hidden" } : {};

  return (
    <div ref={containerRef} style={truncatedStyle} className={className}>
      {text}
    </div>
  );
};

TruncateText.propTypes = {
  text: PropTypes.string.isRequired,
  maxHeight: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
};

export default TruncateText;
