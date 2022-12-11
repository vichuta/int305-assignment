<script setup>
import { ref, onMounted, watch } from "vue";
import { collection, query, where, getDocs, limit, getCountFromServer, orderBy } from "firebase/firestore";
import db from "../firebase/init.js";
import Documents from "../components/Documents.vue"; 
import ShowCount from "../components/showCount.vue"; 
import { useRoute } from "vue-router";

const zips = ref([]);
const title = ref("");
const route = useRoute();
const count = ref(0);
const sum = ref(0);
const state = {};

async function getQuery() {
  let qryId = route.params.id;
  zips.value = [];
  state.showCount = false
  state.queryOR = false
  state.showSum = false
  let qry = null;
  let qry1 = null;
  let qry2 = null;
  if (qryId == 1) {
    title.value = "Cities with population > 100000";
    const zipsRef = collection(db, "zips");
    qry = query(zipsRef, where("pop", ">", 100000));
  } else if (qryId == 2) {
    title.value = "Cities in New York";
    const zipsRef = collection(db, "zips");
    qry = query(zipsRef, where("state", "==", "NY"), limit(10));
  } else if (qryId == 3) {
    title.value = "List cities in DC with population > 40000";
    const zipsRef = collection(db, "zips");
    qry = query(zipsRef, where("state", "==", "DC"),where("pop",">",40000));
  } else if (qryId == 4) {
    state.showCount = true
    title.value = "Count cities in DC";
    const zipsRef = collection(db, "zips");
    qry = query(zipsRef, where("state", "==", "DC"));
    const snapshot = await getCountFromServer(qry)
    count.value = snapshot.data().count
  } else if (qryId == 5) {
    state.queryOR = true
    title.value = "List cities in DC or cities with population > 100000";
    const zipsRef = collection(db, "zips");
    qry1 = query(zipsRef, where("state", "==", "DC"));
    qry2 = query(zipsRef, where("pop", ">", 100000));
  } else if(qryId == 6){
    title.value = "List cities in DC and sort the cities by population";
    const zipsRef = collection(db, "zips");
    qry = query(zipsRef, where("state", "==", "DC"), orderBy("pop"));
  } else if(qryId == 7){
    state.showSum = true
    title.value = "Show the total population in DC (state)";
    const zipsRef = collection(db, "zips");
    qry = query(zipsRef, where("state", "==", "DC"));
  }
  
  if(state.showCount){
    const querySnap = await getCountFromServer(qry)
    count.value = querySnap.data().count
  }else if(state.queryOR){
    const querySnap1 = await getDocs(qry1);
    querySnap1.forEach((doc) => {
      let data1 = doc.data();
      data1.id = doc.id;
      zips.value.push(data1);
    });
    const querySnap2 = await getDocs(qry2);
    querySnap2.forEach((doc) => {
      let data2 = doc.data();
      data2.id = doc.id;
      zips.value.push(data2);
    });
  }else if(state.showSum){
    sum.value = 0;
    const querySnap = await getDocs(qry);
    querySnap.forEach((doc) => {
      let data = doc.data();
      sum.value = sum.value + data.pop;
    });
  }else{
    const querySnap = await getDocs(qry);
    querySnap.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      zips.value.push(data);
    });
  }
}

watch(() => route.params.id, getQuery);

onMounted(() => {
  getQuery();
});
</script>
<template>
  <ShowCount v-if="state.showCount" :title="title" :data="count"/>
  <ShowCount v-else-if="state.showSum" :title="title" :data="sum"/>
  <Documents v-else :title="title" :data="zips"/>
</template>

<style></style>
