<template>
  <v-container fluid>
    <v-row justify="left">
      <v-col cols="10">
        <material-card color="orange" title="Value" text>
          <v-data-table :headers="headers" :items="values" :search="search" hide-default-footer />
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
    this.getData();
    axios.get("http://127.0.0.1:8000/values/").then(response => {
      this.values = response.data;
    });
  },

  methods: {
    getData: function() {},
    checkLoggedIn: function() {
      this.$session.start();
      if (!this.$session.has("token")) {
        router.push("/auth");
      }
    }
  },
  created: function() {
    this.getData();
  },

  data() {
    return {
      search: "",
      values: [],
      headers: [
        //  { sortable: true, text: "Id", value: "id" },
        { sortable: true, text: "Project", value: "project.demandCode" },
        { sortable: true, text: "Description", value: "project.description" },
        { sortable: false, text: "Value", value: "value" },
        { sortable: false, text: "Date", value: "created_at"},
        //  { sortable: false, text: "Action", value: "action" }
      ]
    };
  }
};
</script>