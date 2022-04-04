
import { drugs } from '../../table/drug.json';

export function resetReportState(report_state:{ [key: string]: number }){
    Object.keys(report_state).forEach((value:any, key:any) => {
        report_state[value] = 0;
    })
    return report_state;
}

export function modifyReportState(report_state:{ [key: string]: number },ltrBefore:string,ltrAfter:string, countModify:number){
    report_state[ltrAfter] += countModify
    report_state[ltrBefore] -= countModify
    return report_state
}

export function findDrugInListDrugs(drugLtr:string) {
    return drugs.find((drug) => drug.ltr === drugLtr);
}

export function countBatchPatients(prescription:{ [key: string]: any}){
    let counter = 0;

    Object.keys(prescription.disease).forEach((value:any, key:any) => {
        counter += prescription.disease[value]
    })
    return counter;
}
export function findCoupleDrugs(prescription:{ [key: string]: any}, mainDrug: string, sideEffect:string){
    return drugIsInDescr(prescription, mainDrug) 
    && drugIsInDescr(prescription,sideEffect)
}

export function drugIsInDescr(prescription:{ [key: string]: any}, mainDrug: string){
    return prescription.drugs.some((drug:string) => drug === mainDrug);
}