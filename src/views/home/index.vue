<template>
  <div class="app-container">
    <div id="canvas" style="width: 50%;height: 20%;float: left;"></div>
    <div id="canvas1" style="width: 50%;height: 20%;float: left;"></div>

  </div>
</template>

<script>
  import { Line } from '@antv/g2plot';
  import { Bar } from '@antv/g2plot';
  import { Column } from '@antv/g2plot';

  export default {
    name: "index",
    mounted() {
      this.drawLinePlot();
      this.drawColumn();
    },
    methods: {

      drawColumn() {
        const data = [
          {
            type: '家具家电',
            sales: 380,
          },
          {
            type: '粮油副食',
            sales: 52,
          },
          {
            type: '生鲜水果',
            sales: 61,
          },
          {
            type: '美容洗护',
            sales: 20,
          },
          {
            type: '母婴用品',
            sales: 48,
          },
          {
            type: '进口食品',
            sales: 38,
          },
          {
            type: '食品饮料',
            sales: 38,
          },
          {
            type: '家庭清洁',
            sales: 38,
          },
        ];

        const columnPlot = new Column(document.getElementById('canvas1'), {
          title: {
            visible: true,
            text: '基础柱状图-图形标签位置',
          },
          // description: {
          //   visible: true,
          //   text: '基础柱状图的图形标签位置可以指定为top-柱形上部，middle-柱形中心，bottom-柱形底部。',
          // },
          forceFit: true,
          data,
          padding: 'auto',
          xField: 'type',
          yField: 'sales',
          meta: {
            type: {
              alias: '类别',
            },
            sales: {
              alias: '销售额(万)',
            },
          },
          label: {
            visible: true,
            position: 'top', // option: middle / top / bottom
          },
        });

        columnPlot.render();

      },
      drawLinePlot() {
        const data = [
          { year: '1991', value: 3 },
          { year: '1992', value: 4 },
          { year: '1993', value: 3.5 },
          { year: '1994', value: 5 },
          { year: '1995', value: 4.9 },
          { year: '1996', value: 6 },
          { year: '1997', value: 7 },
          { year: '1998', value: 9 },
          { year: '1999', value: 13 },
        ];

        const linePlot = new Line(document.getElementById('canvas'), {
          title: {
            visible: true,
            text: '配置折线数据点样式',
          },
          // description: {
          //   visible: true,
          //   text: '自定义配置趋势线上数据点的样式',
          // },
          padding: 'auto',
          forceFit: true,
          data,
          xField: 'year',
          yField: 'value',
          label: {
            visible: true,
            type: 'point',
          },
          point: {
            visible: true,
            size: 5,
            shape: 'diamond',
            style: {
              fill: 'white',
              stroke: '#2593fc',
              lineWidth: 2,
            },
          },
        });

        linePlot.render();

      },

    }
  }
</script>

<style scoped>

</style>
