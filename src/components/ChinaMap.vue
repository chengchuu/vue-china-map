<template>
  <section
    class="map-page"
    aria-label="China heat map"
  >
    <div
      ref="chartRef"
      class="china-map"
    />
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import { ScatterChart, EffectScatterChart, MapChart } from 'echarts/charts'
import {
  GeoComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import chinaGeoJson from 'china-map-geojson/lib/china'
import { useChinaMapStore } from '../stores/chinaMap'

echarts.use([
  CanvasRenderer,
  EffectScatterChart,
  GeoComponent,
  GridComponent,
  LegendComponent,
  MapChart,
  ScatterChart,
  TitleComponent,
  TooltipComponent
])

echarts.registerMap('china', chinaGeoJson)

const chartRef = ref(null)
const store = useChinaMapStore()
let chart = null
let refreshTimer = null

const loadingOptions = {
  text: '加载中...',
  color: '#23531',
  textColor: '#fff',
  maskColor: '#272D3A',
  zlevel: 0
}

const baseOptions = {
  backgroundColor: '#272D3A',
  title: {
    text: '中国地图闪闪发光',
    left: 'center',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: params => `${params.name} : ${params.value?.[2] ?? ''}`
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    top: 'bottom',
    data: ['地区热度', 'top5'],
    textStyle: {
      color: '#fff'
    }
  },
  geo: {
    map: 'china',
    label: {
      show: false
    },
    emphasis: {
      label: {
        show: false
      },
      itemStyle: {
        areaColor: '#8796B4'
      }
    },
    itemStyle: {
      areaColor: '#465471',
      borderColor: '#282F3C'
    }
  },
  series: [
    {
      name: '地区热度',
      type: 'scatter',
      coordinateSystem: 'geo',
      data: [],
      symbolSize: 12,
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: false
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        }
      },
      itemStyle: {
        color: '#ddb926'
      }
    },
    {
      name: 'top5',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: [],
      symbolSize: 12,
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      emphasis: {
        scale: true
      },
      label: {
        show: false
      },
      itemStyle: {
        color: '#f4e925',
        shadowBlur: 10,
        shadowColor: '#333'
      },
      zlevel: 1
    }
  ]
}

const refreshData = async () => {
  const { paleData, lightData } = await store.fetchHeatChinaRealData()

  if (store.isLoading) {
    chart.hideLoading()
    store.closeLoading()
  }

  chart.setOption({
    series: [
      {
        name: '地区热度',
        data: paleData
      },
      {
        name: 'top5',
        data: lightData
      }
    ]
  })
}

const resizeChart = () => {
  chart?.resize()
}

onMounted(async () => {
  chart = echarts.init(chartRef.value)
  chart.setOption(baseOptions)
  chart.showLoading(loadingOptions)
  store.openLoading()

  await refreshData()
  refreshTimer = window.setInterval(refreshData, 1000)
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  if (refreshTimer) {
    window.clearInterval(refreshTimer)
  }

  window.removeEventListener('resize', resizeChart)
  chart?.dispose()
})
</script>
