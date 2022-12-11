<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div id="header">
    <h2>Reports</h2>
    <RouterLink to="/query/1">1. Cities with population &gt; 100000</RouterLink>
    <RouterLink to="/query/2">2. Cities in New York</RouterLink>
    <RouterLink to="/query/3">3. List cities in DC with population > 40000</RouterLink>
    <RouterLink to="/query/4">4. Count cities in DC</RouterLink> 
    <RouterLink to="/query/5">5. List cities in DC or cities with population > 100000</RouterLink>
    <RouterLink to="/query/6">6. List cities in DC and sort the cities by population</RouterLink> 
    <RouterLink to="/query/7">7. Show the total population in DC (state)</RouterLink> 
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
