<template>
  <div id="app">
    <el-row class="app-el-row-top">
      <Filters :form="form" />
    </el-row>
    <el-row :gutter="20" class="app-el-row-bottom">
      <el-col :span="18" class="app-el-col">
        <Main :weatherList="weatherList" :leaseList="leaseList" />
      </el-col>
      <el-col :span="6" class="app-el-col">
        <Holidays
          :holidaysList="holidaysList"
          :activeIndex.sync="activeIndex"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Holidays from "./components/Holidays.vue";
import Main from "./components/Main.vue";
import Filters from "./components/Filters.vue";
export default {
  components: {
    Holidays,
    Main,
    Filters,
  },
  data() {
    return {
      form: {
        country: 0,
        area: [],
      },
      holidaysList: [],
      activeIndex: 0,
      weatherList: [],
      leaseList: [],
    };
  },
  mounted() {
    this.getHolidaysInfo();
  },
  watch: {
    form: {
      handler() {
        this.activeIndex = 0;
        this.getHolidaysInfo();
      },
      deep: true,
    },
    activeIndex: {
      handler(val) {
        if (this.holidaysList.length) {
          this.getWeatherByHoliday();
          this.getLeaseInfo();
        }
      },
    },
  },
  computed: {
    currentHoliday() {
      return this.holidaysList[this.activeIndex];
    },
  },
  methods: {
    async getHolidaysInfo() {
      const {
        data: { status, content },
      } = await this.$http("/api/holidays/info");
      if (status === 200) {
        this.holidaysList = content;
        this.getWeatherByHoliday();
        this.getLeaseInfo();
      }
    },
    async getWeatherByHoliday() {
      const {
        data: { status, content },
      } = await this.$http.post("/api/holidays/weather", this.currentHoliday);
      if (status === 200) {
        this.weatherList = content;
      }
    },
    async getLeaseInfo() {
      const {
        data: { status, content },
      } = await this.$http.post("/api/holidays/lease", this.currentHoliday);

      if (status === 200) {
        this.leaseList = content;
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  .app-el-row-bottom {
    flex: 1;
    .app-el-col {
      height: 100%;
    }
  }
}
</style>
