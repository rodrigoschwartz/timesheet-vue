<template>
  <v-container fluid>
    <v-row justify="left">
      <v-col cols="10">
        <material-card color="orange" title="Projects" text>
          <v-data-table :headers="header" :items="projects" :search="search" hide-default-footer />
        </material-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="5">
        <material-chart-card
          :data="projects_charts.data_status"
          :options="projects.options"
          :responsive-options="projects.responsiveOptions"
          color="orange"
          type="Bar"
        >
          <h4 class="title font-weight-light">Projects By Status</h4>
        </material-chart-card>
      </v-col>
      <v-col cols="12" lg="5">
        <material-chart-card
          :data="projects_charts.data_hours"
          :options="projects.options"
          :responsive-options="projects.responsiveOptions"
          color="orange"
          type="Bar"
        >
          <h4 class="title font-weight-light">Projects By Hours</h4>
        </material-chart-card>
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
        { sortable: true, text: "Demand Code", value: "demandCode" },
        { sortable: false, text: "Description", value: "description" },
        { sortable: false, text: "Status", value: "status" },
        { sortable: false, text: "Value", value: "value", align: "right" },
        { sortable: false, text: "Hours", value: "hoursAp", align: "right" },
        { sortable: false, text: "Responsible", value: "user.username" }
      ],

      projects_charts: {
        data_status: {
          labels: ["Planning", "Execution", "Tests", "Go-Live", "Finished"],
          series: [[3, 5, 4, 1, 2]]
        },
        data_hours: {
          labels: ["> 100", "100-300", "300-500", "500-800", "< 800"],
          series: [[3, 5, 4, 1, 2]]
        },
        options: {
          axisX: { showGrid: false },
          low: 0,
          high: 15,
          chartPadding: { top: 0, right: 7, bottom: 0, left: 0 }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      }
    };
  }
};
</script>