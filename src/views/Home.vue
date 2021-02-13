<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Welcome to jarunik.com</h1>
    <p>
      Iterative development. Please don't expect much in version {{version}}
    </p>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://explorer.ark.io/delegate-monitor" target="_blank" rel="noopener">Delegate Monitor</a></li>
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
  name: 'Home',
  title: "Home - jarunik.com",
  data: function() {
    return {
      version: process.env.VUE_APP_VERSION
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>