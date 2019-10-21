<template>
  <v-container fluid>
    <v-row justify="left">
      <v-col cols="10">
        <material-card color="orange" title="Projetos" text>
          <v-data-table :headers="header" :items="projects" :search="search" hide-default-footer />
        </material-card>
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