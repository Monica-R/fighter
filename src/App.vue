<template>
  <div id="app" :style="getImage">
    <router-view class="cont"></router-view>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Game from '@/components/Game'

export default {
  name: 'App',
  components: {
    Footer, Game
  },
  computed: {
    getImage () {
      return 'background-image: linear-gradient(0deg, #ff478a 0%, #0026cf 100%)'
    }
  }
}
</script>

<style lang="sass">
@import '@/assets/sass/App.sass'
</style>
