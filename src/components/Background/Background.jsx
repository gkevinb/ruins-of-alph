import BackgroundPixels from "../BackgroundPixels";
import styles from "./Background.module.css";

const Background = ({
  children,
  className = '',
  contentClassName = '',
  style,
  contentStyle,
  pixelSize = 4,
  targetSize = 8,
  horizontalDirection = 'ltr',
  componentId,
  ...rest
}) => {
  const rootClassName = [styles.root, className].filter(Boolean).join(' ');
  const contentClasses = [styles.content, contentClassName].filter(Boolean).join(' ');

  return (
    <div className={rootClassName} style={style} {...rest}>
      <BackgroundPixels
        componentId={componentId}
        pixelSize={pixelSize}
        targetSize={targetSize}
        horizontalDirection={horizontalDirection}
      />
      <div className={contentClasses} style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default Background;
