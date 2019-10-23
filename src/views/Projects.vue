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
        <v-btn color="orange" fab v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Projeto</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="demand" label="Demanda*" required></v-text-field>
              </v-col>
              <v-col cols="30" sm="10" md="8">
                <v-text-field v-model="description" label="Descrição*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="value" label="Orçamento*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="hour" label="Horas Disponíveis*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select v-model="status_field" :items="this.status" label="Status*"></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select v-model="user_field" :items="this.users" label="Responsável*"></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="orange darken-1" text @click="saveData">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="delete_dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="orange" fab v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Eliminar Projeto</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select v-model="project_field" :items="this.projetos" label="Projetos*"></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="delete_dialog = false">Close</v-btn>
          <v-btn color="orange darken-1" text @click="deleteData">Delete</v-btn>
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
    deleteData() {
      axios
        .delete("http://127.0.0.1:8000/projects/delete/", {
          project: this.project_field
        })
        .then(response => {
          alert("Eliminado com sucesso!");
          console.log(response)
          this.dialog = false;
          this.getData();
        })
        .catch(e => {
          console.error(e);
          alert("Erro ao Eliminar!");
        });
    },
    saveData() {
      axios
        .post("http://127.0.0.1:8000/projects/create/", {
          demandCode: this.demand,
          description: this.description,
          user: this.user_field,
          value: this.value,
          hoursAp: this.hour,
          status: this.status_field
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
      axios.get("http://127.0.0.1:8000/projects/user/").then(response => {
        this.projects = response.data;
      });

      axios.get("http://127.0.0.1:8000/users/").then(response => {
        this.users = response.data.map(item => {
          return { value: item.id, text: item.username };
        });
      });

      axios.get("http://127.0.0.1:8000/projects/user/").then(response => {
        this.projetos = response.data.map(item => {
          return { value: item.id, text: item.demandCode };
        });
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
      delete_dialog: false,
      dialog: false,
      search: "",
      user_field: 0,
      hour: 0,
      status_field: "",
      demand: 0,
      description: "",
      value: 0,
      users: [],
      project_field: 0,
      projects: [],
      projetos: [],
      status: [
        { value: 1, text: "Planning" },
        { value: 2, text: "Execution" },
        { value: 3, text: "Tests" },
        { value: 4, text: "Go Live" },
        { value: 5, text: "Finished" }
      ],
      header: [
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