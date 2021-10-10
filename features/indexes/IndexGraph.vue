<template>
  <v-card class="pa-3 rounded-lg custom-shadow">
    <v-row class="px-3">
      <v-col class="pb-0">
        <div class="d-flex">
          <v-avatar size="24" class="mr-2">
            <img :src="icon" :alt="poolModel.name" />
          </v-avatar>
          <h3>{{ poolModel.name }}</h3>
        </div>
      </v-col>
      <v-col cols="auto" class="pb-0">
        <span>
          <span :class="dayClass" @click="onSelectDuration('day')">DAY</span>
          <span class="mx-2">|</span>
          <span :class="weekClass" @click="onSelectDuration('week')">WEEK</span>
        </span>
      </v-col>
    </v-row>
    <v-row class="px-3">
      <v-col class="pt-0">
        <h4 class="d-inline mr-2">
          {{ activedCurrency }}{{ item.currentPrice }}
        </h4>
        <h4 class="d-inline" :class="getDifClasses">
          {{ item.isIncreased ? '+' : '-' }}{{ activedCurrency
          }}{{ item.difPrice }}
        </h4>
        <h4 class="d-inline" :class="getDifClasses">
          ({{ item.isIncreased ? '+' : '-' }}{{ item.difPercent }}%)
        </h4>
      </v-col>
    </v-row>
    <apexchart
      type="line"
      height="300"
      :options="chartOptions"
      :series="series"
    />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { BaseApp } from '~/core/Base'
import { PoolModel } from '~/models/types'
import {
  // ERC20TokenAddress,
  // PoolsAddress,
  // getERC20TokenModelByAddress,
  getPoolModelByName,
} from '~/constants/chainAddress'

@Component
export default class IndexGraph extends BaseApp {
  @Prop(String) readonly pool_name!: string
  @Prop(String) readonly icon!: string
  poolModel: PoolModel = {}
  selecetedDuration = 'day'
  activedCurrency = '$'

  item = {
    name: 'DEVIL3',
    image: 'https://via.placeholder.com/60',
    currentPrice: '5.68',
    isIncreased: true,
    difPrice: '0.65',
    difPercent: '13.01',
  }

  mounted() {
    this.poolModel = getPoolModelByName(this.pool_name)
  }

  onSelectDuration(duration: string) {
    this.selecetedDuration = duration
  }

  get getDifClasses(): object {
    return {
      'primary--text': this.item.isIncreased,
      'error--text': !this.item.isIncreased,
    }
  }

  get dayClass(): object {
    return {
      'duration-lable': true,
      'primary--text': this.selecetedDuration === 'day',
      'inactived-lable': this.selecetedDuration !== 'day',
    }
  }

  get weekClass(): object {
    return {
      'duration-lable': true,
      'primary--text': this.selecetedDuration === 'week',
      'inactived-lable': this.selecetedDuration !== 'week',
    }
  }

  series = [
    {
      name: 'Desktops',
      data: [4.7, 5.1, 5.3, 4.9, 4.8, 5.03, 5.68],
    },
  ]

  chartOptions = {
    chart: {
      height: 350,
      type: 'area',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
        tools: {
          download: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      width: [1],
    },
    colors: ['#47EACC'],
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      categories: ['3', '4', '5', '6', '7', '8', '9'],
      labels: {
        style: {
          colors: '#FFFFFF',
          fontSize: '16px',
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
      },
      labels: {
        style: {
          colors: '#FFFFFF',
          fontSize: '16px',
          fontWeight: 400,
        },
      },
    },
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false,
      },
    },
  }
}
</script>

<style scoped>
.duration-lable {
  cursor: pointer;
}
.inactived-lable {
  color: #4a4e51;
}
</style>
