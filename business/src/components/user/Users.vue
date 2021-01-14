<template>
  <div>

    <!--  面包屑导航区域  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域   -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!--  用户列表区域    -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="userName"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="roleName"></el-table-column>
        <el-table-column label="状态" prop="mgState">
          <template slot-scope="scope">
<!--            {{scope.row}}-->
            <el-switch v-model="scope.row.mgState"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190px">
          <template slot-scope="scope">

            <el-tooltip effect="dark" content="编辑角色" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            </el-tooltip>

            <el-tooltip effect="dark" content="删除角色" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </el-tooltip>


            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>

          </template>
        </el-table-column>

      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryInfo.pageNum"
        :page-sizes="[1,2,5,10]"
        :page-size="queryInfo.pageSize"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '123',
        pageNum: 1,
        pageSize: 4
      },
      userList: [],
      total: 0 ,
    }
  },
  created () {
    this.getUserList();
  },
  methods: {
    async getUserList() {
       const{data : res} =  await this.$http.get('/api/users', {params : this.queryInfo})
        if(res.meta.status !== 200){
          return this.$message.error('获取用户列表失败！')
        }
        console.log(res)
        this.userList = res.data.users ;
        this.total = res.data.total ;
    },

    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize
      this.getUserList()
    },

    // 监听页码值改变值
    handleCurrentChange(newPage){
      console.log(newPage)
      this.queryInfo.pageNum = newPage
      this.getUserList()
    },


  }
}
</script>

<style scoped lang="less">

</style>
