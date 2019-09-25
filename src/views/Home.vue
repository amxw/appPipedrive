<template>
  <v-layout>
    <h3>Bienvenido {{usuario.nombre}}</h3>
  </v-layout>
</template>

<script>
import router from "@/router";
import { mapState, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "Inicio",
  computed: {
    ...mapState(["usuario","api"])
  },
  methods: {
    ...mapActions(["agregarApi"]),

    obtenerTokenFinal(id){

      var user = "85a2b836897cbad0:";
      var pass = "3f96b9cdea7b32ffdaa0aed0f26b42327cce1172"

      var credentials = "Basic "+btoa(user+pass);
      console.log(credentials);
      const params = {
        "grant_type": "authorization_code",
        "redirect_uri": "http://localhost:8080/",
        "code": id
      }
       const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": credentials
        },
        data: params,
        url: "https://oauth.pipedrive.com/oauth/token"
      };

      axios(options).then(function(res){
        console.log(res);
      }).catch(function(error){
        console.log(error);
      });

    }

  },
  created() {
    const token =  this.$route.query.code
    
    console.log(token);
    this.obtenerTokenFinal(token);
    this.agregarApi(token);

  }
};
</script>
