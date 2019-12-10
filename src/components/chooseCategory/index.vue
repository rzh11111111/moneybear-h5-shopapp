<template>
  <div style="padding: 5px 0 20px;">
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
    >
    <div style="text-align: center;padding-top: 20px;" v-if="!list[currentLevel] || !list[currentLevel].length">{{emptyText}}</div>
    <van-cell
      v-for="(item, inx) in list[currentLevel]"
      :key="item.id"
      class="category-list-box"
      @click="handleChild(item, inx,currentLevel)">
      <span :style="currentList[currentLevel] && currentList[currentLevel].id === item.id ? 'color:#0088FD;' : ''">{{item.name}}</span>
      <van-icon name="success" color="#0088FD" v-if="checkedItem === item.id"/>
      <van-icon name="arrow" v-else-if="!item.noChild"/>
    </van-cell>
  </van-list>
  </div>
</template>

<script>
export default {
  props: {
    getDataList: {
      type: Function,
      required: true
    },
    parentId: {
      type: String,
      default: () => ''
    },
    listConfig: {
      type: Object,
      default() {
        return {
          level: 0,
          list: []
        }
      }
    },
    selected: {
      type: Function
    },
    emptyText: {
      type: String,
      default: () => '暂无数据'
    }
  },
  data() {
    return {
      list: [],
      oldList: [],
      oldLevel: null,
      currentLevel: 0,
      currentList: [],
      checkedItem: '',
      loading: false,
      finished: false
    };
  },
  watch: {
    'listConfig.level': function(level) {
      if (level !== this.currentLevel) {
        this.currentLevel = level
        this.listConfig.list.length = level + 1;
        this.currentList.level = level + 1;
      }
    },
    currentLevel: function(level) {
      if (level !== this.listConfig.level) {
        this.listConfig.level = level
      }
    }
  },
  methods: {
    onLoad() {
      if (!this.finished) {
        this.getList({id: this.parentId}, (res) => {
          this.loading = false
          this.finished = true
          this.list[0] = res
        })
      }
    },
    handleChild(item, inx,currentLevel) {
      this.getList(item, (res) => {
        this.listConfig.list[this.currentLevel] = Object.assign({}, item);
        this.currentList[this.currentLevel] = item
        if (res && res.length) {
          this.currentLevel ++;
          this.list[this.currentLevel] = res
          this.$emit('initialize','click')
        } else {
          item.noChild = true
          this.checkedItem = item.id
          this.listConfig.list.length = this.currentLevel + 1
          this.currentList.length = this.currentLevel + 1
          let allCurrent=[]
          for (let i=0;i<this.listConfig.list.length;i++){
            console.log(this.listConfig.list[i].name)
            allCurrent[i]=this.listConfig.list[i].name
          }
          this.$forceUpdate()
          typeof(this.selected) === 'function' && this.selected(item,allCurrent);
        }
      })
      // this.$parent.initialize()

    },
    getList(params, callback) {
      this.getDataList(params).then(res => {
        callback(res)
      })
    },
    filterList(keyword) {
      if (!this.oldLevel && this.oldLevel !== 0) {
        this.oldLevel = this.currentLevel;
        this.oldList = Array.from(this.list[this.currentLevel])
      }
      this.list[this.currentLevel] = []
      this.oldList.map(item => {
        if (item.name.indexOf(keyword) > -1) {
          this.list[this.currentLevel].push(item)
        }
      })
      this.$forceUpdate()
    },
    cancelFilter() {
      this.list[this.oldLevel] = Array.from(this.oldList)
      this.oldList = []
      this.oldLevel = null;
      this.$forceUpdate()
    }
  },
  created() {
    if (!this.listConfig.list || !(this.listConfig.list instanceof Array)) {
      this.listConfig.list = []
    }
  },
  mounted() {
    let list = this.listConfig.list;
    this.checkedItem = list[list.length - 1] ? list[list.length - 1].id : ''
    this.currentList = Array.from(list)
  }
}
</script>

<style lang="scss" scoped>
.category-list-box{
  i{
    position:absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
}
</style>
