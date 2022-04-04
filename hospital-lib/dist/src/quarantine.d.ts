import { PatientsRegister } from '../src/patientsRegister';
export declare class Quarantine {
    list_patients: {
        [key: string]: number;
    };
    list_drugs: string | string[];
    prescription: {
        [key: string]: any;
    };
    final_state: {
        [key: string]: any;
    };
    constructor(patients: PatientsRegister);
    setDrugs(drugs: string): void;
    wait40Days(): void;
    report(): {
        [key: string]: any;
    };
}
