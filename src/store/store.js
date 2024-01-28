import Vue from 'vue'
import Vuex from 'vuex'
import Toast from 'vue-toasted'
// import { socket } from '/server'

Vue.use(Vuex)
Vue.use(Toast)

const store = new Vuex.Store({
  state: {
    connectedClients: [],
    selectedChar: '',
    selectedCharEnemy: '',
    selectedBackground: '',
    currentTurn: 'user',
    heroChar: {
      HP: 100,
      MP: 100,
      surrender: false
    },
    enemyChar: {
      HP: 100,
      MP: 100
    },
    // Math.floor(Math.random() * (5 - 1 + 1) + 1)
    normalAttack: Math.floor(Math.random() * (5 - 1 + 1) + 1),
    healHP: {
      points: Math.floor(Math.random() * (10 - 6 + 1) + 6), // Se saca de puntos de vida, en este caso, un nº aleatorio entre 6 y 10 puntos (extremos inclusive)
      // 10 - 1 hace referencia a max - min y + 1, se le está sumando al min el resultado del random + (10 - 1)
      costMP: 15
    },
    specialAttack: {
      damage: Math.floor(Math.random() * (10 - 6 + 1) + 6),
      costMP: 10
    },
    message: '',
    gameOver: false,
    gameOverMessage: ''
  },
  mutations: {
    ADD_CLIENT (state, client) {
      // Añadir el cliente a la lista de clientes conectados
      state.connectedClients.push(client)
    },
    REMOVE_CLIENT (state, clientID) {
      // Eliminar el cliente de la lista de clientes conectados
      const index = state.connectedClients.findIndex(client => client.id === clientID)
      if (index !== -1) { // Si el cliente existe en la lista de clientes conectados
        state.connectedClients.splice(index, 1)
      }
    },
    SET_SELECTED_CHAR (state, image) {
      state.selectedChar = image
    },
    SET_SELECTED_CHAR_ENEMY (state, image) {
      state.selectedCharEnemy = image
    },
    SET_SELECTED_BACKGROUND (state, image) {
      state.selectedBackground = image
    },
    UPDATE_NORMAL_ATTACK_DAMAGE (state) {
      state.normalAttack = Math.floor(Math.random() * (5 - 1 + 1) + 1)
    },
    UPDATE_SPECIAL_ATTACK_DAMAGE (state) {
      state.specialAttack.damage = Math.floor(Math.random() * (10 - 6 + 1) + 6)
    },
    UPDATE_HEAL_HP_POINTS (state) {
      state.healHP.points = Math.floor(Math.random() * (10 - 6 + 1) + 6)
    },
    UPDATE_NORMAL_ATTACK (state, message) {
      this.commit('UPDATE_NORMAL_ATTACK_DAMAGE')
      if (state.currentTurn === 'user') {
        console.log('la cantidad de daño para el ataque normal es de: ', state.normalAttack)
        state.enemyChar.HP -= state.normalAttack
        console.log('ahora el hp del ordenador es de:', state.enemyChar.HP)
        if (state.enemyChar.HP < 0) {
          this.commit('GAME_OVER', 'WINNER!')
          return
        }
        Vue.toasted.show(`${message} ${state.normalAttack} damage.`, { duration: 1000, className: 'normalAttackToast' })
        state.currentTurn = 'computer'
        console.info(state.currentTurn)
      } else if (state.currentTurn === 'computer') {
        state.currentTurn = 'user'
        state.heroChar.HP -= state.normalAttack
        if (state.heroChar.HP < 0) {
          return this.commit('GAME_OVER', 'GAME OVER')
        }
        Vue.toasted.show(`${message} ${state.normalAttack} damage.`, { duration: 1000, className: 'normalAttackToast' })
        console.info(state.currentTurn)
      }
    },
    UPDATE_SPECIAL_ATTACK (state, message) {
      this.commit('UPDATE_SPECIAL_ATTACK_DAMAGE')
      console.log('la cantidad de daño para el ataque especial es de: ', state.specialAttack.damage)
      if (state.currentTurn === 'user') {
        state.enemyChar.HP -= state.specialAttack.damage
        state.heroChar.MP -= state.specialAttack.costMP
        if (state.enemyChar.HP < 0) {
          this.commit('GAME_OVER', 'WINNER!')
          return
        }
        Vue.toasted.show(`${message} ${state.specialAttack.damage} damage.`, { duration: 1000, className: 'normalSpecialToast' })
        state.currentTurn = 'computer'
        console.info(state.currentTurn)
      } else if (state.currentTurn === 'computer') {
        state.currentTurn = 'user'
        state.heroChar.HP -= state.specialAttack.damage
        state.enemyChar.MP -= state.specialAttack.costMP
        Vue.toasted.show(`${message} ${state.specialAttack.damage} damage.`, { duration: 1000, className: 'normalSpecialToast' })
        if (state.heroChar.HP < 0) {
          this.commit('GAME_OVER', 'GAME OVER.')
          return
        }
        console.info(state.currentTurn)
      }
    },
    UPDATE_HEAL_HP (state, message) {
      if (state.currentTurn === 'user') {
        state.heroChar.HP += state.healHP.points
        Vue.toasted.show(`${message} ${state.healHP.points} points.`, { duration: 1000, className: 'normalHealToast' })
        if (state.heroChar.HP + state.healHP.points > 100) {
          state.heroChar.HP = 100
        }
        state.heroChar.MP -= state.healHP.costMP
        state.currentTurn = 'computer'
      } else if (state.currentTurn === 'computer') {
        state.enemyChar.HP += state.healHP.points
        Vue.toasted.show(`${message} ${state.healHP.points} points.`, { duration: 1000, className: 'normalHealToast' })
        if (state.enemyChar.HP + state.healHP.points > 100) {
          state.enemyChar.HP = 100
        }
        state.enemyChar.MP -= state.healHP.costMP
        state.currentTurn = 'user'
      }
    },
    GAME_OVER (state, message) {
      state.gameOver = true
      console.info('mensaje de juego acabado', message)
      state.gameOverMessage = message
      console.log('GAME_OVER mutation called, gameOverMessage:', state.gameOverMessage)
    },
    SET_SURRENDER (state, { value, message }) {
      state.heroChar.surrender = value
      state.message = message
      console.log(state.message)
    },
    RESTART (state) {
      state.currentTurn = 'user'
      state.heroChar.HP = 100
      state.heroChar.MP = 100
      state.heroChar.surrender = false
      state.enemyChar.HP = 100
      state.enemyChar.MP = 100
      state.gameOver = false
      state.gameOverMessage = ''
      state.message = ''
      console.log('propiedad state llamada surrender: ', state.heroChar.surrender)
    }
  },
  actions: {
    attackUser ({commit, dispatch, state}) {
      console.log('se está llamando a la acción attackUser')
      console.log('heroChar HP:', state.heroChar.HP)
      console.log('enemyChar HP:', state.enemyChar.HP)
      if (state.heroChar.HP <= 0) {
        console.log('La vida del jugador es de 0 o menos.')
        return commit('GAME_OVER', 'GAME OVER')
      } else if (state.enemyChar.HP <= 0) {
        console.log('La vida del ordenador es de 0 o menos.')
        return commit('GAME_OVER', 'WINNER!')
      }
      commit('UPDATE_NORMAL_ATTACK', 'Causes ')
      dispatch('computerAction')
    },
    specialAttackUser ({commit, dispatch, state}) {
      if (state.heroChar.HP <= 0) {
        console.log('La vida del jugador es de 0 o menos.')
        return commit('GAME_OVER', 'GAME OVER')
      } else if (state.enemyChar.HP <= 0) {
        console.log('La vida del ordenador es de 0 o menos.')
        return commit('GAME_OVER', 'WINNER!')
      }
      if (state.heroChar.MP >= state.specialAttack.costMP) {
        commit('UPDATE_SPECIAL_ATTACK', 'Hero\'s special attack!, causes ')
        dispatch('computerAction')
      }
    },
    healUser ({commit, dispatch, state}) {
      this.commit('UPDATE_HEAL_HP_POINTS')
      if (state.heroChar.HP <= 0) {
        console.log('La vida del jugador es de 0 o menos.')
        return commit('GAME_OVER', 'GAME OVER')
      } else if (state.enemyChar.HP <= 0) {
        console.log('La vida del ordenador es de 0 o menos.')
        return commit('GAME_OVER', 'WINNER!')
      }
      if (state.heroChar.MP >= state.healHP.costMP) {
        commit('UPDATE_HEAL_HP', 'Heroe healed ')
        dispatch('computerAction')
      }
    },
    surrender ({commit}) {
      commit('SET_SURRENDER', {value: true, message: 'Withdrawn!'})
    },
    restart ({commit}) {
      console.log('estamos en la acción restart. llamando a la mutación RESTART')
      commit('RESTART')
    },
    computerAction ({commit, state}) {
      if (state.heroChar.HP > 0) {
        const randomChoice = Math.floor(Math.random() * (3 - 1 + 1) + 1)
        if (randomChoice === 1) {
          console.info('El ordenador ha elegido, el ', randomChoice)
          commit('UPDATE_NORMAL_ATTACK', 'Loses ')
        }
        if (randomChoice === 2) {
          console.info('El ordenador ha elegido, el ', randomChoice)
          if (state.enemyChar.MP < state.specialAttack.costMP) {
            state.currentTurn = 'user'
            return -1
          }
          if (state.enemyChar.MP > state.specialAttack.costMP) {
            commit('UPDATE_SPECIAL_ATTACK', 'Enemy\'s special attack!, loses ')
          }
        }
        if (randomChoice === 3) {
          console.info('El ordenador ha elegido, el ', randomChoice)
          if (state.enemyChar.MP < state.healHP.costMP) {
            state.currentTurn = 'user'
            return -1
          } else if (state.enemyChar.MP > state.healHP.costMP) {
            commit('UPDATE_HEAL_HP', 'Enemy healed ')
          }
        }
      }
    }
  }
})

export default store
