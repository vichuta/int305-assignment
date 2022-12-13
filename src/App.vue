<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div id="header">
    <h2>Cafe's Nice</h2>
    <RouterLink to="/query/1">1. List all members</RouterLink>
    <RouterLink to="/query/2">2. List all orders</RouterLink>
    <RouterLink to="/query/3">3. List all menus</RouterLink>
    <RouterLink to="/query/4">4. Find the average of all review menus</RouterLink>
    <RouterLink to="/query/5">5. View unpaid orders order by last date</RouterLink>
    <RouterLink to="/query/6">6. Menu price 30 or 35 baht</RouterLink>
    <RouterLink to="/query/7">7. View order with the most total_amount</RouterLink>
    <RouterLink to="/query/8">8. View menu in the coffee category and price less than 30</RouterLink>
    <RouterLink to="/query/9">9. View top 5 menus that have most sales</RouterLink>
    <RouterLink to="/query/10">10. View top 3 members with the highest number of orders</RouterLink>
  </div>
  <div id="detail">
    <RouterView />
  </div>
</template>

<style scoped>
a {
  display: block;
}
</style>
