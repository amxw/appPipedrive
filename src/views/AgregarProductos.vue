<template>
  <v-layout row wrap>
    <v-flex lg8 offset-lg2>
      <v-card>
        <v-card-text>
          <h3>Agregar producto</h3>
          <form @submit.prevent="agregarProducto(datos)">
            <v-text-field v-model="datos.codigo" label="codigo"></v-text-field>
            <v-text-field v-model="datos.nombre" label="Nombre"></v-text-field>
            <v-select
              v-on:change="getTipo(datos.categoria_producto)"
              :items="items"
              item-value="id"
              item-text="titulo"
              v-model="datos.categoria_producto"
              label="Categoria de producto"
            ></v-select>
            <v-select
              :items="tipoItems"
              item-value="id"
              item-text="titulo"
              v-model="datos.tipo_producto"
              label="Tipo de producto"
            ></v-select>
            <v-text-field v-model="datos.precio" label="Precio"></v-text-field>
            <input type="file" ref="boton" class="d-none" @change="buscarImagen($event)" />
            <v-btn color="primary" @click="$refs.boton.click()">Buscar imagen</v-btn>
            <v-card-text v-if="file">
              <h4>{{file.name}}</h4>
              <v-img :src="urlTemporal"></v-img>
            </v-card-text>

            <v-btn rounded color="success" type="submit" block dark>Agregar</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { firebase, storage, db } from "@/firebase";
export default {
  name: "AgregarProducto",
  data() {
    return {
      datos: {
        codigo: "",
        nombre: "",
        categoria_producto: "",
        tipo_producto: "",
        precio: ""
      },
      items: [],
      tipoItems: [],
      file: null,
      urlTemporal: "",
      loading: false,
      error: null
    };
  },
  created() {
    /*generacion de campos Categoria de productos*/
    db.collection("producto")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let producto = doc.data();
          const data = {
            titulo: doc.data().titulo,
            id: doc.id
          };
          this.items.push(data);
        });
      });
    /**tipo de productos */
  },
  methods: {
    agregarProducto(datos) {
      var metadata = {
        contentType: "image/jpeg"
      };
      const imagen = this.file;

      db.collection("producto")
        .doc(datos.categoria_producto)
        .collection("tipo")
        .doc(datos.tipo_producto)
        .collection("producto")
        .add({
          codigo: datos.codigo,
          nombre: datos.nombre,
          precio: datos.precio
        })
        .then(function(docRef) {
          const refImagen = storage
            .ref()
            .child("producto")
            .child(datos.categoria_producto)
            .child("tipo")
            .child(datos.tipo_producto)
            .child(docRef.id)
            .child("foto-producto");

          refImagen.put(imagen, metadata);
          const urlDescarga =  refImagen.getDownloadURL();

          var ref = db
            .collection("producto")
            .doc(datos.categoria_producto)
            .collection("tipo")
            .doc(datos.tipo_producto)
            .collection("producto")
            .doc(docRef.id);
          ref
            .update({
              foto: urlDescarga
            })
            .then(function() {
              console.log("Document successfully updated!");
            })
            .catch(function(error) {
              console.error("Error updating document: ", error);
            });
        });
    },
    getTipo(id) {
      this.tipoItems = [];
      db.collection("producto")
        .doc(id)
        .collection("tipo")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let tipo = doc.data();
            var tipoProducto = {
              id: doc.id,
              titulo: doc.data().titulo
            };
            this.tipoItems.push(tipoProducto);
          });
        });
    },
    buscarImagen(event) {
      const tipoArchivo = event.target.files[0].type;

      if (tipoArchivo === "image/jpeg" || tipoArchivo === "image/png") {
        this.file = event.target.files[0];
        this.error = null;
      } else {
        this.error = "Archivo no válido";
        this.file = null;
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = e => {
        // console.log(e.target.result);
        this.urlTemporal = e.target.result;
      };
      console.log(this.file);
    }
  }
};
</script>