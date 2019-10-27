<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="10">
        <material-card color="green" title="Gastos" text>
          <v-data-table :headers="headers" :items="values" :search="search" hide-default-footer />
        </material-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="1">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="green" fab v-on="on">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Apontamento de Gastos</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="value" label="Gastos *" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select v-model="project" :items="this.projects" label="Projeto *"></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="green darken-1" text @click="saveData">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="1">
        <v-dialog v-model="delete_dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn fab color="green" v-on="on">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Eliminar Gastos</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select v-model="value_delete" :items="this.valores" label="Id *"></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="delete_dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  mounted() {
    this.checkLoggedIn();
    this.checkAuth();
    this.getData();
  },

  methods: {
    deleteData() {
      axios
        .delete("http://127.0.0.1:8000/values/delete/", {
          data: { id: this.value_delete }
        })
        .then(response => {
          alert("Eliminado com sucesso!");
          this.getData();
        })
        .catch(e => {
          console.error(e);
          alert("Erro ao Eliminar!");
        });

      this.delete_dialog = false;
    },
    saveData() {
      axios
        .post("http://127.0.0.1:8000/values/create/", {
          value: this.value,
          project: this.project
        })
        .then(response => {
          alert("Inserido com sucesso!");
          this.dialog = false;
          this.getData();
        })
        .catch(e => {
          console.error(e);
          alert("Erro ao Inserir!");
        });
    },
    getData: function() {
      axios.get("http://127.0.0.1:8000/values/").then(response => {
        this.values = response.data;
      });
      axios.get("http://127.0.0.1:8000/projects/user/").then(response => {
        this.projects = response.data.map(item => {
          return { value: item.id, text: item.demandCode };
        });
      });
      axios.get("http://127.0.0.1:8000/values/").then(response => {
        this.valores = response.data.map(item => {
          return { value: item.id, text: item.id };
        });
      });
    },
    checkLoggedIn: function() {
      this.$session.start();
      if (!this.$session.has("token")) {
        router.push("/auth");
      }
    },
    checkAuth: function() {
      axios.interceptors.request.use(config => {
        let token = this.$session.get("token");
        if (token) {
          config.headers["Authorization"] = `Token ${token}`;
        }
        return config;
      });
    }
  },
  data() {
    return {
      dialog: false,
      delete_dialog: false,
      search: "",
      value: 0,
      project: 0,
      projects: [],
      value_delete: 0,
      values: [],
      valores: [],
      headers: [
        { sortable: true, text: "Id", value: "id" },
        { sortable: true, text: "Projeto", value: "project.demandCode" },
        { sortable: true, text: "Descrição", value: "project.description" },
        { sortable: false, text: "Gastos", value: "value" },
        { sortable: false, text: "Data", value: "created_at" },
        { sortable: false, text: "Responsável", value: "user.username" }
      ]
    };
  }
};
</script>

