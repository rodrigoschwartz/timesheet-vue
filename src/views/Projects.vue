<template>
  <v-container fill-height fluid grid-list-xl>
    <v-row justify="center">
      <v-col cols="12">
        <material-card color="green" title="Projects" text>
          <v-data-table :headers="headers" :items="projects" :search="search" hide-default-footer />
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.getData();

    axios.get("http://127.0.0.1:8000/projects/").then(response => {
      this.projects = response.data;
    });
  },

  methods: {
    getData: function() {}
  },
  created: function() {
    this.getData();
  },

  data() {
    return {
      search: "",
      projects: [],
      headers: [
        //  { sortable: true, text: "Id", value: "id" },
        { sortable: true, text: "Demand Code", value: "demandCode" },
        { sortable: false, text: "Description", value: "description" },
        { sortable: false, text: "Status", value: "status" },
        { sortable: false, text: "Value", value: "value", align: "right" },
        { sortable: false, text: "Hours", value: "hoursAp", align: "right" }
        //  { sortable: false, text: "Action", value: "action" }
      ]
    };
  }
};
</script>