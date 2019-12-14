<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card class="box-card">
          <el-row>
            <el-col :span="18">
              <el-input v-model="input" placeholder="请输入内容" size="mini" />
            </el-col>
            <el-col :span="6">
              <el-button size="mini" @click="add()"> 创建 </el-button>
            </el-col>
          </el-row>
          <div v-for="(o, index) in arr" :key="index" class="text item">
            <div :class="{ active: o.action }" @click="click_row(index)">
              <el-button size="mini" type="text">{{ index+' '+ o.name }}</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="15">
        <el-card>
          <el-row>
            <el-button>生 效</el-button>
            <el-button type="primary"> 失生 效</el-button>
            <el-button type="success">删除</el-button>
            <el-button type="info">编辑</el-button>
          </el-row>
          <br>
          <el-row>
            <el-card>
              <el-row>
                <el-col :span="4">
                  奖项规则：
                </el-col>
                <el-col :span="12">
                  <el-input v-model="prize" placeholder="" />
                </el-col>
              </el-row>
              <br>
              <el-row>
                <el-col :span="4">
                  规则类型：
                </el-col>
                <el-col :span="12">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
              </el-row>
              <br>
              <el-row>
                <el-col :span="4">
                  奖项：
                </el-col>
                <el-col :span="12">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
              </el-row>
              <br>
              <el-row>
                <el-col :span="4">
                  奖项剩余数量：
                </el-col>
                <el-col :span="12">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
              </el-row>
            </el-card>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { level_openOrClose } from '@/api/censorship'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      prize: '而低等级爱哪个',
      arr: [
        { name: '奖项规则', value: '1', disabled: true, id: '1', action: true },
        { name: '奖项规则', value: '2', disabled: true, id: '2' },
        { name: '奖项规则', value: '3', disabled: true, id: '3' },
        { name: '奖项规则', value: '4', disabled: true, id: '4' }
      ],
      isAdd: false,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    add() {
      this.arr.push({ name: this.input })
      this.input = ''
    },

    // 点击标示
    click_row(e) {
      return this.arr.map((item, index) => {
        if (e === index) {
          this.$set(item, 'action', true)
        } else {
          this.$set(item, 'action', false)
        }
      })
    }
  }
}
</script>
<style scoped>
.active{
  background-color: #5698dc4f;
}
.box-card {
  min-height: 117px;
  height: 93vh;
  padding: 20px;
  padding: 20px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
 width: 270px;
 overflow: scroll;
}
.row_list{
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border-radius: 5px;
}
span.row_ti_name_sole {
    width: 20px;
    display: inline-block;
}
p.row_ti_name.height_fen {
    color: gray;
}
.row_flag {
    margin-bottom: 10px;
}
.maben_left {
    margin-left: 20px;
}

.avatar-uploader {
    margin: 0 auto;
    text-align: center;
}
.el-icon-plus{
   border: 1px dashed #d9d9d9;
}
.avatar-uploader >.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.el-upload .el-upload--text{
     border: 1px dashed #d9d9d9;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.row_falg{
  margin-bottom:10px
}
</style>
