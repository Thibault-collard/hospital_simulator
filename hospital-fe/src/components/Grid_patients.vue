<template>
    <NavSimu @update-data="loadPatients" @adminDrugs='adminDrugs'></NavSimu>
    <div class="container" style='margin:0;padding:0'>
        <div class='row'>
            <div class='col-sm-7'>
                <table-lite
                :is-loading="table.isLoading"
                :columns="table.columns"
                :rows="table.rows"
                :total="table.totalRecordCount"
                :messages="table.messages"
                @do-search="doSearch"
                @is-finished="table.isLoading = false"
            >
            </table-lite>
            </div>
            <div class='col-sm-5'>
                <h5 style='text-align:center;margin-top:10px'>Last 10 simulations :</h5>
                <p>{{ localStore }}</p>
            </div>
        </div>
    </div>
    
</template>

<script>
import { defineComponent, reactive } from "vue";
const axios = require('axios');
const faker = require('faker');
import TableLite from './TableLite.vue';
import NavSimu from './NavSimu.vue'
import {Quarantine} from 'hospital-lib';
import { diseases } from '../../../hospital-lib/table/disease.json';
import { drugs } from '../../../hospital-lib/table/drug.json';
import { ref } from 'vue'

export default defineComponent({
  name: "App",
  components: { TableLite,
    NavSimu },
    setup() {

    var quarantine;
    var initial_state_patients = ref('');
    var final_state_patients = ref('');
    var localStore = ref(Object.keys(localStorage).map(k => localStorage.getItem(k)).toString())
    var newSimu = true;

    const sampleData1 = () => {
        let data = [];
            if(quarantine.list_patients){
                let counter = 0;
                let drug_list = []

                for (let j=0; j < quarantine.list_drugs.length;j++){
                    let drug = drugs.find((drug) => drug.ltr == quarantine.list_drugs[j])
                    drug_list.push(drug.name)
                }

                Object.keys(quarantine.list_patients).forEach((quar) =>{
                    for (let j=0; j < quarantine.list_patients[quar];j++){
                        let disease = diseases.find((disease) => quar === disease.ltr);

                        data.push({
                            id: counter+=1,
                            firstname: faker.name.firstName(),
                            lastname: faker.name.lastName(),
                            disease: disease.name,
                            drugs: drug_list.join(', ')
                        });
                    }
                })
                return data;
            }
        };
    const table = reactive({
      isLoading: false,
      columns: [
        {
          label: "ID",
          field: "id",
          width: "1%"
        },
        {
          label: "Firstname",
          field: "firstname",
          width: "5%"
        },
        {
          label: "Lastname",
          field: "lastname",
          width: "5%"
        },
        {
          label: "Disease",
          field: "disease",
          width: "5%"
        },
        {
          label: "Drugs",
          field: "drugs",
          width: "5%",
        }
      ],
      rows: [],
      totalRecordCount: 0,
    });

    const adminDrugs = () => {
        if(newSimu){
            quarantine.wait40Days()
            initial_state_patients.value = JSON.stringify(quarantine.list_patients).replace(/'/g, "''")
            quarantine.report()
            final_state_patients.value = JSON.stringify(quarantine.final_state).replace(/'/g, "''")
            if(Object.keys(localStorage).length == 10){
                localStorage.removeItem(localStorage.key(0))
            }
            localStorage.setItem(Date.now(), `${initial_state_patients.value} : ${final_state_patients.value}`) 
            localStore.value = Object.keys(localStorage).map(k => localStorage.getItem(k)).toString()  
            newSimu = false        
        }
    }
    const loadPatients = () => {
        axios.get('/patients')
        .then(function (response) {
            return quarantine = new Quarantine({list_patients: response.data})
        })
        .then(()=>{
            axios.get('/drugs')
            .then(function (response) {
                return quarantine.setDrugs(response.data)
            }).then(function () {
            doSearch(0, 10);
            });
        })
        newSimu = true
    }

    const doSearch = (offset, limit) => {
      table.isLoading = true;
        table.isReSearch = offset == undefined ? true : false;
        if (offset >= 10 || limit >= 20) {
          limit = 20;
        }
        table.rows = sampleData1();
        table.totalRecordCount = 20;
        table.init_state = initial_state_patients;
        table.final_state = final_state_patients;
    };
    return {
        table,
        loadPatients,
        doSearch,
        adminDrugs,
        quarantine,
        initial_state_patients,
        final_state_patients,
        localStore
    }
    }
});
</script>