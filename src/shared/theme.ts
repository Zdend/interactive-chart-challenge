export const COLORS = {
  PRIMARY: '#7fba00',
  SUCCESS: '#4CAF50',
  ERROR: '#F44336',
  WARNING: '#FF9800',
  INFO: '#2196F3',
  GREY: '#a5adb7',
};

export const BASE_UNIT = 4;
export const REM = BASE_UNIT * 4;


export enum BREAKPOINT {
  xs = '575px',
  sm = '576px',
  md = '768px',
  lg = '992px',
  xl = '1200px',
  xxl = '1600px'
}

type BreakpointKeys = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

type BreakpointWidth = {
  [key in BreakpointKeys]: number;
};
export const BREAKPOINT_WIDTH: BreakpointWidth = Object.entries(BREAKPOINT).reduce(
  (result, [key, value]) => ({
    ...result,
    [key]: +value.replace('px', '')
  }),
  {}
) as BreakpointWidth;