<template>
  <v-container fluid>
    <v-row justify="left">
      <v-col cols="10">
        <material-card color="green" title="Add Hours" text="Add new Hours appoitment">
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="15" md="4">
                  <v-text-field label="Hours" />
                </v-col>

                <v-col cols="15" md="4">
                  <v-text-field class="purple-input" label="User Name" />
                </v-col>

                <v-col cols="5" md="4" align="right">
                  <v-btn color="success">Create</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>
      <v-col cols="10">
        <material-card color="orange" title="Hours" text>
          <v-data-table :headers="headers" :items="hours" :search="search" hide-default-footer />
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
      axios.get("http://127.0.0.1:8000/hours/").then(response => {
        this.hours = response.data;
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
      search: "",
      hours: [],
      headers: [
        //  { sortable: true, text: "Id", value: "id" },
        { sortable: true, text: "Project", value: "project.demandCode" },
        { sortable: true, text: "Description", value: "project.description" },
        { sortable: false, text: "Hours", value: "hours" },
        { sortable: false, text: "Date", value: "created_at" },
        { sortable: false, text: "Responsible", value: "user.username" }
      ]
    };
  }
};
</script>