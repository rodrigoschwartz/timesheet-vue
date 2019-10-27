<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <material-card color="orange" title="Projetos" text>
          <v-data-table :headers="header" :items="projects" :search="search" hide-default-footer />
        </material-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="1">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn fab color="orange" v-on="on">
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
                    <v-text-field v-model="demand_create" label="Demanda*" required></v-text-field>
                  </v-col>
                  <v-col cols="30" sm="10" md="8">
                    <v-text-field v-model="description_create" label="Descrição*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="value_create" label="Orçamento*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="hour_create" label="Horas Disponíveis*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select v-model="status_create" :items="this.status" label="Status*"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select v-model="user_create" :items="this.users" label="Responsável*"></v-select>
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
      </v-col>
      <v-col cols="1">
        <v-dialog v-model="update_dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn fab color="orange" v-on="on">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Atualizar Projeto</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-select v-model="project_update" :items="this.projetos" label="Projetos*"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select v-model="status_update" :items="this.status" label="Status*"></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="update_dialog = false">Close</v-btn>
              <v-btn color="orange darken-1" text @click="updateData">Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col cols="1">
        <v-dialog v-model="delete_dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn fab color="orange" v-on="on">
              <v-icon>mdi-delete</v-icon>
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
                    <v-select v-model="project_delete" :items="this.projetos" label="Projetos*"></v-select>
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
      console.log(this.project_delete);
      axios
        .delete("http://127.0.0.1:8000/projects/delete/", {
          data: { id: this.project_delete }
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
    updateData() {
      axios
        .put("http://127.0.0.1:8000/projects/" + this.project_update + "/", {
          status: this.status_update
        })
        .then(response => {
          this.getData();
          alert("Atualizado com sucesso!");
        })
        .catch(e => {
          console.error(e);
          alert("Erro ao atualizar!");
        });
      this.update_dialog = false;
    },
    saveData() {
      axios
        .post("http://127.0.0.1:8000/projects/create/", {
          demandCode: this.demand_create,
          description: this.description_create,
          user: this.user_create,
          value: this.value_create,
          hoursAp: this.hour_create,
          status: this.status_create
        })
        .then(response => {
          this.getData();
          alert("Inserido com sucesso!");
        })
        .catch(e => {
          console.error(e);
          alert("Erro ao Inserir!");
        });
      this.dialog = false;
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
      update_dialog: false,
      dialog: false,
      search: "",
      user_create: 0,
      hour_create: 0,
      status_create: "",
      demand_create: 0,
      description_create: "",
      value_create: 0,
      project_create: 0,
      project_update: 0,
      status_update: "",
      project_delete: 0,
      users: [],
      projects: [],
      projetos: [],
      status: [
        { value: 1, text: "Planejamento" },
        { value: 2, text: "Execução" },
        { value: 3, text: "Testes" },
        { value: 4, text: "Go Live" },
        { value: 5, text: "Concluído" }
      ],
      header: [
        //{ sortable: true, text: "Id", value: "id" },
        { sortable: true, text: "Código", value: "demandCode" },
        { sortable: false, text: "Descrição", value: "description" },
        { sortable: false, text: "Status", value: "status" },
        {
          sortable: false,
          text: "Gastos Totais",
          value: "value",
          align: "right"
        },
        {
          sortable: false,
          text: "Gastos Apont.",
          value: "valuesApont.value__sum",
          align: "right"
        },
        {
          sortable: false,
          text: "Horas Totais",
          value: "hoursAp",
          align: "right"
        },
        {
          sortable: false,
          text: "Horas Apont.",
          value: "hoursApont.hours__sum",
          align: "right"
        },
        { sortable: false, text: "Responsável", value: "user.username" }
      ]
    };
  }
};
</script>