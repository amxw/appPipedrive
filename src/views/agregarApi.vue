<template>
  <v-layout row wrap>
    <v-flex lg8 offset-lg2>
      <v-card>
        <v-card-text>
          <h3>Agregar Clave Api</h3>
            <v-btn rounded color="success" href="https://oauth.pipedrive.com/oauth/authorize?client_id=85a2b836897cbad0&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F" block dark>Conectar</v-btn>
          </form>
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

    validarToken() {
      const self = this;
      const clave = self.codigo;

      const options = {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        url:
          "https://api.pipedrive.com/v1/dealFields?start=0&api_token=" + clave
      };
      axios(options)
        .then(function(res) {
          self.validacion = true;

          self.$snotify.success(
            "Pipedrive conectado con exito",
            "!! Felicitaciones !!",
            {
              timeout: 3000,
              showProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              titleMaxLength: 500,
              backdrop: 0.5
            }
          );
          setTimeout(function() {
            self.$snotify.remove();
          }, 4000);

          setTimeout(function() {
            self.agregarApi(clave);
          }, 4000);
        })
        .catch(function(error) {
          self.validacion = false;
          self.$snotify.error("La clave api no es correcta", "¡¡ Error !!", {
            timeout: 3000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            titleMaxLength: 300,
            backdrop: 0.5
          });
          setTimeout(function() {
            self.$snotify.remove();
          }, 4000);
        });
    }
  },
  created() {}
};
</script>