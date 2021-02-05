import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapState(["data", "orders"])
  },
  methods: {
    async initOptions() {
      if (this.orders.length) return;
      let res = await this.$post("common/orders");
      this.$store.commit("setOrders", res.orders);
      console.log(this.orders);
    },
    querySearch() {
      let options = JSON.parse(JSON.stringify(this.listQuery));
      this.arr.map((r) => {
        if (!r.model) return;
        if (r.type === "daterange") {
          options[r.id + "_min"] = r.model[0] ? moment(r.model[0]).format("YYYY-MM-DD") : "";
          options[r.id + "_max"] = r.model[1] ? moment(r.model[1]).format("YYYY-MM-DD") : "";
        } else if (r.type === "date") {
          options[r.id] = moment(r.model).format("YYYY-MM-DD");
        } else {
          options[r.id] = r.model;
        }
      });
      return options;
    }
  }
};
