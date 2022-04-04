import { diseases } from '../../table/disease.json';

export function formatDrugs(drugs:string){
    var list_drugs:string[] = []
    drugs.length > 0 ?
    list_drugs = drugs.split(','):
    list_drugs = []
    return list_drugs
}

export function formatPatients(patients:string){

    var list_patients:{ [key: string]: any} = {F: 0, H: 0, D: 0, T: 0, X: 0}
    diseases.forEach((disease:{ [key: string]: any}) => {
        var disease_count = patients.split(',').filter(
            (patient:string) => patient == disease.ltr
        )
        list_patients[disease.ltr] = disease_count.length
    })
    return list_patients;
}