const WIDTH = 800;
const HEIGHT = 600;
const MARGIN = { top: 20, right: 20, bottom: 60, left: 100 };
export const RED = "#ff0000";
export const BLUE = "#3366ff";
export const TRANSFORM_X_AXIS = `translate(0, ${HEIGHT - MARGIN.bottom})`;
export const TRANSFORM_Y_AXIS = `translate(${MARGIN.left}, 0)`;
export const TRANSFORM_X_AXIS_LABLE = `translate(${WIDTH / 2}, ${HEIGHT - 10})`;

export const X_AXIS = "xAxis";
export const Y_AXIS = "yAxis";
export const LINE_CHART = "lineChart";
export const SCATTER_PLOT = "scatterPlot";
export const BAR_GRAPH = "barGraph";

export const DIMENSIONS = {
  margin: MARGIN,
  width: WIDTH,
  height: HEIGHT
};
