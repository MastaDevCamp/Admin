<template>
<div>
    <!-- <v-toolbar flat color="white">
      <v-toolbar-title>삭제된 이벤트 목록</v-toolbar-title>
      <v-spacer></v-spacer>
      
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :expand="expand"
      item-key="name"
    >
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card flat>
          <v-card-text>Peek-a-boo!</v-card-text>
        </v-card>
      </template>
    </v-data-table> -->
  </div>
  </template>

<script>
 export default {
    // created() {

    // },
    // data () {
    //   return {
    //     expand: false,
    //     headers: [
    //       {
    //         text: '인덱스',
    //         align: 'left',
    //         sortable: false,
    //         value: 'notice_id'
    //       },
    //       { text: '타입', value: 'type' },
    //       { text: '종료일', value: 'finish_at' },
    //     ],
    //     noticeList: [
    //     ]
    //   }
    // }
  }
</script>

<style>

</style>
