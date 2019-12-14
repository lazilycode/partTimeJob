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
              <el-button type="text" size="mini" @click="add()"> 创建 </el-button>
            </el-col>
          </el-row>
          <div v-for="(o, index) in arr" :key="index" class="text item">
            <div v-bind:class="{ active: o.action }" @click='click_row(index)'> <el-button size="mini" type="text" >{{ index+' '+ o.name }}</el-button> <el-button size="mini" type="text"  @click="dialogVisible = true">导入</el-button> <el-button size="mini" type="text" @click='startUsing' :disabled='o.disabled' >启用</el-button><el-button size="mini" type="text">配置</el-button></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="19">
        <div>
       <el-row>
          <el-col :span="24">
           <el-button type="primary" @click='creatTopic(0)'>创建题目</el-button>
          </el-col>
        </el-row>


          <el-row class="row_flag" v-for="(item, index) in arrTopic" :key="index">
            <el-col :span="24" class="row_list">
              <el-row>
                  <el-col :span="20">
                     <p class="row_ti_name"><span class="row_ti_name_sole">{{index}}</span> <span> {{item.topicName}}</span></p>
                      <div class="maben_left">
                        <p class="row_ti_name height_fen"><span>(最高分值{{item.score}})</span></p>
                        <div>
                          <el-checkbox-group v-model="item.checklist">
                            <p v-for='items in item.result' :label="items.index" :key="items.index">
                              <el-checkbox :label="items.index"  >{{items.resultName}}</el-checkbox>
                            </p>
                          </el-checkbox-group>
                        </div>
                      </div>
                    </el-col>
                  <el-col :span="4">
                     <el-button type="primary" size="small" @click='editTopic(index)'>编辑</el-button>
                     <el-button type="primary" size="small" @click='creatTopic'>删除</el-button>
                  </el-col>
                </el-row>
            </el-col>
          </el-row>

        
          
        </div>
      </el-col>
    </el-row>


    <el-dialog
      title="导入excel"
      :visible.sync="dialogVisible"
      width="50%"
      >
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

   <el-dialog
    title="提示"
    :visible.sync="topicdialogVisible"
    width="40%"
    >
   <el-row>
   <div class="row_falg">
   <p> 每道题{{creatArr.score}}分</p>
   <el-input type="textarea" :rows="2" placeholder="请输入题目内容" v-model="creatArr.topicName"/>
   </div>
  </el-input>
    <el-row :gutter="20">
        <div v-for='(item,index) in creatArr.result' class="row_falg">
            <el-col :span="10">
            <el-input v-model="item.resultName" placeholder="请输入答案"></el-input> 
            </el-col>
            <el-col :span="5">
              <el-checkbox v-model="item.defaultResult">备选项</el-checkbox>  
            </el-col>
            <el-col :span="4" >
              <el-button type="primary"  v-if='index===0' @click='addTopic'> 增加</el-button>
            </el-col>
             <el-col :span="4" >
              <el-button type="primary" v-if='index!==0'  @click='delTopic(index)'> 删除</el-button>
            </el-col>
        </div>
        <br>
      </el-row>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="topicdialogVisible = false">取 消</el-button>
      <el-button type="primary" v-if='!edit' @click='sure'>确 定</el-button>
      <el-button type="primary" v-if='edit' @click='editSure(creatArr.result)'>编辑确定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import { level_openOrClose } from '@/api/censorship'

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
      topIc:'',
      //创建题目
      topicdialogVisible:false,
      // 导入
      dialogVisible: false,
       imageUrl: '',
      input: '',
      //创建题目
      edit:false,
      creatArr:{
        score:10,
        topicName:'',
        result:[{
          resultName:'',
          defaultResult:''
        }]
      },
      arrTopic:[],
      

      arr: [
        { name: '第一题', value: '1',disabled:true ,id:'1',action:true},
        { name: '第二题', value: '2', disabled:true ,id:'2'},
        { name: '第三题', value: '3', disabled:true ,id:'3'},
        { name: '第四题', value: '4',disabled:true ,id:'4'}
      ],
      isAdd: false,
      list: null,
      listLoading: true,
      radio: '1'

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

    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    // 点击标示
    click_row(e){
      return this.arr.map((item,index)=>{
       if(e===index){
         this.$set(item,'action',true)
       }else{
          this.$set(item,'action',false)
       }
      })
    },
    // 倒入excel
    importExcol(){
      
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.dialogVisible=false
      },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 开启接口
    startUsing(){
      level_openOrClose().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    // 创建题目
    creatTopic(){
      this.topicdialogVisible = true
      this.creatArr={score:10,
        topicName:'',
        result:[{
          resultName:'',
          defaultResult:''
        }]}
    },
    // 编辑
    editTopic(index){
      this.topIc=index
      this.edit=true
      this.topicdialogVisible = true
      this.creatArr=this.arrTopic[index]
       
    },
    // 增加答案条数
    addTopic(){
        this.creatArr.result.push({
          resultName:'',
          defaultResult:''
        })
    },
    delTopic(index){
      this.creatArr.result.splice(index, 1)
    },
    // 创建题目 点击  确定
    sure(){
      this.creatArr.checklist=this.creatArr.result.map((item,index)=>{
         item.index=index
        if(item.defaultResult){
          return item.index
        }
      })

       this.creatArr.checklist=this.creatArr.checklist.filter(function(val){
          return !(val === ""||val ===undefined);
        })

      this.arrTopic.push(this.creatArr)
      this.topicdialogVisible = false
    } ,
    // 编辑 点击确定
    editSure(arr){
       this.topicdialogVisible = false
      // this.arrTopic[this.topIc]=this.creatArr
      // this.arrTopic.splice()
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
 width: 250px;
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
