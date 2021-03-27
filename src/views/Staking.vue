<template>
  <div class="staking">
    <h1>Staking</h1>
    <p>My Account: <input v-model="account" size="40" /></p>
    <p>My Delegate: <input v-model="delegate" size="40" /></p>
    <p>Year: <input v-model="year" size="20" /></p>
    <button v-on:click="fetchData">Calculate</button>
    <p>Total: {{ Number((totalAmount / 100000000).toFixed(2)) }}</p>
    <table id="transactions">
      <thead>
        <tr>
          <th>Date</th>
          <th>Reward</th>
          <th>Sender</th>
          <th>Booking Text</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tx in transactions" :key="tx.id">
          <td>
            <a
              :href="'https://explorer.ark.io/transaction/' + tx.id"
              target="_blank"
              rel="noopener"
              >{{ germanize(tx.timestamp.human) }}</a
            >
          </td>
          <td>
            {{ Number((amount(tx, account, delegate) / 100000000).toFixed(2)) }}
          </td>
          <td>
            <a
              :href="'https://explorer.ark.io/wallets/' + tx.sender"
              target="_blank"
              rel="noopener"
              >{{ tx.sender.substring(0, 6) + "..." }}</a
            >
          </td>
          <td>
            {{ tx.vendorField }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  title: "Staking - jarunik.com",
  name: "Staking",
  data() {
    return {
      transactions: {},
      totalAmount: 0,
      account: "ASNxTEnZVDNiMKR2pXnssrgKHwRYvGpS8d", // "ANaBAcnie5vcaHRgwrCUijyvkLgRA8zP6S",
      delegate: "ALUeCYpPvPUMt9FUEWWf2xAoaX3WXo9hou", // "Aasu14aTs9ipZdy1FMv7ay1Vqn3jPskA8t",
      year: 2020,
      loadedAccount: "",
      errors: [],
    };
  },
  methods: {
    fetchData() {
      this.transactions = {};
      this.loadedAccount = "";
      this.axios
        .get(
          "https://api.ark.io/api/wallets/" +
            this.account +
            "/transactions/received?page=1&limit=100"
        )
        .then((response) => {
          this.transactions = response.data.data;
          this.loadedAccount = this.account;

          for (let page = 2; page <= 20; page++) {
            this.fetchPage(page);
            console.log(page)
          }

          this.filterTransactions();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    fetchPage(page) {
      this.axios
        .get(
          "https://api.ark.io/api/wallets/" +
            this.account +
            "/transactions/received?page=" +
            page +
            "&limit=100"
        )
        .then((response) => {
          this.transactions.push.apply(this.transactions, response.data.data);
          this.filterTransactions();
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    filterTransactions() {
      // Filter for Transfer and Multipayments only
      this.transactions = this.transactions.filter((tx) => {
        return tx.type == 0 || tx.type == 6;
      });
      // Filter for Year
      this.transactions = this.transactions.filter((tx) => {
        return tx.timestamp.human.substring(0, 4) == this.year;
      });

      this.transactions.sort((a, b) => (a.timestamp.unix > b.timestamp.unix) ? -1 : 1)

      var total = 0;
      this.transactions.forEach((tx) => { 
        total = total + Number(this.amount(tx,this.account,this.delegate));
      });
      this.totalAmount = total;
    },
    germanize(string) {
      // 2019-02-21 -> 21.02.2019
      var date = string.substring(0, 10);
      return (
        date.substring(8, 10) +
        "." +
        date.substring(5, 7) +
        "." +
        date.substring(0, 4)
      );
    },
    amount(tx, account, delegate) {
      var forgingReward;
      forgingReward = tx.amount;

      if (tx.sender != delegate) {
        forgingReward = 0;
      }

      if (tx.type == 6) {
        tx.asset.payments.forEach(function(payment) {
          if (payment.recipientId == account) {
            forgingReward = payment.amount;
          }
        });
        return forgingReward;
      }

      return forgingReward;
    },
  },
  mounted() {
    null;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
