<template>
  <nav>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="{name:'home'}">
          <img src="@/assets/pipedrive.png" height="35" alt />
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="cerrarSesion">
        <span class="mr-2">Cerrar sesión</span>
        <v-icon>fas fa-sign-out-alt</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer class="navbar" v-model="drawer" app>
      <v-layout column align-center mt-5>
        <v-flex>
          <v-avatar>
            <img :src="usuario.foto" alt="avatar" />
          </v-avatar>
        </v-flex>
        <v-flex>
          <h2 class="mt-3 white--text">{{usuario.nombre}}</h2>
          <br />
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <v-list>
        <v-list-tile v-for="(item, index) in items" :key="index" :to="item.to">
          <v-list-tile-action>
            <v-icon class="white--text">{{item.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          title: "Configurar CRM",
          icon: "fas fa-chart-line",
          to: { name: "agregarPipeline" }
        },
        {
          title: "Agregar API",
          icon: "fab fa-slack-hash",
          to: { name: "agregarApi" }
        },
        { title: "Admin", icon: "fas fa-address-card", to: { name: "admin" } },
        
      ]
    };
  },
  methods: {
    ...mapActions(["cerrarSesion"])
  },
  computed: {
    ...mapState(["usuario"])
  }
};
</script>
