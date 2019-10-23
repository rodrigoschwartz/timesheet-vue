<template>
  <v-container fluid>
    <v-row justify="left">
      <v-col cols="10">
        <material-card color="blue" title="Horas" text>
          <v-data-table :headers="headers" :items="hours" :search="search" hide-default-footer />
        </material-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="blue" fab v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Apontamento de Horas</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="hour" label="Horas*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select v-model="project" :items="this.projects" label="Projeto*"></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveData">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    saveData() {
      axios
        .post("http://127.0.0.1:8000/hours/create/", {
          hours: this.hour,
          project: this.project
        })
        .then(response => {
          alert("Inserido com sucesso!")
          this.dialog = false
          this.getData();
        })
        .catch(e => {
          console.error(e);
          alert("Erro ao Inserir!")
        });
    },
    getData: function() {
      axios.get("http://127.0.0.1:8000/hours/").then(response => {
        this.hours = response.data;
      });

      axios.get("http://127.0.0.1:8000/projects/").then(response => {
        this.projects = response.data.map(item => {
          return { value: item.id, text: item.demandCode };
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
  created: function() {
    this.getData();
  },

  data() {
    return {
      dialog: false,
      projects: [],
      search: "",
      hour: 0,
      project: 0,
      hours: [],
      headers: [
        //  { sortable: true, text: "Id", value: "id" },
        { sortable: true, text: "Projetos", value: "project.demandCode" },
        { sortable: true, text: "Descrição", value: "project.description" },
        { sortable: false, text: "Horas", value: "hours" },
        { sortable: false, text: "Data", value: "created_at" },
        { sortable: false, text: "Responsável", value: "user.username" }
      ]
    };
  }
};
</script>