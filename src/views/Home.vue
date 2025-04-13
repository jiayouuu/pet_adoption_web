<template>
  <div style="color: #666;font-size: 14px;">
    <div style="margin-bottom: 60px">
      <el-card>
        <div class="welcome"> <b>你好{{ user.nickname }}！ 欢迎使用萌宠在线数据看板</b></div>
        <el-divider />
        <el-divider />
        <el-row>
          <el-col :span="12">
            <div ref="barLine" style="width: 500px; height: 400px"></div>
          </el-col>

          <el-col :span="12">
            <div ref="pie" style="width: 500px; height: 400px"></div>
          </el-col>
        </el-row>
      </el-card>
    </div>

  </div>
</template>

<script>

import * as echarts from 'echarts';

export default {
  name: "Home",
  data() {
    return {
      user: this.$store.state.user
    }
  },
  mounted:async function(){  // 页面元素渲染后再触发

    const option = {
      title: {
        text: '用户注册时间统计',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} 人次'
      },
      xAxis: {
        type: 'category',
        data: []
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [],
          type: 'line',
          smooth: true
        },
        {
          data: [],
          type: 'bar'
        }
      ]
    };
    const myChart = echarts.init(this.$refs.barLine);
    const {data}=await this.request.get("/echarts/quarter")
      option.xAxis.data = data.map(i=>i.quarterName)
      option.series[0].data = data.map(i=>i.count)
      option.series[1].data = data.map(i=>i.count)
      // 数据准备完毕之后再set
      myChart.setOption(option);


    // 饼图

    const pieOption = {
      title: {
        text: '用户性别占比统计',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}人 ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          type: 'pie',
          radius: '60%',
          label: {            //饼图图形上的文本标签
            normal: {
              show: true,
              position: 'inner', //标签的位置
              textStyle: {
                fontWeight: 300,
                fontSize: 14,    //文字的字体大小
                color: "#fff"
              },
              formatter: '{b}  {d}%'
            }
          },
          data: [],  // 填空
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    const pieChart = echarts.init(this.$refs.pie);
    const {data:pieData} =await this.request.get("/echarts/sex")

      pieOption.series[0].data = pieData.map(i=>({
        name:i.sex,
        value:i.count
      }))
      pieChart.setOption(pieOption)
  }
}
</script>

<style scoped>
.welcome {
  font-size: 32px;
  color: #1E90FF;
}
</style>
