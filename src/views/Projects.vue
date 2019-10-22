<template>
  <v-container fluid>
    <v-row justify="left">
      <v-col cols="10">
        <material-card color="orange" title="Projetos" text>
          <v-data-table :headers="header" :items="projects" :search="search" hide-default-footer />
        </material-card>
      </v-col>
    </v-row>
        <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="orange" fab v-on="on"><v-icon>mdi-plus</v-icon></v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Projeto</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Horas*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete :items="this.projects" label="Projeto*"></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="orange darken-1" text @click="dialog = false">Save</v-btn>
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
    getData: function() {
      axios.get("http://127.0.0.1:8000/projects/user/").then(response => {
        this.projects = response.data;
      });
    },

    complete(index) {
      this.list[index] = !this.list[index];
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
      search: "",
      projects: [],
      header: [
        //  { sortable: true, text: "Id", value: "id" },
        { sortable: true, text: "Código", value: "demandCode" },
        { sortable: false, text: "Descrição", value: "description" },
        { sortable: false, text: "Status", value: "status" },
        { sortable: false, text: "Gastos", value: "value", align: "right" },
        { sortable: false, text: "Horas", value: "hoursAp", align: "right" },
        { sortable: false, text: "Responsável", value: "user.username" }
      ]
    };
  }
};
</script>