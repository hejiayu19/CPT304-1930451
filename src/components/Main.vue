<template>
  <el-card class="main">
    <div class="weather">
      <div class="title">Weather Information</div>
      <div class="weather-list">
        <div
          class="weather-item"
          v-for="(weather, index) in weatherList"
          :key="index"
        >
          <div class="item-time">
            {{ weather.time | formateTime }}
          </div>
          <div class="item-img">
            <img :src="formateImageUrl(weather.status)" alt="" />
          </div>
          <div class="item-lowest">{{ weather.lowestTemperature }} °</div>
          <div class="item-max">{{ weather.maximumTemperature }} °</div>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="title">Lease Information</div>
      <div class="lease-list">
        <el-table :data="leaseList" style="width: 100%">
          <el-table-column prop="name" label="Place Name" width="250">
            <template slot-scope="scope"> {{ scope.row.name }} Home </template>
          </el-table-column>
          <el-table-column prop="square" label="Square">
            <template slot-scope="scope"> {{ scope.row.square }} ㎡ </template>
          </el-table-column>
          <el-table-column prop="price" label="Price">
            <template slot-scope="scope"> $ {{ scope.row.square }} </template>
          </el-table-column>
          <el-table-column prop="address" label="Address" width="500">
          </el-table-column>
          <el-table-column prop="phone" label="Phone"> </el-table-column>
        </el-table>
      </div>
    </div>
  </el-card>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    weatherList: {
      type: Array,
      default() {
        return [];
      },
    },
    leaseList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  filters: {
    formateTime(val) {
      return dayjs(val).format("MM-DD");
    },
  },
  data() {
    return {
      tableHeight: 0,
    };
  },
  methods: {
    formateImageUrl(status) {
      switch (status) {
        case 0:
          return require("@/images/0.webp");
        case 1:
          return require("@/images/1.webp");
        case 2:
          return require("@/images/2.webp");
        case 3:
          return require("@/images/3.webp");
        default:
          return require("@/images/0.webp");
      }
    },
  },
};
</script>

<style lang="scss">
.main {
  height: 100%;
  .el-card__body {
    height: 100%;
  }
  .title {
    font-size: 20px;
    line-height: 30px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .weather {
    height: 30%;
    display: flex;
    flex-direction: column;
    .weather-list {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
    .weather-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      margin-right: 10px;
      .item-img {
        img {
          width: 40px;
        }
      }
    }
  }
  .info {
    height: 65%;
  }
}
</style>
