<template>
  <div class="delegates">
    <h1>Ark Delegates</h1>
    <table id="delegates">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Delegate</th>
          <th>Votes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="delegate in delegates.data" :key="delegate.id">
            <td v-bind:class="{ standby: delegate.rank > 51 }">{{delegate.rank}}</td>
            <td v-bind:class="{ standby: delegate.rank > 51 }">{{delegate.username}}</td>
            <td v-bind:class="{ standby: delegate.rank > 51 }">{{Number (Math.round(delegate.votes / 100000000) ).toLocaleString('en')}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Delegates',
  title: "Delegates - jarunik.com",
  props: {
    msg: String
  },
  data () {
    return {
      delegates: {},
      errors: []
    }
  },
  mounted () {
    this.axios
      .get('https://api.ark.io/api/delegates')
      .then(response => {
        this.delegates = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
td.standby {
  color: red;
}
</style>