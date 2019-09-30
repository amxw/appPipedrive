import Vue from 'vue'
import Vuex from 'vuex'

import { auth, db } from '@/firebase'
import router from '@/router'
import { stat } from 'fs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: '',
    api: '',
  },
  mutations: {
    nuevoUsuario(state, payload) {
      if (payload === null) {
        state.usuario = ''
      } else {
        state.usuario = payload
      }
    },
    setTarea(state, dato){
      state.api = dato
    },
    borrarapi(state){
      state.api = "";
    }
    ,
    setApi(state,clave){
      state.api = clave
    }
  },
  actions: {
    async setUsuario({ commit }, user) {

      try {
        const doc = await db.collection('usuarios').doc(user.uid).get()
        if (doc.exists) {
          commit('nuevoUsuario', doc.data())
        } else {
          const usuario = {
            nombre: user.displayName,
            email: user.email,
            uid: user.uid,
            foto: user.photoURL
          }
          await db.collection('usuarios').doc(usuario.uid).set(
            usuario
          )
          console.log('Usuario guardado en DB');
          commit('nuevoUsuario', usuario)
        }

      } catch (error) {
        console.log(error);
      }


    },
    cerrarSesion({ commit }) {
      auth.signOut()
      commit('nuevoUsuario', null)
      router.push({ name: 'ingreso' })
      commit('borrarapi')
    },
    agregarApi({commit},dato){
      let clave = dato;
      commit('setApi',clave)
      if(!this.state.api == ''){
        console.log('clave agregada con exito')
        router.push({name: 'agregarApi'})
      }else{
        console.log('no se pudo agregar la clave')
      }
    },
    validarToken({commit}){
      let clave = this.state.api;
      if(clave == ""){
        router.push({name: 'agregarApi'})
      }
    }
  }
})
