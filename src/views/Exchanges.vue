<template>
  <div class="exchanges">
    <h1>Binance</h1>
    <p>
      <a href="https://explorer.ark.io/wallets/AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V" target="_blank" rel="noopener">Binance Wallet</a>
    </p>
    <table id="contributions">
      <thead>
        <tr>
          <th>Incoming</th>
        <th>Date</th>
          <th>Outgoing</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions.data" :key="transaction.id">
          <td><font color=red><span v-if="transaction.sender == 'AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V'">-</span><span v-else>{{Number (Math.round(transaction.amount / 100000000) ).toLocaleString('en')}}</span></font></td>
          <td><a
              :href="'https://explorer.ark.io/transaction/' + transaction.id"
              target="_blank"
              rel="noopener"
            >{{transaction.timestamp.human.substring(11,16)}}</a></td>
          <td><font color="#0bbd27"><span v-if="transaction.sender == 'AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V'">{{Number (Math.round(transaction.amount / 100000000) ).toLocaleString('en')}}</span><span v-else>-</span></font></td>
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
</style>