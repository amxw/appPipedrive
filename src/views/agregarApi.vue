<template>
  <v-layout row wrap>
    <v-flex lg8 offset-lg2>
      <v-card>
        <v-card-text>
          <h3>Agregar Clave Api</h3>
          <v-btn
            rounded
            color="success"
            href="https://oauth.pipedrive.com/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fpipedrive%2Fcallback&client_id=85a2b836897cbad0"
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

    obtenerTokenFinal(id) {

      const params = {
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:8080/auth/pipedrive/callback",
        code: id,
        client_id: "85a2b836897cbad0",
        client_secret: "3f96b9cdea7b32ffdaa0aed0f26b42327cce1172"
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: params,
        url: "https://oauth.pipedrive.com/oauth/token"
      };
        this.$http.post('https://oauth.pipedrive.com/oauth/token',options,params).then(function(res){
            console.log("conectado")
        }).catch(function(error){
          console.log(error);
        })
    },
  },
  created() {
    const token = this.$route.query.code;

    console.log(token);
    this.obtenerTokenFinal(token);
    this.agregarApi(token);
  }
};
</script>