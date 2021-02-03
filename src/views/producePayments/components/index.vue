<template>
  <div>
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="付款对象：">
        {{ data.producer_customers.find((r) => r.id === value).name }}
      </el-form-item>
      <el-form-item label="本次金额：" prop="amount">
        <el-input v-model="formData.amount" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="银行账号：">
        <el-input v-model="formData.receipt_bank" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="收款日期：">
        <el-date-picker v-model="formData.received_date" type="date" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="付款单号：">
        <el-input v-model="formData.receipt_serial" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input type="textarea" v-model="formData.note" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="d-flex justify-content-end p-2">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixin/mixin";
export default {
  mixins: [mixin],
  data() {
    return {
      formData: {
        spending_type: 1,
        amount: "",
        received_date: moment(new Date()).format("YYYY-MM-DD"),
        receipt_bank: "",
        receipt_serial: "",
        note: ""
      },
      rules: {
        amount: [{ required: true, message: "请输入金额", trigger: "blur" }]
      }
    };
  },
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  methods: {
    cancel(type = false) {
      this.$emit("change", type);
    },
    save() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        await this.$post("order_receipts/for_create", {
          order_receipt: {
            ...this.formData,
            ...{
              year: moment(new Date()).format("YYYY"),
              customer_id: this.value,
              amount: parseFloat(this.formData.amount),
              received_date: moment(this.formData.received_date).format("YYYY-MM-DD")
            }
          }
        });
        Object.assign(this.$data.formData, this.$options.data().formData);
        this.$message.success("添加付款成功！");
        this.cancel(true);
      });
    }
  }
};
</script>

<style></style>
