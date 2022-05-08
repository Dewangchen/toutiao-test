<template>
  <div class="search-history">
    <van-cell title="搜索历史">
        <div v-if="isDeleteShow">
          <span @click="$emit('clear-search-histories')">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isDeleteShow = false">完成</span>
        </div>
        <van-icon
        name="delete"
        v-else
        @click="isDeleteShow = true"
        ></van-icon>
    </van-cell>
    <van-cell
    v-for="(item,index) in searchHistories"
    :key="index"
    :title="item"
    @click="onSearchItemClick(item, index)"
    >
        <van-icon v-show="isDeleteShow" name="close"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    // Prop 数据
    // Prop 是受父组件数据影响的
    // 如果是普通数据 （数字，字符串，布尔值）绝对不能修改，
    // 即便改了也不会传导给父组件

    // 如果是引用类型数据（数组、对象）
    //     可以修改，例如[].push，对象.xxx = xxx
    //     不可用重新赋值，xxx = []
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false, // 控制删除显示状态
      searchHistoriesfather: this.searchHistories
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearchItemClick (item, index) {
      if (this.isDeleteShow) {
        this.searchHistoriesfather.splice(index, 1)
        // 删除状态
      } else {
        // 非删除状态，直接进入搜索
        this.$emit('search', item)
      }
    }
    // delAll () {
    //   this.searchHistoriesfather.splice(0, this.searchHistoriesfather.length)
    // }
  }
}
</script>

<style scoped></style>
