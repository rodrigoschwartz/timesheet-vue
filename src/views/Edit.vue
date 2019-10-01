<template>
  <div class="pt-5">
    <form @submit.prevent="update" method="post">
      <div class="form-group">
        <label for="demandCode">Demand Code</label>
        <input
          name="demandCode"
          type="number"
          class="form-control"
          id="demandCode"
          v-model="project.demandCode"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          name="description"
          type="text"
          class="form-control"
          id="description"
          v-model="project.description"
        />
      </div>
      <div class="form-group">
        <label for="value">Value</label>
        <input name="value" type="number" class="form-control" id="value" v-model="project.value" />
      </div>
      <div class="form-group">
        <label for="hours">Hours</label>
        <input type="number" name="hours" class="form-control" id="hours" v-model="project.hours" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      project: {
        demandCode: "",
        description: "",
        value: "",
        hours: ""
      },
      submitted: false
    };
  },
  mounted() {
    axios
      .get("http://localhost:8000/projects/" + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.project = response.data;
      });
  },
  methods: {
    update: function() {
      this.submitted = true;
      axios
        .put(
          "http://localhost:8000/projects/${this.project.id}/",
          this.subscription
        )
        .then(response => {
          this.$router.push("/");
        });
    }
  }
};
</script>