<script setup>
import { ref, onMounted, watch } from "vue";
import { collection, query, where, getDocs, limit, getCountFromServer, orderBy } from "firebase/firestore";
import db from "../firebase/init.js";
import { useRoute } from "vue-router";
import Documents from "../components/Documents.vue"; 
import ShowCount from "../components/showCount.vue"; 
import ShowMembers from "../components/showMembers.vue"; 
import ShowOrders from "../components/showOrders.vue"; 
import ShowMenus from "../components/showMenus.vue"; 
import { async } from "@firebase/util";

const route = useRoute();
const title = ref("")
const members = ref([]);
const orders = ref([]);
const menus = ref([])
// const count = ref(0);
// const sum = ref(0);
// const state = {};

async function getQuery() {
  let qryId = route.params.id;
  
  

  // orders.showCount = false
  // state.queryOR = false
  // state.showSum = false
  let qry = null;
  // let qry1 = null;
  // let qry2 = null;
  const membersRefs = collection(db, "members");
  const ordersRefs = collection(db, "orders");
  const menusRefs = collection(db, "menus");
  if (qryId == 1) {
    title.value = "All Members";
    members.value = [];
    qry = query(membersRefs);
    const querySnap = await getDocs(qry);
    querySnap.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      members.value.push(data);
    })
    console.log(members.value)
  }
  if (qryId == 2) {
    title.value = "All Orders";
    orders.value = [];
    qry = query(ordersRefs);
    const querySnap = await getDocs(qry);
    querySnap.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      orders.value.push(data);
    })
    console.log(orders.value)
  }
  if (qryId == 3) {
    title.value = "All Menus";
    menus.value = [];
    qry = query(menusRefs);
    const querySnap = await getDocs(qry);
    querySnap.forEach(async (doc) => {
      let data = doc.data();
      data.id = doc.id;

      const revivewRef = collection(db,"menus", doc.id, "reviews");
      qry = query(revivewRef);
      const querySnapSubCollection = await getDocs(qry);
      data.reviews = []
      querySnapSubCollection.forEach((rev) => {
        data.reviews.push(rev.data())
      })
      menus.value.push(data);
    })
  }  
  // else if (qryId == 2) {
  //   title.value = "Cities in New York";
  //   const zipsRef = collection(db, "zips");
  //   qry = query(zipsRef, where("state", "==", "NY"), limit(10));
  // } else if (qryId == 3) {
  //   title.value = "List cities in DC with population > 40000";
  //   const zipsRef = collection(db, "zips");
  //   qry = query(zipsRef, where("state", "==", "DC"),where("pop",">",40000));
  // } else if (qryId == 4) {
  //   state.showCount = true
  //   title.value = "Count cities in DC";
  //   const zipsRef = collection(db, "zips");
  //   qry = query(zipsRef, where("state", "==", "DC"));
  //   const snapshot = await getCountFromServer(qry)
  //   count.value = snapshot.data().count
  // } else if (qryId == 5) {
  //   state.queryOR = true
  //   title.value = "List cities in DC or cities with population > 100000";
  //   const zipsRef = collection(db, "zips");
  //   qry1 = query(zipsRef, where("state", "==", "DC"));
  //   qry2 = query(zipsRef, where("pop", ">", 100000));
  // } else if(qryId == 6){
  //   title.value = "List cities in DC and sort the cities by population";
  //   const zipsRef = collection(db, "zips");
  //   qry = query(zipsRef, where("state", "==", "DC"), orderBy("pop"));
  // } else if(qryId == 7){
  //   state.showSum = true
  //   title.value = "Show the total population in DC (state)";
  //   const zipsRef = collection(db, "zips");
  //   qry = query(zipsRef, where("state", "==", "DC"));
  // }
  
  // if(state.showCount){
  //   const querySnap = await getCountFromServer(qry)
  //   count.value = querySnap.data().count
  // }else if(state.queryOR){
  //   const querySnap1 = await getDocs(qry1);
  //   querySnap1.forEach((doc) => {
  //     let data1 = doc.data();
  //     data1.id = doc.id;
  //     zips.value.push(data1);
  //   });
  //   const querySnap2 = await getDocs(qry2);
  //   querySnap2.forEach((doc) => {
  //     let data2 = doc.data();
  //     data2.id = doc.id;
  //     zips.value.push(data2);
  //   });
  // }else if(state.showSum){
  //   sum.value = 0;
  //   const querySnap = await getDocs(qry);
  //   querySnap.forEach((doc) => {
  //     let data = doc.data();
  //     sum.value = sum.value + data.pop;
  //   });
  // }else{
  //   const querySnap = await getDocs(qry);
  //   querySnap.forEach((doc) => {
  //     let data = doc.data();
  //     data.id = doc.id;
  //     zips.value.push(data);
  //   });
  // }
}

watch(() => route.params.id, getQuery);

onMounted(() => {
  getQuery();
});
</script>
<template>
  <!-- <ShowCount v-if="state.showCount" :title="title" :data="count"/>
  <ShowCount v-else-if="state.showSum" :title="title" :data="sum"/>
  <Documents v-else :title="title" :data="zips"/> -->
  <ShowMembers v-if="route.params.id==1" :title="title" :members="members"/>
  <ShowOrders v-else-if="route.params.id==2" :title="title" :orders="orders"/>
  <ShowMenus v-else-if="route.params.id==3" :title="title" :menus="menus"/>
</template>

<style></style>
