export default {
  data() {
    return {
      fileList: [], //文件列
      client: ""
    };
  },
  created() {
    // this.client = new OSS({
    //   accessKeyId: "LTAI4GHFFo8Fk4XrRiTkLKj5",
    //   accessKeySecret: "okbXSQv1X9joSxVPIOKZniMO6e1kYs",
    //   bucket: "tengdabs"
    // });
  },
  computed: {},
  methods: {
    // 删除文件之前的钩子
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
      this.fileList = fileList;
    },
    async Upload(file) {
      let fileName = file.file.name;
      this.client
        .multipartUpload(`${fileName}`, file.file, {
          progress: () => {}
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeUpload(index) {
      this.$confirm(`确定移除？`)
        .then(() => {
          this.fileList.splice(index, 1);
        })
        .catch((r) => {});
    }
  }
};
