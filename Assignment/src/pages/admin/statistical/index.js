import Layout from "../layout";
import { useEffect, getData } from "@/util";

const statistical = () => {
  return Layout(Statistical);
};

function Statistical() {
  useEffect(() => {
    am5.ready(async function () {
      let root = am5.Root.new("chartdiv");

      let products = await getData("products");
      let categories = await getData("categories");

      const categoryCounts = {};

      products.forEach((product) => {
        if (product.categoryID in categoryCounts) {
          categoryCounts[product.categoryID]++;
        } else {
          categoryCounts[product.categoryID] = 1;
        }
      });

      root.setThemes([am5themes_Animated.new(root)]);

      let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          endAngle: 270,
        })
      );

      let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category",
          endAngle: 270,
        })
      );

      series.states.create("hidden", {
        endAngle: -90,
      });

      const seriesData = categories.map((category) => {
        const categoryName = category.categoryName; // Use 'name' property to access the category name
        const categoryId = category.id;
        const productCount = categoryCounts[categoryId] || 0;
        return {
          category: categoryName,
          value: productCount,
        };
      });

      series.data.setAll(seriesData);

      series.appear(1000, 100);
    });
  });

  useEffect(() => {
    am5.ready(async function () {
      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      var root = am5.Root.new("chartdiv2");

      let orders = await getData("order");
      const salesByDay = {};

      orders.forEach((order) => {
        const unitPrice = order.anmount + order.transactionfree;
        const orderDate = order.date;

        if (orderDate in salesByDay) {
          salesByDay[orderDate] += unitPrice;
        } else {
          salesByDay[orderDate] = unitPrice;
        }
      });

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
        })
      );

      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
      xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15,
      });

      xRenderer.grid.template.setAll({
        location: 1,
      });

      var xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 0.3,
          categoryField: "country",
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      var yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0.3,
          renderer: am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0.1,
          }),
        })
      );

      // Create series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      var series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series 1",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          sequencedInterpolation: true,
          categoryXField: "country",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        })
      );

      series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0,
      });
      series.columns.template.adapters.add("fill", function (fill, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      series.columns.template.adapters.add("stroke", function (stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      xAxis.data.setAll(
        Object.keys(salesByDay).map((date) => ({
          country: date,
          value: salesByDay[date],
        }))
      );
      series.data.setAll(
        Object.keys(salesByDay).map((date) => ({
          country: date,
          value: salesByDay[date],
        }))
      );

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000);
      chart.appear(1000, 100);
    }); // end am5.ready()
  });

  return `
  <h1 id="chartdiv-title">Thống kê sản phẩm theo danh mục</h1>
  <div id='chartdiv'></div>
  <h1 id="chartdiv-title">Thống kê doanh thu theo ngày</h1>
  <div id='chartdiv2'></div>
  `;
}

export default statistical;
