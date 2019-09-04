<template>
  <v-app>
    <Navbar v-if="usuario != '' "></Navbar>
    <notifications position="top center" class="notificacion" width="400px" group="foo" />
    <v-content>
      <v-container>
        <v-chip v-if="api" class="tope">
          <v-icon left color="blue">fab fa-slack-hash</v-icon>
          {{api}}
        </v-chip>
        <br />
        <br />
        <router-view />
      </v-container>
    </v-content>
   <v-footer
    height="auto"
    color="conversion"
  >
    <v-layout
      justify-center
      row
      wrap
    >
      <v-flex
        conversion
       
        py-3
        text-xs-center
        white--text
        xs12
      >
       <div>&copy; {{ new Date().getFullYear() }} CONVERSION todos los derechos reservados</div>
      </v-flex>
    </v-layout>
  </v-footer>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapState } from "vuex";

export default {
  components: { Navbar },
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState(["usuario", "api"])
  }
};
</script>
