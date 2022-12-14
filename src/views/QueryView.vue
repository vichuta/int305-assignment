<script setup>
import { ref, onMounted, watch } from "vue";
import { collection, query, where, getDocs, getDoc, doc, setDoc, limit, getCountFromServer, orderBy, increment } from "firebase/firestore";
import db from "../firebase/init.js";
import { useRoute } from "vue-router";
import ShowMembers from "../components/showMembers.vue"; 
import ShowOrders from "../components/showOrders.vue"; 
import ShowMenus from "../components/showMenus.vue"; 
import ShowAvgReview from "../components/showAvgReview.vue"; 
import ShowMenuNoReview from "../components/showMenuNoReview.vue"
import CRUDMenuReview from "../components/crudMenuReview.vue";

const route = useRoute();
const title = ref("")
const members = ref([]);
const orders = ref([]);
const menus = ref([])

const avgReview = ref(0)
async function getQuery() {
  let qryId = route.params.id;
  let qry = null;
  const membersRefs = collection(db, "members");
  const ordersRefs = collection(db, "orders");
  const menusRefs = collection(db, "menus");
  if (qryId == 1) {
    title.value = "All Members";
    members.value = [];
    qry = query(membersRefs);
    const querySnap = await getDocs(qry);
    querySnap.forEach( async (document) => {
      let data = document.data();
      data.id = document.id;

      // -- นับ order ของ member (ตอนนี้ได้แค่นับ order ทั้งหมด)
      const countOrders = await getCountFromServer(query(ordersRefs, where("member", "==", document.id)))
        await setDoc(doc(db,"members",document.id), {
            total_order : countOrders.data().count
        },{merge: true})

      members.value.push(data);
    })
    console.log(members.value)
  }
  else if (qryId == 2) {
    title.value = "All Orders";
    orders.value = [];
    qry = query(ordersRefs);
    const querySnap = await getDocs(qry);
    querySnap.forEach( async (document) => {
      let sum = 0
      let total = 0
      let data = document.data();
      data.id = document.id;

      //--เพิ่มชื่อ member ใน list all orders
      data.memberName = ""
      if(document.data().member!= ''){
        const docSnap = await getDoc(doc(db,"members",document.data().member)); //-- ส่ง id ไป search user มาทีละตัว
        if(docSnap.exists()){
          data.memberName = docSnap.data().firstname + ' ' + docSnap.data().lastname
        }
      }

      //--หาผลรวมของ ปริมาณสินค้าทั้งหมด และ ยอดรวม
      document.data().products.forEach((p)=>{
        sum = sum + p.quantity
        total = total + (p.quantity*p.price)
      })
      data.sumQuantity = sum

      //--เพิ่ม field total_amount ใน order (Computed Pattern)
      await setDoc(doc(db,"orders",document.id), {
          total_amount : total
      },{merge: true});  

      orders.value.push(data);
    })
   
    console.log(orders.value)
    
  }
  else if (qryId == 3) {
    title.value = "All Menus";
    menus.value = [];
    qry = query(menusRefs);
    const menuSnap = await getDocs(qry);
    menuSnap.forEach(async (m) => {
      let data = m.data();
      data.id = m.id;
// //-- get sub collection
      const revivewRef = collection(db,"menus", m.id, "reviews");
      qry = query(revivewRef, limit(10));
      const querySnapSubCollection = await getDocs(qry);
      data.reviews = []
      let sum = 0
      let count = 0
      querySnapSubCollection.forEach((rev) => {
        data.reviews.push(rev.data())
        sum = sum + rev.data().stars
      })
      //-- หาค่าเฉลี่ยของ stars
      const countReview = await getCountFromServer(revivewRef)
        count = countReview.data().count
        if(count !== 0){
          await setDoc(doc(db,"menus",m.id), {
            avg_reviews : (sum/count).toFixed(1)
          },{merge: true})
          data.avg_reviews = (sum/count).toFixed(1)
        };

// แบบที่ 2 

      // const revivewRef = collection(db,"menus", m.id, "reviews");
      // qry = query(revivewRef, limit(10));
      // onSnapshot((qry),async (snapshotComment) => {
      // data.reviews = []
      // let sum = 0
      // let count = 0
      // snapshotComment.docChange().forEach((change)=>{
      //   const change_review = {
      //     id:change.doc.id,
      //     ... change.doc.data()
      //   }
      //   const reviewIndex = data.reviews.findIndex((review)=> {
      //     review.id == change_review.id})
      //   if(change.type == 'added'){
      //     data.reviews.push(change_review)
      //   }else if(change.type == 'modified'){
      //     data.reviews[reviewIndex]=change_review
      //   }else if(change.type == 'removed'){
      //     data.splice=(reviewIndex,1)
      //   }
      // })
      // snapshotComment.forEach((rev) => {
      //   data.reviews.push(rev.data())
      //   sum = sum + rev.data().stars
      // })

      // //-- หาค่าเฉลี่ยของ stars
      // const countReview = await getCountFromServer(revivewRef)
      //   count = countReview.data().count
      //   if(count !== 0){
      //     await setDoc(doc(db,"menus",m.id), {
      //       avg_reviews : (sum/count).toFixed(1)
      //     },{merge: true})
      //     data.avg_reviews = (sum/count).toFixed(1)
      //   };
      
//-- set total_sales
      qry = query(ordersRefs, where('status', '==', true))
      const orderSnap = await getDocs(qry)
      let sumQuantity = 0
      await setDoc(doc(db,"menus",m.id), {
        total_sales : 0
      },{merge: true})
      orderSnap.forEach((ord)=>{
        ord.data().products.forEach( async(p1)=>{
            if(m.id == p1.name){
              sumQuantity = sumQuantity + p1.quantity
            }
          })
        })

        await setDoc(doc(db,"menus",m.id), {
          total_sales : sumQuantity
        },{merge: true})
      
        menus.value.push(data);
      })
    
    console.log(menus.value)
  }
  else if(qryId == 4){
    title.value = "Average all reviews"
    let countAll = 0
    let sumAll = 0
    qry = query(menusRefs);
    const querySnap = await getDocs(qry);
    
    querySnap.forEach(async (document) => {

      const revivewRef = collection(db,"menus", document.id, "reviews");
      const countReview = await getCountFromServer(revivewRef)
      countAll = countAll + countReview.data().count

      const querySnapSubCollection = await getDocs(revivewRef);
      
      if(countAll !== 0){
        querySnapSubCollection.forEach((rev) => {
          sumAll = sumAll + rev.data().stars
        })}
        avgReview.value = (sumAll/countAll).toFixed(1)
      });
  }
  else if(qryId == 5){
    title.value = "Order Unpaid"
    orders.value = []
    qry = query(ordersRefs, where('status', '==',false))
    const querySnap = await getDocs(qry)
     querySnap.forEach( async (document) => {
      let sum = 0
      let total = 0
      let data = document.data();
      data.id = document.id;

      //--เพิ่มชื่อ member ใน list all orders
      data.memberName = "-"
      if(document.data().member!= ''){
        const docSnap = await getDoc(doc(db,"members",document.data().member)); //-- ส่ง id ไป search user มาทีละตัว
        if(docSnap.exists()){
          data.memberName = docSnap.data().firstname + ' ' + docSnap.data().lastname
        }
      }

      //--หาผลรวมของ ปริมาณสินค้าทั้งหมด และ ยอดรวม
      document.data().products.forEach((p)=>{
        sum = sum + p.quantity
        total = total + (p.quantity*p.price)
      })

      data.sumQuantity = sum

      orders.value.push(data);
    })
  }
  else if(qryId == 6){
    title.value = "Menu price 30 or 35";
    menus.value = [];
    let qry1 = query(menusRefs, where('price', '==',30));
    let qry2 = query(menusRefs, where('price', '==',35));
    const querySnap1 = await getDocs(qry1);
    querySnap1.forEach(async (document) => {
      let data1 = document.data();
      data1.id = document.id;
      menus.value.push(data1)
    })
    const querySnap2 = await getDocs(qry2);
    querySnap2.forEach(async (document) => {
      let data2 = document.data();
      data2.id = document.id;
      menus.value.push(data2)
    })
    console.log(menus.value)
  }
  else if(qryId==7){
    title.value = "Order max total amount"
    orders.value = [];
    qry = query(ordersRefs, orderBy('total_amount', 'desc'), limit(1))
    const querySnap = await getDocs(qry)
    querySnap.forEach( async (document) => {
      let sum = 0
      let total = 0
      let data = document.data();
      data.id = document.id;

      //--เพิ่มชื่อ member ใน list all orders
      data.memberName = ""
      if(document.data().member!= ''){
        const docSnap = await getDoc(doc(db,"members",document.data().member)); //-- ส่ง id ไป search user มาทีละตัว
        if(docSnap.exists()){
          data.memberName = docSnap.data().firstname + ' ' + docSnap.data().lastname
        }
      }

      //--หาผลรวมของ ปริมาณสินค้าทั้งหมด และ ยอดรวม
      document.data().products.forEach((p)=>{
        sum = sum + p.quantity
        total = total + (p.quantity*p.price)
      })
      data.sumQuantity = sum

      orders.value.push(data);
    })
    console.log(orders.value)
  }
  else if(qryId==8){
    title.value = "Menu coffee and price less than 30 bath"
    menus.value = []
    let qry = query(menusRefs, where('category', '==','coffee'), where('price', '<', 30));
    const querySnap = await getDocs(qry);
    querySnap.forEach(async (document) => {
      let data = document.data();
      data.id = document.id;
      menus.value.push(data)
    })
    console.log(menus.value)
  }
  else if(qryId==9){
    title.value = "Top 5 menu maximum total sales"
    menus.value = []

    qry = query(menusRefs, orderBy('total_sales','desc'), limit(5))
    const menuTopSnap = await getDocs(qry)
    menuTopSnap.forEach( (document)=>{
      let data = document.data();
      data.id = document.id;
      menus.value.push(data)
    })
    console.log(menus.value)
  }
  else if(qryId==10){
    title.value = "Top 3 members maximum total orders"
    members.value = []
    qry = query(membersRefs, orderBy('total_order','desc'), limit(3))
    const querySnap = await getDocs(qry)
    querySnap.forEach((document)=>{
      let data = document.data();
      data.id = document.id;
      members.value.push(data)
    })
  }
  else if(qryId==11){
    title.value = "Add/ Modified/ Delete Review (Menu in milk category)"
    menus.value = []
    qry = query(menusRefs, where('category', "==", 'milk'));
    const menuSnap = await getDocs(qry);
    menuSnap.forEach(async (m) => {
      let data = m.data();
      data.id = m.id;
// //-- get sub collection
      const revivewRef = collection(db,"menus", m.id, "reviews");
      qry = query(revivewRef, limit(10));
      const querySnapSubCollection = await getDocs(qry);
      data.reviews = []
      let sum = 0
      let count = 0
      querySnapSubCollection.forEach((rev) => {
        let data_review = rev.data()
        data_review.id = rev.id
        data.reviews.push(data_review)
        sum = sum + rev.data().stars
      })
      //-- หาค่าเฉลี่ยของ stars
      const countReview = await getCountFromServer(revivewRef)
        count = countReview.data().count
        if(count !== 0){
          await setDoc(doc(db,"menus",m.id), {
            avg_reviews : (sum/count).toFixed(1)
          },{merge: true})
          data.avg_reviews = (sum/count).toFixed(1)
        };

//-- set total_sales
      qry = query(ordersRefs, where('status', '==', true))
      const orderSnap = await getDocs(qry)
      let sumQuantity = 0
      await setDoc(doc(db,"menus",m.id), {
        total_sales : 0
      },{merge: true})
      orderSnap.forEach((ord)=>{
        ord.data().products.forEach( async(p1)=>{
            if(m.id == p1.name){
              sumQuantity = sumQuantity + p1.quantity
            }
          })
        })

        await setDoc(doc(db,"menus",m.id), {
          total_sales : sumQuantity
        },{merge: true})
      
        menus.value.push(data);
      })
    
    console.log(menus.value)
  }
 
}

watch(() => route.params.id, getQuery);

onMounted(() => {
  getQuery();
});
</script>
<template>
  <ShowMembers v-if="route.params.id==1 || route.params.id==10" :title="title" :members="members"/>
  <ShowOrders v-else-if="route.params.id==2 || route.params.id == 5 || route.params.id == 7" :title="title" :orders="orders"/>
  <ShowMenus v-else-if="route.params.id==3 " :title="title" :menus="menus"/>
  <ShowAvgReview v-else-if="route.params.id==4" :title="title" :avg="avgReview"/>
  <ShowMenuNoReview v-else-if="route.params.id == 6 || route.params.id == 8 || route.params.id == 9 " :title="title" :menus="menus"/>
  <CRUDMenuReview v-else-if="route.params.id == 11" :title="title" :menus="menus" @reload-query="getQuery"/>
</template>

<style></style>
