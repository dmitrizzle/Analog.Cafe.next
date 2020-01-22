const DEFAULT = {
  showBrandName: false,
  tallMargin: false,
  isMinimal: false,
};
const MINIMAL = {
  ...DEFAULT,
  isMinimal: true,
};
const HIDDEN = {
  ...MINIMAL,
  isHidden: true,
};

export const NAV_CONFIG = {
  DEFAULT,
  MINIMAL,
  HIDDEN,
  LIST: {
    isMinimal: false,
    showBrandName: true,
    tallMargin: true,
  },
};
