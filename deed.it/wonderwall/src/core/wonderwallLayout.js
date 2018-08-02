const FIXED_HEIGHT = 'fixedHeight';
const FIXED_WIDTH = 'fixedWidth';
const FIXED_HEIGHT_LANDSCAPE = 'fixedHeightLandscape';
const FIXED_WIDTH_LANDSCAPE = 'fixedWidthLandscape';
const FIXED_HEIGHT_PORTRAIT = 'fixedHeightPortrait';
const FIXED_WIDTH_PORTRAIT = 'fixedWidthPortrait';

const getViewportDimensions = () => {
  return {
    width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  };
}

const getImageDimensions = (layout, isPopup) => {
  const viewport = getViewportDimensions();
  let actuaLayout;
  const isLandscape = viewport.width > viewport.height;
  if (layout === FIXED_HEIGHT) {
    actuaLayout = (isLandscape) ? FIXED_HEIGHT_LANDSCAPE : FIXED_HEIGHT_PORTRAIT;
  } else {
    actuaLayout = (isLandscape) ? FIXED_WIDTH_LANDSCAPE : FIXED_WIDTH_PORTRAIT;
  }
  const popupMultiplier = (isPopup) ? 2 : 1;
  switch(actuaLayout) {
    case FIXED_HEIGHT_LANDSCAPE:
      return {
        height: Math.floor(viewport.height/3.3) * popupMultiplier
      };
    case FIXED_WIDTH_LANDSCAPE:
      return {
        width: Math.floor(viewport.width/6) * popupMultiplier
      };
    case FIXED_HEIGHT_PORTRAIT:
      return {
        height: Math.floor(viewport.height/11) * popupMultiplier
      };
    case FIXED_WIDTH_PORTRAIT:
      return {
        width: Math.floor(viewport.width/3.3) * popupMultiplier
      };
    default:
      throw new Error(`Unknown wonderwall layout ${layout}`);
  }
};

export {
  getImageDimensions,
  FIXED_HEIGHT,
  FIXED_WIDTH
};

