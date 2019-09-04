<template>
  <v-layout row wrap>
    <v-flex lg8 offset-lg2>
      <v-card>
        <v-card-text>
          <h3>Agregar Clave Api</h3>
          <form @submit.prevent="agregarApi(codigo)">
            <v-text-field v-model="codigo" label="codigo"></v-text-field>
            <v-btn rounded color="success" type="submit" block dark>Agregar</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import {mapActions} from 'vuex';
export default {
    name: "agregarApi",
    data(){
        return{
            codigo: ''
        }
    },
    methods:{
        ...mapActions(['agregarApi'])
    }
}
</script>