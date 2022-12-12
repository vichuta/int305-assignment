<script setup>
import IconStarFull from './icons/iconStarFull.vue'
import IconStarEmpty from './icons/iconStarEmpty.vue'
import IconStarHalf from './icons/iconStarHalf.vue';
defineProps({
  title: {
    type: String,
    required: true,
  },
  menus:{
    type: Array,
    required: true
  }
});

const showStarEmpty = (avg) =>{
  if((Math.floor(avg)-avg).toFixed(1)!=0){
    return 4-parseInt(avg)
  }else{
    return 5-parseInt(avg)
  }
}
</script>

<template>
    <h2>{{ title }}</h2>
    <div v-for="(menu, index) in menus" :key="menu.id" class="box">
        <h3 style="text-align: center;">{{menu.id}}</h3>
        <div><b>price : </b>{{menu.price}}</div>
        <div><b>category : </b>{{menu.category}}</div>
        
      <hr/>
        <!-- Review -->
        <div v-if="menu.avg_reviews" class="box-reviews">
          <h4>Customer reviews</h4>
          ({{menu.avg_reviews}}) 
          <IconStarFull v-for="num in parseInt(menu.avg_reviews)"/> 
          <IconStarHalf v-show="(Math.floor(menu.avg_reviews)-menu.avg_reviews).toFixed(1)!=0"/>
          <IconStarEmpty v-for="num in showStarEmpty(menu.avg_reviews)"/> 
        </div>
        <div v-else class="box-reviews">-- No reviews --</div>
    </div>
</template>

<style scoped>
.box{
    border: 1px solid;
    padding: 1.5em;
    margin: 1em;
    width: 100%;
}
.box-reviews{
  padding: 0.5em;
  margin: 0.5em;
  text-align: center;
}
.box-review{
  border: 1px solid;
  padding: 0.5em;
  margin: 0.5em;
}
.order-table{
  width: 100%;
}
</style>