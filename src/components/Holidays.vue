<template>
  <el-card class="holidays-container">
    <div class="header">
      <div class="vacation-time">Vacation</div>
      <div class="days-time">Days</div>
    </div>
    <div
      v-for="(holiday, index) in holidaysList"
      :key="index"
      class="holiday-item"
      :class="{ active: activeIndex === index }"
      @click="handleClick(index)"
    >
      <div class="time-duration">
        {{ holiday.startDate | formateTime }} -
        {{ holiday.endDate | formateTime }}
      </div>
      <div class="dayjs">
        {{ holiday.days }}
      </div>
    </div>
  </el-card>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {};
  },
  props: {
    holidaysList: {
      type: Array,
      default() {
        return [];
      },
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
  },
  filters: {
    formateTime(val) {
      return dayjs(val).format("YYYY-MM-DD");
    },
  },
  methods: {
    handleClick(index) {
      this.$emit("update:activeIndex", index);
    },
  },
};
</script>

<style lang="scss">
.holidays-container {
  height: 100%;
  overflow: hidden;
  .el-card__body {
    height: 100%;
    overflow: auto;
  }
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 16px;
    line-height: 26px;
    font-weight: bold;
    padding: 0 8px;
    .vacation-time {
    }
    .days-time {
    }
  }
  .holiday-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    margin-top: 10px;
    padding: 4px 8px;
    border-radius: 4px;
    &.active {
      background-color: #df7f23;
      color: #fff;
    }
  }
}
</style>
