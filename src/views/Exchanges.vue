<template>
  <div class="exchanges">
    <h1>Binance</h1>
    <p>
      <a href="https://explorer.ark.io/wallets/AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V" target="_blank" rel="noopener">Binance Wallet</a>
    </p>
    <table id="contributions">
      <thead>
        <tr>
          <th>Date</th>
                    <th>Incoming</th>
          <th>Outgoing</th>
          <th>Size Indicator</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions.data" :key="transaction.id">
                      <td><a
              :href="'https://explorer.ark.io/transaction/' + transaction.id"
              target="_blank"
              rel="noopener"
            >{{transaction.timestamp.human.substring(11,16)}}</a></td>
          <td><font color=red><span v-if="transaction.sender == 'AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V'">-</span><span v-else>{{Number (Math.round(transaction.amount / 100000000) ).toLocaleString('en')}}</span></font></td>
          <td><font color="#0bbd27"><span v-if="transaction.sender == 'AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V'">{{Number (Math.round(transaction.amount / 100000000) ).toLocaleString('en')}}</span><span v-else>-</span></font></td>
          <td>
            <div v-if="transaction.sender !== 'AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V'">
              <div id="transaction-size-red">
                <div :style="{width: Math.round(transaction.amount / 100000000) / 500 + '%'}"></div>
              </div>
            </div>
            <div v-else>
              <div id="transaction-size-green">
                <div :style="{width: Math.round(transaction.amount / 100000000) / 500 + '%'}"></div>
              </div>
           </div>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      <a
        href="https://explorer.ark.io/wallets/AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V/transactions"
        target="_blank"
        rel="noopener"
      >More</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Exchanges',
  props: {
    msg: String
  },
  data () {
    return {
      transactions: {},
      errors: []
    }
  },
  mounted () {
    this.axios
      .get('https://api.ark.io/api/wallets/AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V/transactions')
      .then(response => {
        this.transactions = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color:black;
}

#transaction-size-red {
  width: 180px;
  border: 2px solid white;
}
#transaction-size-red  div {
  height: 10px;
  background: red;
}

#transaction-size-green {
  width: 180px;
  border: 2px solid white;
}
#transaction-size-green  div {
  height: 10px;
  background: green;
}
</style>