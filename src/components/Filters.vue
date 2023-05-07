<template>
  <el-form ref="form" :model="form" label-width="80px" inline>
    <el-form-item label="Country：">
      <el-select
        v-model="form.country"
        placeholder="Please Select"
        @change="handleCountryChange"
      >
        <el-option
          v-for="item in countryData"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Area：">
      <el-cascader
        v-model="form.area"
        :options="areaData"
        @change="handleAreaChange"
        clearable
        :props="{ checkStrictly: true }"
      ></el-cascader>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      areaData: [],
      countryData: [],
    };
  },
  mounted() {
    this.getCountry();
  },
  watch: {
    "form.country": {
      handler() {
        this.getAreaData();
      },
    },
  },
  methods: {
    handleAreaChange(value) {
      console.log(value);
    },
    handleCountryChange(value) {
      console.log(value);
    },
    async getAreaData() {
      const {
        data: { status, content },
      } = await this.$http.post(
        "/api/area",
        this.countryData[this.form.country]
      );
      if (status === 200) {
        this.areaData = content;
      }
    },
    async getCountry() {
      const {
        data: { status, content },
      } = await this.$http("/api/country");
      if (status === 200) {
        this.countryData = content;
        this.getAreaData();
      }
    },
  },
};
</script>

<style></style>
