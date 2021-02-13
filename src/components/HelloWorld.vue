<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Iterative development. Please don't expect much in version 0.0.1
    </p>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://twitter.com/jarunik" target="_blank" rel="noopener">Twitter</a></li>
    </ul>
    <h3>Ark Links</h3>
    <ul>
      <li><a href="https://ark.io" target="_blank" rel="noopener">ark.io</a></li>
      <li><a href="https://marketsquare.io" target="_blank" rel="noopener">marketsquare.io</a></li>
      <li><a href="https://deployer.io" target="_blank" rel="noopener">deployer.io</a></li>
      <li><a href="https://nodem.io" target="_blank" rel="noopener">nodem.io</a></li>
      <li><a href="https://protokol.com" target="_blank" rel="noopener">protokol.com</a></li>
      <li><a href="https://discord.ark.io/" target="_blank" rel="noopener">Ark Discord</a></li>
    </ul>
    <h3>Interactive</h3>
    <ul>
      <li><a href="https://discord.ark.io/" target="_blank" rel="noopener">Ark Discord</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #0bbd27;
}
</style>
