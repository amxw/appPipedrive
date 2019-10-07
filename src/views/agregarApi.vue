<template>
  <v-layout row wrap>
    <v-flex lg8 offset-lg2>
      <v-card>
        <v-card-text>
          <h3 v-if="validacion == false">Agregar Clave Api</h3>
          <v-btn v-if="validacion == false" rounded color="success" href="http://localhost:8080/" block dark>Conectar</v-btn>
          <v-chip v-if="validacion == true" color="success" text-color="white">
            <v-avatar>
              <v-icon>fa-check-circle</v-icon>
            </v-avatar>Pipedrive Conectado
          </v-chip>
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

    obtenerTokenFinal(id) {
      self = this;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${id}`
        },
        url: "https://api-proxy.pipedrive.com/dealFields"
      };
      axios(options)
        .then(function(res) {
          console.log(res.data.data);
          if(res.data.data != null){
             self.validacion = true;
          }
         
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    const token = this.$route.query.code;

    console.log(token);
    if (token != null) {
      this.obtenerTokenFinal(token);
      this.agregarApi(token);
    }
  }
};
</script>