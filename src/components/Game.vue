<template>
  <main class="principal">
    <div class="paint-background" :style="getBackground"></div>
    <div class="game-over" v-if="gameOver">
      <!-- <h2>GAME OVER!</h2> -->
      <h2>{{ gameOverMessage }}</h2>
    </div>
    <div class="give-up" v-if="userSurrender" @click="giveUp">
      <h1 class="give-up__h1">{{ message }}</h1>
      <div class="give-up-buttons">
        <button class="again" @click="restartGame">Try again?</button>
        <router-link class="again" to="/">New game</router-link>
      </div>
    </div>
    <div class="buttons">
      <button @click="attack" :disabled="isDisabled">
        <img class="fist" src="../assets/img/others/mailed-fist-svg.svg" alt="fist">
      </button>
      <button @click="specialAttack" :disabled="isDisabled">
        <img class="wand" src="../assets/img/others/fairy-wand-svg.svg" alt="wand">
      </button>
      <button @click="heal" :disabled="isDisabled">
        <img class="cross" src="../assets/img/others/hospital-cross-svg.svg" alt="cross">
      </button>
      <button @click="giveUp">
        <img class="flag" src="../assets/img/others/flying-flag-svg.svg" alt="flag">
      </button>
    </div>
    <div class="players">
      <section class="player__item">
        <div class="player__item__info">
          <div class="player__hp" :style="{ width: heroCharHP + '%' }">{{ heroCharHP }} / 100</div>
          <div class="player__mp" :style="{ width: heroCharMP + '%' }">{{ heroCharMP }} / 100</div>
        </div>
          <img :src="selectedMyChar" :class="{ 'attack-animation': isAttacking }" alt="char-img">
      </section>
      <section class="computer__item">
          <img :src="selectedEnemyChar" :class="{ 'attack-animation': isAttacking }" alt="char-img">
          <div class="computer__item__info">
              <div class="computer__hp" :style="{ width: enemyCharHP + '%' }">{{ enemyCharHP }} / 100</div>
              <div class="computer__mp" :style="{ width: enemyCharMP + '%' }">{{ enemyCharMP }} / 100</div>
          </div>
      </section>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Game',
  data () {
    return {
      isAttacking: false,
      isDisabled: false
    }
  },
  updated () {
    console.log('SET_SURRENDER mutation called, userSurrender:', this.userSurrender)
  },
  computed: {
    ...mapState({
      selectedMyChar: state => state.selectedChar,
      selectedEnemyChar: state => state.selectedCharEnemy,
      selectedMyBackground: state => state.selectedBackground,
      heroCharHP: state => state.heroChar.HP,
      heroCharMP: state => state.heroChar.MP,
      enemyCharHP: state => state.enemyChar.HP,
      enemyCharMP: state => state.enemyChar.MP,
      userSurrender: state => state.heroChar.surrender,
      gameOver: state => {
        console.log('state gameOver', state.gameOver)
        return state.gameOver
      },
      gameOverMessage: state => state.gameOverMessage,
      message: state => state.message
    }),
    getBackground () {
      return 'background-image: url(' + this.selectedMyBackground + ')'
    }
  },
  methods: {
    ...mapActions(['attackUser', 'specialAttackUser', 'healUser', 'surrender', 'restart']),
    attack () {
      console.info('llamando a la acción atacar')
      this.isAttacking = true
      this.isDisabled = true
      setTimeout(() => {
        this.isAttacking = false
      }, 2000)
      this.attackUser()
      setTimeout(() => { this.isDisabled = false }, 3000)
    },
    specialAttack () {
      console.info('llamando a la acción ataque especial')
      this.isAttacking = true
      this.isDisabled = true
      setTimeout(() => {
        this.isAttacking = false
      }, 2000)
      this.specialAttackUser()
      setTimeout(() => { this.isDisabled = false }, 3000)
    },
    heal () {
      this.isDisabled = true
      console.info('llamando a la acción curar')
      this.healUser()
      setTimeout(() => { this.isDisabled = false }, 3000)
    },
    giveUp () {
      console.info('llamando a la acción rendirse')
      this.surrender()
    },
    restartGame () {
      console.info('llamando a la acción reiniciar juego')
      this.restart()
    }
  }
}
</script>

<style lang="sass">
@import '@/assets/sass/Game.sass'
.footer
  position: relative
  z-index: 3
</style>
