<template>
  <main class="main">
    <div class="blocks">
      <section class="characters">
        <h2 class="characters__h2">Choose your character</h2>
        <div v-for="(character, index) in characters" :key="index">
          <figure class="char_item" @click="chosenCharacter(character.animatedImg)" :style="'outline=4px solid yellow;'">
            <img :src="character.img" alt="character">
            <figcaption>{{ character.name }}</figcaption>
          </figure>
        </div>
      </section>
      <div class="div-button">
        <router-link class="button-back" to="/">Back</router-link>
        <router-link v-show="selectedMyChar" class="button-next" to="/next">Next</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SelectionCharacter',
  data () {
    return {
      characters: [
        {
          id: 1,
          name: 'Nagisa',
          img: require('@/assets/img/characters/chars-png/misumi_nagisa_and_cure_black_precure_by_takoyaki_neko_san.png'),
          animatedImg: require('@/assets/img/characters/misumi_nagisa_and_cure_black_precure_by_takoyaki_neko_san.gif')
        },
        {
          id: 2,
          name: 'Honoka',
          img: require('@/assets/img/characters/chars-png/yukishiro_honoka_white_precure_by_takoyaki_neko_san.png'),
          animatedImg: require('@/assets/img/characters/yukishiro_honoka_white_precure_by_takoyaki_neko_san.gif')
        },
        {
          id: 3,
          name: 'Yuri',
          img: require('@/assets/img/characters/chars-png/tsukikage_yuri_and_cure_moonlight_precure_by_takoyaki_neko_san.png'),
          animatedImg: require('@/assets/img/characters/tsukikage_yuri_and_cure_moonlight_precure_by_takoyaki_neko_san.gif')
        },
        {
          id: 4,
          name: 'Kanade',
          img: require('@/assets/img/characters/chars-png/minamino_kanade_rhythm_precure_by_takoyaki_neko_san.png'),
          animatedImg: require('@/assets/img/characters/minamino_kanade_rhythm_precure_by_takoyaki_neko_san.gif')
        },
        {
          id: 5,
          name: 'Erika',
          img: require('@/assets/img/characters/chars-png/kurumi_erika_marine_precure_by_takoyaki_neko_san.png'),
          animatedImg: require('@/assets/img/characters/kurumi_erika_marine_precure_by_takoyaki_neko_san.gif')
        },
        {
          id: 6,
          name: 'Hibiki',
          img: require('@/assets/img/characters/chars-png/houjou_hibiki_melody_precure_by_takoyaki_neko_san.png'),
          animatedImg: require('@/assets/img/characters/houjou_hibiki_melody_precure_by_takoyaki_neko_san.gif')
        }
      ]
    }
  },
  computed: {
    ...mapState({
      selectedMyChar: state => state.selectedChar
    })
  },
  methods: {
    chosenCharacter (image) {
      this.$store.commit('SET_SELECTED_CHAR', image)
      console.info('Personaje elegido desde state: ', this.$store.state.selectedChar)
      let availableChars = this.characters.filter(char => char.animatedImg !== this.$store.state.selectedChar)
      console.info('lista de personajes disponibles', availableChars.map(char => char.animatedImg))
      this.chosenCharacterEnemy(availableChars)
    },
    chosenCharacterEnemy (chars) {
      // let image = chars[Math.floor(Math.random() * (this.characters.length - 1 + 1) + 1)].animatedImg
      let image = chars[Math.floor(Math.random() * this.characters.length - 1)].animatedImg
      console.log('Imagen escogida por random: ', image)
      this.$store.commit('SET_SELECTED_CHAR_ENEMY', image)
      console.info('Personaje elegido desde state para el ordenador: ', this.$store.state.selectedCharEnemy)
    }
  },
  mounted () {
    console.log('selectedMyChar = ', this.selectedChar)
  }
}
</script>

<style lang="sass">
@import '@/assets/sass/Selection.sass'
</style>
