<template>
  <div class="exchanges" :key="componentKey">
    <h1>Binance</h1>
    <p>
      <a
        href="https://explorer.ark.io/wallets/AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V"
        target="_blank"
        rel="noopener"
        >Binance Wallet</a
      >
    </p>
    <p>
      Display:
      <span @click="setDisplayMode('Quick')" class="pointer">
        <span v-if="displayMode === 'Quick'" style="color:#42b983">Quick </span>
        <span v-else>Quick</span>
      </span>

      |
      <span @click="setDisplayMode('Long')" class="pointer">
        <span v-if="displayMode === 'Long'" style="color:#42b983">Long</span>
        <span v-else>Long</span>
      </span>
      |
      <span @click="setDisplayMode('Day')" class="pointer">
        <span v-if="displayMode === 'Day'" style="color:#42b983">By Day</span>
        <span v-else>By Day</span>
      </span>
    </p>
    <table id="transactions">
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
          <td>
            <a
              v-if="displayMode != 'Day'"
              :href="'https://explorer.ark.io/transaction/' + transaction.id"
              target="_blank"
              rel="noopener"
              >{{ transaction.timestamp.human.substring(11, 16) }}</a
            >
            <span v-else>
              {{ transaction.timestamp.human.substring(0, 10) }}</span
            >
          </td>
          <td style="color:red">
            {{ Number(Math.round(transaction.incoming)).toLocaleString("en") }}
          </td>
          <td style="color:#0bbd27">
            {{ Number(Math.round(transaction.outgoing)).toLocaleString("en") }}
          </td>
          <td>
            <div v-if="transaction.outgoing < transaction.incoming">
              <div id="transaction-size-red">
                <div
                  v-if="displayMode != 'Day'"
                  :style="{
                    width:
                      Math.round(transaction.incoming - transaction.outgoing) /
                        500 +
                      '%',
                  }"
                ></div>
                <div
                  v-else
                  :style="{
                    width:
                      Math.round(transaction.incoming - transaction.outgoing) /
                        5000 +
                      '%',
                  }"
                ></div>
              </div>
            </div>
            <div v-else>
              <div id="transaction-size-green">
                <div
                  v-if="displayMode != 'Day'"
                  :style="{
                    width:
                      Math.round(transaction.outgoing - transaction.incoming) /
                        500 +
                      '%',
                  }"
                ></div>
                <div
                  v-else
                  :style="{
                    width:
                      Math.round(transaction.outgoing - transaction.incoming) /
                        5000 +
                      '%',
                  }"
                ></div>
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
        >More</a
      >
    </p>
  </div>
</template>

<script>
export default {
  name: "Exchanges",
  title: "Exchanges - jarunik.com",
  props: {
    msg: String,
  },
  data() {
    return {
      transactions: [],
      temporaryTransactions: [],
      errors: [],
      displayMode: "Quick",
      componentKey: 0,
    };
  },
  async mounted() {
    if (this.displayMode == "Quick") {
      this.transactions.data = [];
      await this.fetchPages(1, 1);
    }
  },
  methods: {
    async setDisplayMode(displayMode) {
      this.displayMode = displayMode;
      this.transactions.data = [];
      this.temporaryTransactions.data = [];
      if (displayMode == "Quick") {
        await this.fetchPages(1, 1);
      }
      if (displayMode == "Long") {
        await this.fetchPages(1, 10);
      }
      if (displayMode == "Day") {
        await this.fetchPages(1, 10);
      }
    },
    async fetchPages(startPage, endPage) {
      var currentPage = startPage;
      var nextPage = startPage + 1;
      var transactions = [];
      await this.axios
        .get(
          "https://api.ark.io/api/wallets/AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V/transactions?page=" +
            currentPage
        )
        .then((response) => {
          transactions = response.data;
          if (this.displayMode == "Quick" || this.displayMode == "Long") {
            if (this.transactions.data.length == 0) {
              this.transactions.data = transactions.data;
            } else {
              if (this.displayMode == "Long") {
                this.transactions.data.push.apply(
                  this.transactions.data,
                  transactions.data
                );
              }
            }
            this.transactions.data.forEach((tx) => {
              if (tx.sender == "AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V") {
                tx.outgoing = tx.amount / 100000000;
                tx.incoming = 0;
              } else {
                tx.incoming = tx.amount / 100000000;
                tx.outgoing = 0;
              }
            });
          }
          if (this.displayMode == "Day") {
            console.log("Day");
            if (this.temporaryTransactions.data.length == 0) {
              this.temporaryTransactions.data = transactions.data;
            } else {
              this.temporaryTransactions.data.push.apply(
                this.temporaryTransactions.data,
                transactions.data
              );
            }
            this.temporaryTransactions.data.forEach((tx) => {
              if (tx.sender == "AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V") {
                tx.outgoing = tx.amount / 100000000;
                tx.incoming = 0;
              } else {
                tx.incoming = tx.amount / 100000000;
                tx.outgoing = 0;
              }
            });
          }

          if (nextPage <= endPage) {
            this.fetchPages(nextPage, endPage);
          }
          if (currentPage == endPage) {
            if (this.displayMode == "Day") {
              var currentDate;
              var lastDate = "0";
              this.temporaryTransactions.data.forEach((tx) => {
                currentDate = tx.timestamp.human.substring(0, 10);
                if (lastDate == currentDate) {
                  console.log("sum and add" + currentDate);
                  this.transactions.data.forEach((transaction) => {
                    if (
                      transaction.timestamp.human.substring(0, 10) ==
                      currentDate
                    ) {
                      console.log(transaction.incoming);
                      transaction.incoming = transaction.incoming + tx.incoming;
                      transaction.outgoing = transaction.outgoing + tx.outgoing;
                    }
                  });
                } else {
                  this.transactions.data.push(tx);
                }
                lastDate = currentDate;
              });
              console.log(this.transactions.data);
            }
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: black;
}

#transaction-size-red {
  width: 180px;
  border: 2px solid white;
}
#transaction-size-red div {
  height: 10px;
  background: red;
}

#transaction-size-green {
  width: 180px;
  border: 2px solid white;
}
#transaction-size-green div {
  height: 10px;
  background: green;
}
</style>
