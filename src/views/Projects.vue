<template>
  <v-container fluid>
    <v-row justify="left">
      <v-col cols="10">
        <material-card color="orange" title="Projects" text>
          <v-data-table :headers="headers" :items="projects" :search="search" hide-default-footer />
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

export default {
  mounted() {
    this.getData();

    axios.get("http://127.0.0.1:8000/projects/").then(response => {
      this.projects = response.data;
    });
  },

  methods: {
    getData: function() {},
    complete(index) {
      this.list[index] = !this.list[index];
    }
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