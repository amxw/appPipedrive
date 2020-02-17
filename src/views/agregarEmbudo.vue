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
            <form @submit.prevent="getDealFields(nombre)">
              <v-text-field
                v-model="nombre"
                label="Nombre de Embudo (Nombre del Proyecto)"
                required
              ></v-text-field>
              <v-btn rounded color="success" type="submit" block dark>Agregar</v-btn>
            </form>
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
import { datos1 } from "@/camposDeal";
import { datoPersona1 } from "@/camposPerson";
import { mapState, mapActions } from "vuex";
import router from "@/router";
import axios from "axios";
export default {
  name: "agregarPipeline",
  data() {
    return {
      img: require("@/assets/img_crm.jpg"),
      isLoading: false,
      fullPage: true,
      nombre: "",
      etapaStage: "",
      tratoCreado: "",
      estadofield: "",
      AccionesCompletadasField: "",
      motivoPerdidaField: "",
      idstage: [],
      tipoEmbudo: "",
      idPipeline: "",
      items: [
        {
          id: 1,
          nombre: "Ventas"
        },
        {
          id: 2,
          nombre: "Especial"
        }
      ],
      datosPipeline: []
    };
  },
  components: {
    Loading
  },

  methods: {
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
    onCancel() {
      const self = this;
      this.isLoading = false;
      self.idstage = [];
      self.$snotify.success("CRM creado con exito", "¡¡Felicitaciones!!", {
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
    },
    onCancelProyecto() {
      const self = this;
      this.isLoading = false;
      self.idstage = [];
      self.$snotify.success("Embudo creado con exito", "¡¡Felicitaciones!!", {
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
    },
    onCancelEmbudo() {
      const self = this;
      this.isLoading = false;
      self.idstage = [];
      self.etapaStage = "";
      self.tratoCreado = "";
      self.estadofield = "";
      self.$snotify.success("Embudo creado con exito", "¡¡Felicitaciones!!", {
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
    },

    ...mapActions(["validarToken"]),

    //funcion para validar si ya esta creado el crm
    getDealFields(nombre) {
      const self = this;
      const arrayCampos = [];
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/json"
        },
        url:
          "https://api.pipedrive.com/v1/dealFields?start=0&api_token=" +
          this.api
      };

      axios(options).then(function(res) {
        arrayCampos.push(res.data.data);
        let dato = res.data.data;
        var datosarray = arrayCampos[0];

        function esDato(dato) {
          return dato.name === "Campaña";
        }

        var etapaStage = datosarray.length;
        let campocreado = datosarray.find(esDato);

        //etapaStage === 32
        if (!campocreado) {
          console.log("no se a creado crm");
          setTimeout(function() {
            self.obteneridStage(self.api);
          }, 5000);
          self.agregarPipelineProspeccion();
          self.agregarEmbudoAdmistracionVenta();
          //activar funcion de creacion de embudo
          setTimeout(function() {
            self.agregarPipeline(nombre);
          }, 3000);

          //activar funcion de agregar campos
          self.agregarCamposDeal(self.api);
          //activar funcion para campos persona
          self.agregarCamposPersona(self.api);
        } else {
          self.obteneridStage(self.api);
          self.agregarPipeline(nombre);
          setTimeout(function() {
            self.onCancelProyecto();
          }, 5000);
        }

        self.nombre = "";
      });
    },
    obteneridStage(api) {
      const self = this;
      const optionsData = {
        method: "GET",
        headers: {
          Accept: "application/json"
        },
        data: "",
        url: "https://api.pipedrive.com/v1/dealFields?start=0&api_token=" + api
      };

      axios(optionsData)
        .then(function(res) {
          const dato = res.data.data;

          function StageId(dato) {
            return dato.key === "stage_id";
          }
          function getTradoId(dato) {
            return dato.key === "add_time";
          }
          function getEstadoId(dato) {
            return dato.key === "status";
          }
          function getAccionesId(dato) {
            return dato.key === "done_activities_count";
          }
          function getMotivoPerdida(dato) {
            return dato.key === "lost_reason";
          }

          const StageRes = dato.find(StageId);
          const tratoRes = dato.find(getTradoId);
          const EstadoRes = dato.find(getEstadoId);
          const AccionesRes = dato.find(getAccionesId);
          const motivoPerdidaRes = dato.find(getMotivoPerdida);

          self.etapaStage = StageRes.id;
          self.tratoCreado = tratoRes.id;
          self.estadofield = EstadoRes.id;
          self.AccionesCompletadasField = AccionesRes.id;
          self.motivoPerdidaField = motivoPerdidaRes.id;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //funcion para agregar embudo
    agregarPipeline(nombre) {
      //agregar embudo
      const self = this;
      self.notification("Creando Embudo " + nombre, "info");
      const params = {
        name: nombre,
        order_nr: "0",
        deal_probability: "1",
        active: "1"
      };
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        data: params,
        url: "https://api.pipedrive.com/v1/pipelines?api_token=" + this.api
      };
      axios(options)
        .then(function(res) {
          self.isLoading = true;
          const idPIpe = res.data.data.id;
          const namePime = res.data.data.name;

          self.agregarStage(idPIpe, self.api, namePime);
        })
        .catch(function(error) {
          console.log(error);
          alert(
            "Error la clave api no pudo conectarse con los servicios de pipedrive. porfavor introdusca una clave api correcta"
          );
        });
    },
    //creacion de stage para el embudo creado

    agregarStage(id, api, nombre) {
      const valores = [
        {
          name: "Interesado",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 3,
          order_nr: 1
        },
        {
          name: "Contactado",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 3,
          order_nr: 2
        },
        {
          name: "Cita agendada",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 5,
          order_nr: 3
        },
        {
          name: "Visitado",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 15,
          order_nr: 4
        },
        {
          name: "Negociación",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 7,
          order_nr: 5
        },
        {
          name: "Reserva",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 3,
          order_nr: 6
        }
      ];
      const self = this;
      const stageid = this.idstage;

      valores.forEach(function(e, index, collection) {
        setTimeout(function() {
          const params = {
            name: e.name,
            pipeline_id: e.pipeline_id,
            active_flag: e.active_flag,
            deal_probability: e.deal_probability,
            rotten_flag: e.rotten_flag,
            rotten_days: e.rotten_days,
            order_nr: e.order_nr
          };
          const options = {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            data: params,
            url: "https://api.pipedrive.com/v1/stages?api_token=" + api
          };
          axios(options)
            .then(function(res) {
              //this.idPipeline = res.data.data.id;
              console.log("stage creado con exito " + res.data.data.name);

              var stageVar1 = {
                id: res.data.data.id,
                name: res.data.data.name
              };
              stageid.push(stageVar1);
            })
            .catch(function(error) {
              console.log(error);
            });
        }, index * 500);
      });

      const numeroPipeline = Promise.resolve(self.getPipielines(api));
      numeroPipeline.then(function(value) {
        console.log(value);
        var cont = parseInt(value) - parseInt(3);
        setTimeout(function() {
          self.agregarFiltros(api, nombre, cont);
        }, 3000);
      });
    },
    //axios para encotrar pipelnes

    getPipielines(api) {
      const self = this;
      const arrayCampos = [];
      const pipelines = 0;

      let configuracion = {
        method: "GET",
        headers: {
          Accept: "application/json"
        },
        url: "https://api.pipedrive.com/v1/pipelines?api_token=" + api
      };

      const pipeline = axios(configuracion)
        .then(function(res) {
          arrayCampos.push(res.data.data);
          var datosarray = arrayCampos[0];
          return datosarray.length;
        })
        .catch(function(error) {
          console.log(error);
        });

      return pipeline;
    },
    //pipeline Propeccion
    agregarPipelineProspeccion() {
      //agregar embudo
      const self = this;
      const params = {
        name: "prospeccion",
        order_nr: "0",
        deal_probability: "1",
        active: "1"
      };
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        data: params,
        url: "https://api.pipedrive.com/v1/pipelines?api_token=" + this.api
      };
      axios(options)
        .then(function(res) {
          const idPIpe = res.data.data.id;
          self.agregarStageProspeccion(idPIpe, self.api);
          self.notification("Creando Embudo Prospeccion", "info");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //stage Prospeccion
    agregarStageProspeccion(id, api) {
      const valores = [
        {
          name: "Interesado",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 3,
          order_nr: 1
        },
        {
          name: "No respondió",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 3,
          order_nr: 2
        },
        {
          name: "Si respondió",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 5,
          order_nr: 3
        }
      ];

      const self = this;
      const stageid = this.idstage;
      valores.forEach(function(e, index, collection) {
        setTimeout(function() {
          const params = {
            name: e.name,
            pipeline_id: e.pipeline_id,
            active_flag: e.active_flag,
            deal_probability: e.deal_probability,
            rotten_flag: e.rotten_flag,
            rotten_days: e.rotten_days,
            order_nr: e.order_nr
          };
          const options = {
            method: "POST",
            headers: {
              Accept: "application/json"
            },
            data: params,
            url: "https://api.pipedrive.com/v1/stages?api_token=" + api
          };
          axios(options)
            .then(function(res) {
              //this.idPipeline = res.data.data.id;
              console.log("stage creado con exito " + res.data.data.name);
              var idstage = res.data.data.id;
              var idOrdden = e.order_nr;
              var api = self.api;
            })
            .catch(function(error) {
              console.log(error);
            });
        }, index * 500);
      });
    },
    //pipeline de administracion ventas
    agregarEmbudoAdmistracionVenta() {
      const self = this;

      const params = {
        name: "Administracion de Venta",
        order_nr: "0",
        deal_probability: "1",
        active: "1"
      };
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        data: params,
        url: "https://api.pipedrive.com/v1/pipelines?api_token=" + this.api
      };

      axios(options)
        .then(function(res) {
          const idAdVeta = res.data.data.id;
          const api = self.api;
          console.log("Embudo creado con exito" + idAdVeta);
          self.agregarStageAdVentas(idAdVeta, api);
          self.notification("Creando Embudo Administracion de ventas", "info");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //stage administracion de ventas
    agregarStageAdVentas(id, api) {
      const valores = [
        {
          name: "Interesado",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 3,
          order_nr: 1
        },
        {
          name: "Proceso de Credito",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 3,
          order_nr: 2
        },
        {
          name: "Listo para Escriturar",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 5,
          order_nr: 3
        },
        {
          name: "Listo para Entregar",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 5,
          order_nr: 4
        }
      ];

      const self = this;
      valores.forEach(function(e, index, collection) {
        setTimeout(function() {
          const params = {
            name: e.name,
            pipeline_id: e.pipeline_id,
            active_flag: e.active_flag,
            deal_probability: e.deal_probability,
            rotten_flag: e.rotten_flag,
            rotten_days: e.rotten_days,
            order_nr: e.order_nr
          };
          const options = {
            method: "POST",
            headers: {
              Accept: "application/json"
            },
            data: params,
            url: "https://api.pipedrive.com/v1/stages?api_token=" + api
          };
          self.axioStage(options, e.order_nr);
        }, index * 500);
      });
    },
    //funccion axios para mandar data
    axioStage(options, orden) {
      const self = this;
      axios(options)
        .then(function(res) {
          //this.idPipeline = res.data.data.id;
          console.log("stage creado con exito " + res.data.data.name);
          var idstage = res.data.data.id;
          var idOrdden = orden;
          var api = self.api;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //Agregar campos a tratos
    agregarCamposDeal(api) {
      let campos1 = datos1;
      const self = this;
      campos1.forEach(function(e, index, collection) {
        setTimeout(function() {
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
            url: "https://api.pipedrive.com/v1/dealFields?api_token=" + api
          };
          axios(options)
            .then(function(res) {
              console.log("campo creado con exito" + res);
            })
            .catch(function(error) {
              console.log(error);
            });
        }, index * 1000);
      });
      setTimeout(function() {
        self.onCancelProyecto();
      }, 35000);
    },
    //agregar campos a persona
    agregarCamposPersona(api) {
      const persona1 = datoPersona1;

      const self = this;
      self.notification("Creando Campos personalizados de Personas", "info");
      persona1.forEach(function(e, index, collection) {
        setTimeout(function() {
          const self = this;
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
            url: "https://api.pipedrive.com/v1/personFields?api_token=" + api
          };
          axios(options)
            .then(function(res) {
              console.log("campo creado con exito" + res);
            })
            .catch(function(error) {
              console.log(error);
            });
        }, index * 1000);
      });
    },
    //agregar embudos
    agregarFiltros(api, nombre, contador) {
      this.notification("Creando Filtros de Embudo " + nombre, "info");
      const estadoid = this.idstage;
      const self = this;
      const filtros = [
        {
          name: contador + ".1 Atrasado Interesado " + nombre,
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[0].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.tratoCreado,
                    operator: "<",
                    value: "1_week_ago",
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.estadofield,
                    operator: "=",
                    value: "open",
                    extra_value: null
                  }
                ]
              },
              {
                glue: "or",
                conditions: []
              }
            ]
          },
          type: "deals"
        },
        {
          name: contador + ".2 Atrasado Cita Establecida " + nombre,
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[2].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "entered_stage",
                    operator: "<",
                    value: "1_week_ago",
                    extra_value: estadoid[2].id
                  },
                  {
                    object: "deal",
                    field_id: self.estadofield,
                    operator: "=",
                    value: "open",
                    extra_value: null
                  }
                ]
              },
              {
                glue: "or",
                conditions: []
              }
            ]
          },
          type: "deals"
        },
        {
          name:
            contador + ".3 Atrasado Contactado sin 5 Seguimientos " + nombre,
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[1].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "entered_stage",
                    operator: "<",
                    value: "1_week_ago",
                    extra_value: estadoid[1].id
                  },
                  {
                    object: "deal",
                    field_id: self.estadofield,
                    operator: "=",
                    value: "open",
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.AccionesCompletadasField,
                    operator: "<",
                    value: "5",
                    extra_value: null
                  }
                ]
              },
              {
                glue: "or",
                conditions: []
              }
            ]
          },
          type: "deals"
        },
        {
          name: contador + ".4 Atrasado Contactado " + nombre,
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[1].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "entered_stage",
                    operator: "<",
                    value: "1_week_ago",
                    extra_value: estadoid[1].id
                  },
                  {
                    object: "deal",
                    field_id: self.estadofield,
                    operator: "=",
                    value: "open",
                    extra_value: null
                  }
                ]
              },
              {
                glue: "or",
                conditions: []
              }
            ]
          },
          type: "deals"
        },
        {
          name: contador + ".5 Atrasado Interesado Sin 4 Llamadas " + nombre,
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[0].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.tratoCreado,
                    operator: "<",
                    value: "1_week_ago",
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.estadofield,
                    operator: "=",
                    value: "open",
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.AccionesCompletadasField,
                    operator: "<",
                    value: "4",
                    extra_value: null
                  }
                ]
              },
              {
                glue: "or",
                conditions: []
              }
            ]
          },
          type: "deals"
        },
        {
          name: contador + ".6 Atrasado Negociación " + nombre,
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[4].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "entered_stage",
                    operator: "<",
                    value: "1_week_ago",
                    extra_value: estadoid[4].id
                  },
                  {
                    object: "deal",
                    field_id: self.estadofield,
                    operator: "=",
                    value: "open",
                    extra_value: null
                  }
                ]
              },
              {
                glue: "or",
                conditions: []
              }
            ]
          },
          type: "deals"
        },
        {
          name: contador + ".7 Atrasado Reserva " + nombre,
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[5].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "entered_stage",
                    operator: "<",
                    value: "1_week_ago",
                    extra_value: estadoid[5].id
                  },
                  {
                    object: "deal",
                    field_id: self.estadofield,
                    operator: "=",
                    value: "open",
                    extra_value: null
                  }
                ]
              },
              {
                glue: "or",
                conditions: []
              }
            ]
          },
          type: "deals"
        },
        {
          name: contador + ".8 Atrasado Visitado " + nombre,
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[3].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "entered_stage",
                    operator: "<",
                    value: "2_weeks_ago",
                    extra_value: estadoid[3].id
                  },
                  {
                    object: "deal",
                    field_id: self.estadofield,
                    operator: "=",
                    value: "open",
                    extra_value: null
                  }
                ]
              },
              {
                glue: "or",
                conditions: []
              }
            ]
          },
          type: "deals"
        },
        {
          name:
            contador +
            ".9 Perdido no contesta Seguimiento sin 5 Seguimientos " +
            nombre,
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: self.motivoPerdidaField,
                    operator: "=",
                    value: "No Responde seguimiento",
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.AccionesCompletadasField,
                    operator: "<",
                    value: "5",
                    extra_value: null
                  }
                ]
              },
              {
                glue: "or",
                conditions: [
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[0].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[1].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[2].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[3].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[4].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[5].id,
                    extra_value: null
                  }
                ]
              }
            ]
          },
          type: "deals"
        },
        {
          name:
            contador + ".10 Perdido No contesta sin 4 seguimientos " + nombre,
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: self.motivoPerdidaField,
                    operator: "=",
                    value: "No Contesta",
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.AccionesCompletadasField,
                    operator: "<",
                    value: "4",
                    extra_value: null
                  }
                ]
              },
              {
                glue: "or",
                conditions: [
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[0].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[1].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[2].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[3].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[4].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: self.etapaStage,
                    operator: "=",
                    value: estadoid[5].id,
                    extra_value: null
                  }
                ]
              }
            ]
          },
          type: "deals"
        }
      ];
      filtros.forEach(function(e, index, collection) {
        setTimeout(function() {
          const params = e;
          const options = {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            data: params,
            url: "https://api.pipedrive.com/v1/filters?api_token=" + api
          };
          axios(options)
            .then(function(res) {
              console.log("Filtro Creado con exito" + res);
            })
            .catch(function(error) {
              console.log(error);
            });
        }, index * 300);
      });
    }
  },

  created() {
    this.validarToken();
  },
  computed: {
    ...mapState(["api"])
  }
};
</script>