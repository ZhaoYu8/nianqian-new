<template>
  <div>
    <el-form ref="form" :model="formData" label-width="120px">
      <el-form-item label="付款对象：" prop="name">
        生产商客户
      </el-form-item>
      <el-form-item label="本次金额：" prop="name">
        <el-input v-model="formData.money" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="银行账号：" prop="name">
        <el-input v-model="formData.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="收款日期：" prop="name">
        <el-date-picker v-model="formData.date" type="date" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="付款单号：" prop="name">
        <el-input v-model="formData.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="name">
        <el-input type="textarea" v-model="formData.name" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="d-flex justify-content-end p-2">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        money: "",
        date: moment(new Date()).format("YYYY-MM-DD"),
        name: ""
      }
    };
  },
  methods: {
    cancel(type = false) {
      this.$emit("change", type);
    },
    save() {
      let options = { ...this.formData };
      options = {
        money: parseFloat(options.money)
      };
      this.cancel(true);
    }
  }
};
</script>

<style></style>
