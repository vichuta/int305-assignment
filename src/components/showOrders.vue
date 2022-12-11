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
</script>

<template>
    <h2>{{ title }}</h2>
    <div v-for="(order) in orders" :key="order.id" class="box">
        <div><b>Order ID : </b>{{order.id}}</div>
        <div><b>date : </b>{{order.date.toDate()}}</div>
        <div><b>member : </b>{{order.member}}</div>
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
            <td style="text-align: right;">{{product.price}}</td>
          </tr>
          <tr>
            <td>Total bath</td>
            <td></td>
            <td></td>
          </tr>
        </table>
    </div>
</template>

<style scoped>
.box{
    border: 1px black solid;
    padding: 1.5em;
    margin: 1em;
}
.order-table{
  width: 100%;
}
</style>