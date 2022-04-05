import { PatientsRegister } from '../src/patientsRegister'
import {healingProcess} from './methods/healing'
import {formatDrugs, formatPatients} from './methods/formatInput'

export class Quarantine {
    list_patients: ({ [key: string]: any})
    list_drugs: string|string[];
    prescription: { [key: string]: any} = {};
    final_state: { [key: string]: any} = {F: 0, H: 0, D: 0, T: 0, X: 0}
    
    constructor(patients: PatientsRegister) {
        this.list_patients = formatPatients(patients.list_patients)
    }

    public setDrugs(drugs: string): void{
        this.list_drugs = formatDrugs(drugs)
    }

    public wait40Days(): void {
        this.prescription = {disease : this.list_patients, drugs : this.list_drugs}
    }
    public report(): PatientsRegister  {
        return this.final_state = healingProcess(this.prescription)
    }
}