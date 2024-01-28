<template>
    <section class="backgrounds">
        <h2 class="backgrounds__h2">Choose your background</h2>
        <div v-for="(background, index) in backgrounds" :key="index">
          <figure class="background_item" @click="chosenBackground(background.img)">
            <img :src="background.img" alt="background">
            <figcaption>{{ background.name }}</figcaption>
          </figure>
        </div>
        <div class="div-button">
            <router-link class="button-back" to="/selection-character">Back</router-link>
            <router-link class="button-play" v-show="selectedMyBackground" to="/play">PLAY</router-link>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SelectionBackground',
  data () {
    return {
      backgrounds: [
        {
          id: 1,
          name: 'Mystic',
          img: require('@/assets/img/backgrounds/mystic.jpg')
        },
        {
          id: 2,
          name: 'Sunset',
          img: require('@/assets/img/backgrounds/pixel-background_3.jpg')
        },
        {
          id: 3,
          name: 'Mountain Rocks',
          img: require('@/assets/img/backgrounds/desert-mountain-rocks-game.webp')
        }
      ]
    }
  },
  computed: {
    ...mapState({
      selectedMyBackground: state => state.selectedBackground
    })
  },
  methods: {
    chosenBackground (image) {
      this.$store.commit('SET_SELECTED_BACKGROUND', image)
      console.info('Fondo elegido desde state para el usuario: ', this.$store.state.selectedBackground)
    }
  }
}
</script>

<style lang="sass">
@import '@/assets/sass/SelectionBackground.sass'
</style>
