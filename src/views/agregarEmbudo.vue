<template>
  <v-layout row wrap>
    <loading
      color="#08a742"
      :width="120"
      :height="120"
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
    <v-flex lg8 offset-lg2>
      <v-card>
        <v-card-text>
          <h2>Configuracion de CRM</h2>
          <br />
          <form @submit.prevent="agregarPipeline(nombre,tipoEmbudo)">
            <v-text-field v-model="nombre" label="Nombre de Embudo"></v-text-field>
            <v-select
              :items="items"
              item-value="id"
              item-text="nombre"
              v-model="tipoEmbudo"
              label="Tipo de Embudo"
            ></v-select>
            <v-btn rounded color="success" type="submit" block dark>Agregar</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { datos1, datos2, datos3, datos4 } from "@/camposDeal";
import { datoPersona1, datoPersona2, datoPersona3 } from "@/camposPerson";
import { mapState, mapActions } from "vuex";
import router from "@/router";
import axios from "axios";
export default {
  name: "agregarPipeline",
  data() {
    return {
      isLoading: false,
      fullPage: true,
      nombre: "",
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
      ]
    };
  },
  components: {
    Loading
  },

  methods: {
    onCancel() {
      const self = this;
      console.log("User cancelled the loader.");
      this.isLoading = false;

      self.$notify({
        group: "foo",
        title: "CRM Armado con exito",
        type: "success"
      });
    },

    ...mapActions(["validarToken"]),

    //funcion para agregar embudo
    agregarPipeline(nombre, tipoEmbudo) {
      //agregar embudo
      const self = this;
      const params = {
        name: this.nombre,
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
          self.agregarStage(idPIpe, self.api);
          //activar funcion de agregar campos
         // self.agregarCamposDeal(self.api);
          //activar funcion para campos persona
         // self.agregarCamposPersona(self.api);
        })
        .catch(function(error) {
          console.log(error);
            alert("Error la clave api no pudo conectarse con los servicios de pipedrive. porfavor introdusca una clave api correcta");
        });
    },
    //creacion de stage para el embudo creado

    agregarStage(id, api) {
      const valores1 = [
        {
          name: "Interesado",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 3,
          order_nr: 1
        }
      ];
      const valores2 = [
        {
          name: "Contactado",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 3,
          order_nr: 2
        }
      ];
      const valores3 = [
        {
          name: "Cita agendada",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 5,
          order_nr: 3
        }
      ];
      const valores4 = [
        {
          name: "Visitado",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 15,
          order_nr: 4
        }
      ];
      const valores5 = [
        {
          name: "Negociación",
          pipeline_id: id,
          active_flag: true,
          deal_probability: 1,
          rotten_flag: true,
          rotten_days: 7,
          order_nr: 5
        }
      ];
      const valores6 = [
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
      valores1.forEach(function(e) {
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
              0: { id: res.data.data.id, name: res.data.data.name }
            };
            stageid.push(stageVar1);
          })
          .catch(function(error) {
            console.log(error);
          });
      });

      setTimeout(function() {
        valores2.forEach(function(e) {
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

              var stageVar2 = {
                1: { id: res.data.data.id, name: res.data.data.name }
              };
              stageid.push(stageVar2);
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      }, 1000);

      setTimeout(function() {
        valores3.forEach(function(e) {
          const self = this;
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

              var stageVar3 = {
                2: { id: res.data.data.id, name: res.data.data.name }
              };
              stageid.push(stageVar3);
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      }, 2000);

      setTimeout(function() {
        valores4.forEach(function(e) {
          const self = this;
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

              var stageVar4 = {
                3: { id: res.data.data.id, name: res.data.data.name }
              };
              stageid.push(stageVar4);
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      }, 3000);

      setTimeout(function() {
        valores5.forEach(function(e) {
          const self = this;
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

              var stageVar5 = {
                4: { id: res.data.data.id, name: res.data.data.name }
              };
              stageid.push(stageVar5);
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      }, 4000);

      setTimeout(function() {
        valores6.forEach(function(e) {
          const self = this;
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

              var stageVar6 = {
                5: { id: res.data.data.id, name: res.data.data.name }
              };
              stageid.push(stageVar6);

              console.log(stageid[1][1].name);
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      }, 5000);

       setTimeout(function() {
        self.agregarFiltros(api);
      }, 6000);
    },
    //Agregar campos a tratos
    agregarCamposDeal(api) {
      const campos1 = datos1;
      const campos2 = datos2;
      const campos3 = datos3;
      const campos4 = datos4;

      setTimeout(function() {
        campos1.forEach(function(e) {
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
            url: "https://api.pipedrive.com/v1/dealFields?api_token=" + api
          };
          axios(options)
            .then(function(res) {
              console.log("campo creado con exito" + res);
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      }, 3000);

      setTimeout(function() {
        campos2.forEach(function(e) {
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
            url: "https://api.pipedrive.com/v1/dealFields?api_token=" + api
          };
          axios(options)
            .then(function(res) {
              console.log("campo creado con exito" + res);
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      }, 6000);

      setTimeout(function() {
        campos3.forEach(function(e) {
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
            url: "https://api.pipedrive.com/v1/dealFields?api_token=" + api
          };
          axios(options)
            .then(function(res) {
              console.log("campo creado con exito" + res);
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      }, 9000);

      setTimeout(function() {
        campos4.forEach(function(e) {
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
            url: "https://api.pipedrive.com/v1/dealFields?api_token=" + api
          };
          axios(options)
            .then(function(res) {
              console.log("campo creado con exito" + res);
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      }, 12000);
    },
    //agregar campos a persona
    agregarCamposPersona(api) {
      const persona1 = datoPersona1;
      const persona2 = datoPersona2;
      const persona3 = datoPersona3;
      const self = this;

      setTimeout(function() {
        persona1.forEach(function(e) {
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
        });
      }, 15000);

      setTimeout(function() {
        persona2.forEach(function(e) {
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
        });
      }, 18000);

      setTimeout(function() {
        persona3.forEach(function(e) {
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
        });

        self.onCancel();
      }, 21000);
    },
    agregarFiltros(api) {
      const estadoid = this.idstage;
      const filtros = [
        {
          name: "Atrasado Interesado",
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[0][0].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12464",
                    operator: "<",
                    value: "1_week_ago",
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12463",
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
          name: "Atrasado Cita Establecida",
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[2][2].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "entered_stage",
                    operator: "<",
                    value: "1_week_ago",
                    extra_value: estadoid[2][2].id
                  },
                  {
                    object: "deal",
                    field_id: "12463",
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
          name: "Atrasado Contactado sin 5 Seguimientos",
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[1][1].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "entered_stage",
                    operator: "<",
                    value: "1_week_ago",
                    extra_value: estadoid[1][1].id
                  },
                  {
                    object: "deal",
                    field_id: "12463",
                    operator: "=",
                    value: "open",
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12478",
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
          name: "Atrasado Contactado",
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[1][1].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "entered_stage",
                    operator: "<",
                    value: "1_week_ago",
                    extra_value: estadoid[1][1].id
                  },
                  {
                    object: "deal",
                    field_id: "12463",
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
          name: "Atrasado Interesado Sin 4 Llamadas",
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[0][0].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12464",
                    operator: "<",
                    value: "1_week_ago",
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12463",
                    operator: "=",
                    value: "open",
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12478",
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
          name: "Atrasado Negociación",
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[4][4].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "entered_stage",
                    operator: "<",
                    value: "1_week_ago",
                    extra_value: estadoid[4][4].id
                  },
                  {
                    object: "deal",
                    field_id: "12463",
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
          name: "Atrasado Reserva",
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[5][5].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "entered_stage",
                    operator: "<",
                    value: "1_week_ago",
                    extra_value: estadoid[5][5].id
                  },
                  {
                    object: "deal",
                    field_id: "12463",
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
          name: "Atrasado Visitado",
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[3][3].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "entered_stage",
                    operator: "<",
                    value: "2_weeks_ago",
                    extra_value: estadoid[3][3].id
                  },
                  {
                    object: "deal",
                    field_id: "12463",
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
          name: "Perdido no contesta Seguimiento sin 5 Seguimientos",
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: "12474",
                    operator: "=",
                    value: "No Responde seguimiento",
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12478",
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
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[0][0].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[1][1].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[2][2].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[3][3].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[4][4].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[5][5].id,
                    extra_value: null
                  }
                ]
              }
            ]
          },
          type: "deals"
        },
        {
          name: "Perdido No contesta sin 4 seguimientos",
          conditions: {
            glue: "and",
            conditions: [
              {
                glue: "and",
                conditions: [
                  {
                    object: "deal",
                    field_id: "12474",
                    operator: "=",
                    value: "No Contesta",
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12478",
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
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[0][0].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[1][1].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[2][2].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[3][3].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[4][4].id,
                    extra_value: null
                  },
                  {
                    object: "deal",
                    field_id: "12462",
                    operator: "=",
                    value: estadoid[5][5].id,
                    extra_value: null
                  }
                ]
              }
            ]
          },
          type: "deals"
        }
      ];
      filtros.forEach(function(e) {
        const self = this;
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