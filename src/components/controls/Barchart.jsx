import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { Stack, Animation } from "@devexpress/dx-react-chart";

const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row",
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: "nowrap",
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);

export default class Barchart extends React.PureComponent {
  render() {
    // const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart data={this.props.Columns}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            name="Actual"
            valueField="actual"
            argumentField="country"
            color="#9abf47"
          />
          <BarSeries
            name="V6. Std"
            valueField="std"
            argumentField="country"
            color="#adadad"
          />

          <Animation />
          <Legend
            position="bottom"
            rootComponent={Root}
            labelComponent={Label}
          />
          <Title text="Performance" />
          <Stack />
        </Chart>
      </Paper>
    );
  }
}
