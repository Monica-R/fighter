<template>
    <main class="main">
        <h1 class="main__h1"><span>CRYSTAL</span> FIGHTERS</h1>
        <router-link class="main__router-link" to="/selection-character">Start</router-link>
    </main>
</template>

<script>
export default {
  name: 'Main',
  mounted () {
    this.$store.dispatch('restart')
  }
}
</script>

<style lang="sass">
@import '@/assets/sass/Main.sass'
</style>
