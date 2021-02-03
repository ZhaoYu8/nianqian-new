let obj = {
  async data() {
    let res = await this.$post('common/options')
    return res;
  }
};
export default obj;
