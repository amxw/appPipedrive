<template>
  <v-layout row wrap>
    <v-flex lg8 offset-lg2>
      <v-card>
        <v-card-text>
          <h3>Agregar Clave Api</h3>
          <v-btn
            rounded
            color="success"
            href="http://localhost:8080/"
            block
            dark
          >Conectar</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
    <vue-snotify></vue-snotify>
  </v-layout>
</template>
<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "agregarApi",
  data() {
    return {
      codigo: "",
      validacion: false
    };
  },
  methods: {
    ...mapActions(["agregarApi"]),
  },
  created() {
    const token = this.$route.query.code;

    console.log(token);
    this.agregarApi(token);
  }
};
</script>