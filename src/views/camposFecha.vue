<template>
  <v-container grid-list-md text-xs-left>
    <v-layout row wrap>
      <loading
        color="#08a742"
        :width="120"
        :height="120"
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="fullPage"
      ></loading>
      <v-flex lg12>
        <v-card>
          <v-img :src="img" aspect-ratio="4.75"></v-img>
          <v-card-text>
            <h2>Configuracion de CRM</h2>
            <br />
            <v-btn
              rounded
              color="success"
              type="submit"
              @click="agregarCamposDeal()"
              block
              dark
            >Generar Campos</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <vue-snotify></vue-snotify>
    </v-layout>
  </v-container>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { datos } from "@/camposFecha";
import { mapState, mapActions } from "vuex";
import router from "@/router";
import axios from "axios";
export default {
  name: "camposFecha",
  data() {
    return {
      img: require("@/assets/img_crm.jpg"),
      isLoading: false,
      fullPage: true
    };
  },
  methods: {
    ...mapActions(["validarToken"]),

    agregarCamposDeal() {
        const self = this;
      const campos = datos;
       this.isLoading = true; 
       this.notification("Creando Campos de fecha", "info");
      campos.forEach(function(e) {
        const params = {
          name: e.name,
          field_type: e.field_type,
          options: e.options
        };
        const options = {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          data: params,
          url: "https://api.pipedrive.com/v1/dealFields?api_token=" + self.api
        };
        axios(options)
          .then(function(res) {
            console.log("campo creado con exito" + res);
          })
          .catch(function(error) {
            console.log(error);
          });
      });
      this.isLoading = false; 
    },
     notification(mensaje, tipo) {
      this.$snotify.info(mensaje, "", {
        timeout: 3000,
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        titleMaxLength: 300,
        backdrop: 0.5
      });
    },
  },
  components: {
    Loading
  },
  created() {
    this.validarToken();
  },
  computed: {
    ...mapState(["api"])
  }
};
</script>