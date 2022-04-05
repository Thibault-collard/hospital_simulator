<template>

  <nav class="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
   <a class="navbar-brand" href="/"><img style="margin-left:30px" width="170" src="../assets/Simu-medic.png"></a>
   
 
   <div class="" id="navbarSupportedContent">
     <ul class="navbar-nav mr-auto">
       <li class="nav-item active">
         <a class="nav-link" @click="refreshData()">
           <i class="fa fa-refresh"></i>
           Refresh data
           <span class="sr-only">(current)</span>
           </a>
       </li>
       <li class="nav-item">
         <a class="nav-link"  @click="adminDrugs()">
           <i class="fa fa-plus-square "></i>
           Administer drugs
         </a>
       </li>
       </ul>
     
   </div>
 </nav>

</template>
<script>

import '../style/App.css';

export default {
    methods: {
        refreshData() {
            this.$emit('update-data')
        },
        adminDrugs() {
            this.$emit('adminDrugs')
        },
    }
}
</script>