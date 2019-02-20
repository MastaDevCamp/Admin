<template>
<div>
    <div class="headline text-xs-center pa-5">
        사용자 루비 충전 내역
    </div>
    <v-flex xs10 offset-xs1>
        <v-card-title>
            <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="rows"
          :search="search">
            <template slot="items" slot-scope="props">
                <td class="text-xs-left" nowrap width="200">
                    {{props.item.user}}
                </td>
                <td class="text-xs-left">{{}}</td>
            </template>
        </v-data-table>
    </v-flex>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
