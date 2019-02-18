<template>
    <div>
        <vue-virtical-table
        :config="tableConfig"
        :data="tableData">
        </vue-virtical-table>
    </div>
</template>

<script>
import VueVirtualTable from 'vue-virtual-table'
export default {
  components: {
    VueVirtualTable
  },
  data: {
    tableConfig: [
      {prop: 'user'},
      {prop: 'age'}
    ],
    tableData: [
      {user: 'a1', age: 20},
      {user: 'a2', age: 21},
      {user: 'a3', age: 23}
    ]
  }
}
</script>

<style>

</style>
