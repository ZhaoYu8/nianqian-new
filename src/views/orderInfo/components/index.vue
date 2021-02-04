<template>
  <div>
    <el-row :gutter="20">
      <el-form ref="form" :model="formOptions" :rules="rules" label-width="120px">
        <el-col :span="6">
          <el-form-item label="下单客户：" prop="customer_id">
            <page v-model="formOptions.customer_id" size="small" placeholder="请选择" :data="formData.normaler_customers" @change="change"></page>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="下单时间：" prop="billing_date">
            <el-date-picker v-model="formOptions.billing_date" size="small"> </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单编号：">
            <el-input v-model="formOptions.order_num" size="small" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="币种：" prop="currency_id">
            <el-select v-model="formOptions.currency_id" size="small" placeholder="请选择">
              <el-option v-for="item in formData.currencies" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="联系人：" prop="contact_id">
            <page v-model="formOptions.contact_id" size="small" placeholder="请选择" :data="formData.contact"></page>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="付款地址：">
            <el-input v-model="formOptions.payment_type" size="small" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="进度模板：">
            <page v-model="formOptions.progress_template_id" size="small" placeholder="请选择" :data="formData.templates"></page>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="销售：" prop="saler_id">
            <page v-model="formOptions.saler_id" size="small" placeholder="请选择" :data="formData.members"></page>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="负责人：" prop="member_id">
            <page v-model="formOptions.member_id" size="small" placeholder="请选择" :data="formData.members"></page>
          </el-form-item>
        </el-col>

        <el-col :span="18">
          <el-form-item label="服务条款：">
            <el-input v-model="formOptions.clause_service" type="textarea" size="small" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注说明：">
            <el-input v-model="formOptions.note" type="textarea" size="small" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-upload
            action
            :http-request="Upload"
            :show-file-list="false"
            :on-preview="handlePreview"
            :before-remove="beforeRemove"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :limit="limit"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div v-for="(item, index) in fileList" :key="item.name" class="d-flex justify-content-between upload">
            <a class="cursor" :href="client.signatureUrl(item.name)" download>{{ item.name }}</a>
            <i class="el-icon-circle-close cursor" @click="removeUpload(index)" />
          </div>
        </el-col>
      </el-form>
    </el-row>
    <div class="d-flex justify-content-end align-items-center"><el-button type="primary" icon="el-icon-edit" circle size="mini" class="m-2" @click="addProduct"></el-button>新增</div>
    <el-table :data="tableData" style="width: 100%" border ref="firstTable" stripe>
      <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
      <el-table-column header-align="center" align="center" label="产品编号" :prop="custom_field_group_id">
        <template slot-scope="scope">
          <el-input v-model="scope.row.custom_field_group_id" placeholder="请输入"></el-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="产品名称" :prop="name">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" placeholder="请输入"></el-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="产品类型" :prop="serial_number">
        <template slot-scope="scope">
          <el-select v-model="scope.row.serial_number" placeholder="请选择">
            <el-option :label="item.name" :value="item.id" v-for="item in data.groups" :key="item.id"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="产品单价" :prop="price">
        <template slot-scope="scope">
          <el-input v-model="scope.row.price" placeholder="请输入" @change="changeMoney(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="产品数量" :prop="quantity">
        <template slot-scope="scope">
          <el-input v-model="scope.row.quantity" placeholder="请输入" @change="changeMoney(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="总价" prop="total_price"> </el-table-column>
      <el-table-column header-align="center" align="center" label="单位" :prop="unit">
        <template slot-scope="scope">
          <el-input v-model="scope.row.unit" placeholder="请输入"></el-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="是否含税" :prop="tax">
        <template slot-scope="scope">
          <el-select v-model="scope.row.tax" placeholder="请选择" clearable>
            <el-option :label="item.name" :value="item.id" v-for="item in data.taxes" :key="item.id"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="操作" :prop="tax">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteProduct(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="d-flex justify-content-end mt-2">
      <el-button @click="cancel(false)">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </div>
</template>

<script>
import mixin from "@/mixin/mixin";
import update from "@/mixin/update";
export default {
  mixins: [mixin, update],
  components: {},
  data() {
    return {
      dialogShow: false,
      formOptions: {
        customer_id: "",
        billing_date: moment().format("YYYY-MM-DD"),
        order_num: "",
        currency_id: "",
        contact_id: "",
        payment_type: "",
        progress_template_id: "",
        saler_id: "",
        member_id: "",
        clause_service: "",
        note: ""
      },
      formData: {},
      rules: {
        customer_id: [{ required: true, message: "清选择下单客户", trigger: "change" }],
        billing_date: [{ required: true, message: "请选择下单时间", trigger: "change" }],
        currency_id: [{ required: true, message: "请选择币种", trigger: "change" }],
        saler_id: [{ required: true, message: "请输入销售", trigger: "change" }],
        member_id: [{ required: true, message: "请输入负责人", trigger: "change" }]
      },
      tableData: [],
      defaultData: {
        custom_field_group_id: "",
        name: "",
        serial_number: undefined,
        price: "",
        quantity: "",
        total_price: "",
        unit: "",
        tax: undefined
      }
    };
  },
  methods: {
    addProduct() {
      this.tableData.push({ ...this.defaultData });
    },
    // 选择客户 给联系人赋值
    async change() {
      if (!this.formOptions.customer_id) {
        this.formData.contact = [];
        this.formOptions.contact_id = "";
        return;
      }
      let res = await this.$post("common/contacts", {
        customer_id: this.formOptions.customer_id
      });
      this.formData.contact = res.contacts;
      this.formOptions.contact_id = res.contacts[0].id;
    },
    save() {
      let type = false;
      this.tableData.map((r, i) => {
        if (type) return;
        if (!r.name.trim()) {
          this.$message.error(`检测到第${i + 1}行产品名称为空！`);
          type = true;
        } else if (!r.price.trim()) {
          this.$message.error(`检测到第${i + 1}行产品单价为空！`);
          type = true;
        } else if (!r.quantity.trim()) {
          this.$message.error(`检测到第${i + 1}行产品数量为空！`);
          type = true;
        }
      });
      if (type) return;
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        await this.$post("orders/for_create", {
          order: {
            ...this.formOptions,
            ...{
              billing_date: moment(this.formOptions.billing_date).format("YYYY-MM-DD"),
              tracking_attributes: {
                saler_id: this.formOptions.saler_id,
                member_id: this.formOptions.member_id
              }
            }
          },
          products_attributes: this.tableData
        });
        this.$message.success("下单成功！");
        this.cancel(true);
      });
    },
    cancel(type) {
      Object.assign(this.$data.formOptions, this.$options.data().formOptions);
      this.tableData = [];
      this.addProduct();
      this.$emit("cancel", type);
    },
    changeMoney(row) {
      row.price = (parseFloat(row.price) || 0).toFixed(2) + "";
      row.quantity = (parseFloat(row.quantity) || 0).toFixed(2) + "";
      row.total_price = (parseFloat(row.price * row.quantity) || 0).toFixed(2) + "";
    },
    deleteProduct(i) {
      if (this.tableData.length === 1) {
        this.$message.error('不能再删除了，只剩一个了！')
        return;
      }
      this.$confirm(`确定移除？`)
        .then(() => {
          this.tableData.splice(i, 1);
        })
        .catch((r) => {});
    }
  },
  mounted() {
    this.formData = {
      normaler_customers: this.data.normaler_customers, // 下单客户
      templates: this.data.templates, // 进度模板
      currencies: this.data.currencies, // 币种
      members: this.data.members, // 销售
      contact: []
    };
    this.addProduct();
  }
};
</script>

<style lang="scss" scoped>
.upload {
  .cursor {
    cursor: pointer;
  }
}
</style>
