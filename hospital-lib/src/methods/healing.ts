import { diseases } from '../../table/disease.json';
import * as ut from './utils'

export function healingProcess(prescription:{ [key: string]: any}) {
  
  // init a copy of the list of patients to store initial state. this list will be updated after treatment
  var report_state:{ [key: string]: number } = prescription.disease

  function noTreatmentEffect(prescription:{ [key: string]: any}) {
      //Iterate through disease list to find if patient can die without treatment
      Object.keys(prescription.disease).forEach((value:any, key:any) => {
        diseases.filter(
                  (disease) => value == disease.ltr ? disease.dieWithoutDrugs ? 
                  ut.modifyReportState(report_state,'D', 'X', prescription.disease['D'])
                  :'':''
          )
        })
      return report_state;
  }

  function getEffects(prescription:{ [key: string]: any}){

      Object.keys(prescription.drugs).forEach((value:any, key:any) => {
        // Avoid redundance of using function findDrugInListDrugs
        var drugProp = ut.findDrugInListDrugs(prescription.drugs[value])
        // Rules causing global death take precendence over others 
        if(ut.findCoupleDrugs(prescription,'As','P')){
          mortalDrugCocktail(prescription)
        }
        else{
          // Developing side effects of drugs association
          if(ut.findCoupleDrugs(prescription,prescription.drugs[value],drugProp.mixDrugs.mixedWithDrugltr)){
            ut.modifyReportState(report_state,drugProp.state_after, drugProp.mixDrugs.newStateltr, prescription.disease[drugProp.state_after])
          }
          // Developing good effect of drug 
          ut.modifyReportState(report_state,drugProp.efficient_for, drugProp.state_after, prescription.disease[drugProp.efficient_for])
        }
        // Description Modify report state : report state, from old state, with new state depending on side effect or not, take number of people to modify
      })
    return report_state;
  }

  function mortalDrugCocktail(prescription:{ [key: string]: any}){
    //Count total patients and then setup all value to zero except the number of dead which is equal to total patients
    let patientsKilled = ut.countBatchPatients(prescription)
    report_state = ut.resetReportState(report_state)
    report_state['X'] = patientsKilled
    
    return report_state
  }

  prescription.drugs.length==0 ?
  noTreatmentEffect(prescription):
  getEffects(prescription)
  return report_state
}