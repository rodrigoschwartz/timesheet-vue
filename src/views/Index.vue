<template>
  <v-card :dark="true" align="center" width="600px">
    <v-list-item v-for="project in projects" :key="project.demandCode">
      <v-row>
        <v-col align="left">
          <h3>
            <v-list-item-title v-html="project.demandCode"></v-list-item-title>
          </h3>
          <h4>
            <v-list-item-subtitle v-html="project.description"></v-list-item-subtitle>
          </h4>
        </v-col>
        <v-col align="right">
          <v-btn depressed small color="primary" :to="{name: 'edit', params: {id: project.id}}">Edit</v-btn>
          <p></p>
          <v-btn depressed small color="error" @click="DeleteProject()">Delete</v-btn>
        </v-col>
      </v-row>
    </v-list-item>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      projects: []
    };
  },
  created() {
    this.all();
  },
  methods: {
    deleteProjects: function(proj) {
      if (confirm("Delete " + proj.demandcode)) {
        axios.delete("http://127.0.0.1:8000/projects/${proj.id}");
      }
    },
    all: function() {
      axios.get("http://127.0.0.1:8000/projects/").then(response => {
        this.projects = response.data;
      });
    }
  }
};
</script>