<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div id="header">
    <h2>Cafe's Nice</h2>
    <RouterLink to="/query/1">1. List all members</RouterLink>
    <RouterLink to="/query/2">2. List all orders</RouterLink>
    <RouterLink to="/query/3">3. List all menus</RouterLink>
    <RouterLink to="/query/4">4. หาเคลี่ยของ review menus ทั้งหมด</RouterLink>
    <RouterLink to="/query/5">5. ดู order ที่ยังไม่จ่าย โดย order by date ล่าสุด--> เก่าสุด</RouterLink>
    <RouterLink to="/query/6">6. ดู menu ที่มีราคา 30 หรือ 35 บาท</RouterLink>
    <RouterLink to="/query/7">7. ดู order ที่มียอด total_amount มากที่สุด</RouterLink>
    <RouterLink to="/query/8">8. ดู menu ที่อยู่ในหมวดหมู่กาแฟ และ ราคา น้อยกว่า 30</RouterLink>
    <RouterLink to="/query/9">9. ดู menu 3 แรกที่มียอดขายมากที่สุด</RouterLink>
    <RouterLink to="/query/10">10. ดู member ที่มียอดการสั่งซื้อมากที่สุด</RouterLink>
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
