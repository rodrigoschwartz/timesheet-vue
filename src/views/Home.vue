<script>
import router from "../router";

export default {
  mounted() {
    this.checkLoggedIn();
  },

  methods: {
    checkLoggedIn: function() {
      this.$session.start();
      if (!this.$session.has("token")) {
        router.push("/auth");
      }
    }
  }
};
</script>