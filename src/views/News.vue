<template>
  <div class="news">
    <h1>Ark Blockchain News</h1>
     <p>
      To post: Send a transaction with a minimal amount and text in the Smartbridge field to the following address: <br/>
      <a href="https://explorer.ark.io/wallets/AZHXnQAYajd3XkxwwiL6jnLjtDHjtAATtR">AZHXnQAYajd3XkxwwiL6jnLjtDHjtAATtR</a>
    </p>
    <p>
      Raw uncensored blockhain data. Use it at your onw risk. Sole responsibility lies with the author.
    </p>
    <table id="news">
      <thead>
        <tr>
          <th>News</th>
          <th>Date</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in news.data" :key="post.id">
          <td v-linkified>{{post.vendorField}}</td>
          <td><a
              :href="'https://explorer.ark.io/transaction/' + post.id"
              target="_blank"
              rel="noopener"
            >{{shorten(post.timestamp.human)}}</a></td>
          <td>
            <a
              :href="'https://explorer.ark.io/wallets/' + post.sender"
              target="_blank"
              rel="noopener"
            >{{truncate(post.sender)}}</a>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      <a
        href="https://explorer.ark.io/wallets/AZHXnQAYajd3XkxwwiL6jnLjtDHjtAATtR/transactions/received/1"
        target="_blank"
        rel="noopener"
      >More</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'News',
  props: {
    msg: String
  },
  data () {
    return {
      news: {},
      errors: []
    }
  },
  methods: {
    truncate (value, length = 13, truncateWhere = 'middle') {
      const odd = length % 2
      const truncationLength = Math.floor((length - 1) / 2)
      switch (truncateWhere) {
        case 'left':
          return (value.length > length)
            ? `...${value.slice(value.length - length + 3)}`
            : value
        case 'middle':
          return (value.length > length)
            ? `${value.slice(0, truncationLength - odd)}...${value.slice(value.length - truncationLength + 1)}`
            : value
        case 'right':
          return (value.length > length)
            ? `${value.slice(0, length - 3)}...`
            : value
        default:
          return value
      }
    },
    shorten (string) {
        return string.substring(0, 10)
    }

  },
  mounted () {
    this.axios
      .get('https://api.ark.io/api/wallets/AZHXnQAYajd3XkxwwiL6jnLjtDHjtAATtR/transactions/received')
      .then(response => {
        this.news = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>