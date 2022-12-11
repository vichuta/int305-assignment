<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div id="header">
    <h2>Cafe's Nice</h2>
    <RouterLink to="/query/1">1. List all members</RouterLink>
    <RouterLink to="/query/2">2. List all orders</RouterLink>
    <RouterLink to="/query/3">3. List all munus</RouterLink>
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
