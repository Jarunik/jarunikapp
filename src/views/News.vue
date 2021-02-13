<template>
  <div class="news">
    <h1>Ark Blockchain News</h1>
     <p>
      You can post with an Ark transaction. Use a small amount and put text into the Smartbridge field. <br/>
      Recipient address: <a href="https://explorer.ark.io/wallets/AZHXnQAYajd3XkxwwiL6jnLjtDHjtAATtR">AZHXnQAYajd3XkxwwiL6jnLjtDHjtAATtR</a>
    <br>
      <i>Raw uncensored blockhain data. Use it at your onw risk. Sole responsibility lies with the author.</i>
    </p>
    <table id="news">
      <thead>
          <tr><td><b>Feed</b></td></tr>
      </thead>
      <tbody>
        <tr v-for="post in news.data" :key="post.id">
          <td v-linkified>
              {{post.vendorField}}
          <br><small>Posted on 
          <a :href="'https://explorer.ark.io/transaction/' + post.id"
              target="_blank"
              rel="noopener"
            >{{shorten(post.timestamp.human)}}</a> by 
            <a
              :href="'https://explorer.ark.io/wallets/' + post.sender"
              target="_blank"
              rel="noopener"
            >{{truncate(post.sender)}}</a>
            </small>
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
  title: "News - jarunik.com",
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
table {
    border-collapse: collapse;
}
table td {
  border: 1px solid lightgrey;
  padding: 4px;
}
small {
  font-size: xx-small;
  color: lightgrey;
}
small a {
  font-size: xx-small;
  color: lightgrey;
}
</style>