<template>
  <v-card flat color="background" class="pb-4 px-4 rounded-lg">
    <h2 class="py-4">Recent Trades</h2>
    <div class="pt-4">

      <v-row v-for="(tradeTransaction, idx) in tradeTransactions" :key="idx" :class="getContainerClasses(idx)">
        <v-col cols="6" class="d-flex align-center">
          <img :src="tradeTransaction.from_logo" alt="asset-logo" class="asset-logo mr-2">
          <span class="secondary--text mr-3">{{ tradeTransaction.from }}</span>
          <v-icon class="mr-3" :class="tradeTransaction.isGain ? 'success--text' : 'error--text'">
            mdi-arrow-right
          </v-icon>
          <img :src="tradeTransaction.to_logo" alt="asset-logo" class="asset-logo mr-2">
          <span class="secondary--text">{{ tradeTransaction.to }}</span>
        </v-col>
        <v-col cols="6" class="text-right">
          <small>
          
           {{ tradeTransaction.time }}&nbsp;&nbsp;
          <span :class="tradeTransaction.isGain ? 'success--text' : 'error--text'">{{ activedCurrency }}{{ numberWithCommas(tradeTransaction.value) }}</span>
          </small>
        </v-col>
      </v-row>

    </div>
  </v-card>
</template>

<script lang="ts">

import { NIL } from 'uuid'
import { Component } from 'vue-property-decorator'
import { API_TYPE } from '~/constants/apiTypes'
import { BaseApp } from '~/core/Base'
import { Core } from '~/core/Core'
import { PageLoader } from '~/loader/page'
import { TradeTransactionModel } from '~/models/types'
import { TimeHelper } from '~/utils/TimeHelper'

@Component
export default class IndexRecentTrades extends BaseApp {
  tradeTransactions: TradeTransactionModel[] = []
  activedCurrency = '$'

async mounted() {
    //this.tradeTransactionLoader.initial() 
   // this.poolTokensLoader.initial()
     this.tradeTransactionLoader.$fetch()
  }

  get tradeTransactionLoader(): PageLoader {
    return new PageLoader(this, (data: any) => ({
      apiType: API_TYPE.PAMCHAIN,
      baseURL: Core.PAMChainAPI('/api/trades'),
      params: {},
      onFetchSuccess: (newValue: any) => {
    
     const ts = this.tradeTransactionLoader.fetchItems
     let tranasctions = []
    if (ts && ts.length > 0) {
    for (let i=0; i<ts.length; i++) {  
          let tradeTransaction: TradeTransactionModel = {}
          tradeTransaction.from = ts[i]["token_in_symbol"]
          tradeTransaction.to = ts[i]["token_out_symbol"]
          tradeTransaction.tradeType = ts[i]["trade_type"]
          tradeTransaction.value = ts[i]["value"]
          tradeTransaction.isGain = true


          tradeTransaction.from_logo = ts[i]["token_in_address"]
          tradeTransaction.to_logo = ts[i]["token_out_address"]
         // getERC20TokenModelByAddress
          if (ts[i]["trade_type"]=='burn') {
             tradeTransaction.isGain = false
          }
          tradeTransaction.time = TimeHelper.getShortTimeForTable(ts[i]["created_at"])
          tranasctions.push(tradeTransaction)
       }
       this.tradeTransactions = tranasctions
        console.log("TRADE TRADE TRADE", tranasctions)
    }
    return null


      },
    }))
  }



  // items = [
  //   {
  //     from: 'WETH',
  //     from_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     to: 'DEGEN',
  //     to_logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/8699.png',
  //     time: '31',
  //     time_unit: 'minutes',
  //     value: '4,906.65',
  //     isGain: true
  //   },
  //   {
  //     from: 'DEGEN',
  //     from_logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/8699.png',
  //     to: 'WETH',
  //     to_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     time: '33',
  //     time_unit: 'minutes',
  //     value: '996.74',
  //     isGain: false
  //   },
  //   {
  //     from: 'DEGEN',
  //     from_logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/8699.png',
  //     to: 'WETH',
  //     to_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     time: '7',
  //     time_unit: 'hours',
  //     value: '3,147.41',
  //     isGain: false
  //   },
  //   {
  //     from: 'WETH',
  //     from_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     to: 'DEGEN',
  //     to_logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/8699.png',
  //     time: '8',
  //     time_unit: 'hours',
  //     value: '1,260.09',
  //     isGain: false
  //   },
  //   {
  //     from: 'DEGEN',
  //     from_logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/8699.png',
  //     to: 'WETH',
  //     to_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     time: '10',
  //     time_unit: 'hours',
  //     value: '10,625.93',
  //     isGain: true
  //   },
  //   {
  //     from: 'DEGEN',
  //     from_logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/8699.png',
  //     to: 'WETH',
  //     to_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     time: '11',
  //     time_unit: 'hours',
  //     value: '3,382.49',
  //     isGain: false
  //   },
  //   {
  //     from: 'DEGEN',
  //     from_logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/8699.png',
  //     to: 'WETH',
  //     to_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     time: '13',
  //     time_unit: 'hours',
  //     value: '986.28',
  //     isGain: true
  //   },
  //   {
  //     from: 'DEGEN',
  //     from_logo: 'https://s2.coinmarketcap.com/static/img/coins/200x200/8699.png',
  //     to: 'WETH',
  //     to_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/628px-Ethereum_logo_2014.svg.png',
  //     time: '14',
  //     time_unit: 'hours',
  //     value: '5,680.05',
  //     isGain: true
  //   }
  // ]

  getDurationDisplayText (time: string, unit: string): string {
    return `${(unit === 'hours' || unit === 'hour') ? 'about' : ''} ${time} ${unit} ago for`
  }

  getContainerClasses (idx: number): object {
    return {
      'highlight-background': idx % 2 === 0
    }
  }

  numberWithCommas(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
</script>

<style scoped>
.asset-logo {
  height: 20px;
  width: auto;
}
.highlight-background {
  background-color: #4A4E51;
}
</style>
