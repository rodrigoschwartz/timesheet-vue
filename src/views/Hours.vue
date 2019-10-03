<template>
  <v-container fluid>
    <v-row justify="left">
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
import moment from "moment";

export default {
  mounted() {
    this.getData();

    axios.get("http://127.0.0.1:8000/hours/").then(response => {
      this.hours = response.data;
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
      hours: [],
      headers: [
        //  { sortable: true, text: "Id", value: "id" },
        { sortable: true, text: "Project", value: "project.demandCode" },
        { sortable: true, text: "Description", value: "project.description" },
        { sortable: false, text: "Hours", value: "hours" },
        { sortable: false, text: "Date", value: "created_at"},
        //  { sortable: false, text: "Action", value: "action" }
      ]
    };
  }
};
</script>