<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  orders:{
    type: Array,
    required: true
  }
});

const formatDate = (date) => {
  let datetime = new Date(date)
  if(datetime != 'Invalid Date'){
      const date = datetime.getDate()
      const month = datetime.getMonth()
      const year = datetime.getFullYear()
      return date + '/' + month + '/' + year + ' ' + datetime.toLocaleTimeString('th-TH').substring(0,5)
    }
}
</script>

<template>
    <h2>{{ title }}</h2>
    <div v-for="(order) in orders" :key="order.id" class="box">
        <div><b>ORDER ID : </b>{{order.id}}</div>
        <div><b>DATE : </b>{{formatDate(order.date.toDate())}}</div>
        <div><b>MEMBER ID : </b>{{order.member}} {{order.memberName}}</div>
        <div><b>STATUS : </b>
          <span v-if="order.status==true" style="color: green;">paid</span>
          <span v-else style="color: red;">unpaid</span>
        </div>
        <hr/>
        <h4>Products</h4>
        <table border="1" class="order-table">
          <tr>
            <th>name</th>
            <th>quantity</th>
            <th>price</th>
          </tr>
          <tr v-for="(product, index) in order.products" :key="index">
            <td>{{product.name}}</td>
            <td style="text-align: center;">{{product.quantity}}</td>
            <td style="text-align: right;">{{product.price*product.quantity}}</td>
          </tr>
          <tr>
            <th>Total </th>
            <th style="text-align: center;">{{order.sumQuantity}}</th>
            <th style="text-align: right;">{{order.total_amount}}</th>
          </tr>
        </table>
    </div>
</template>

<style scoped>
.box{
    border: 1px solid;
    padding: 1.5em;
    margin: 1em;
}
.order-table{
  width: 100%;
}
</style>