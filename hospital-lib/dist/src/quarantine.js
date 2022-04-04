"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quarantine = void 0;
const disease_json_1 = require("../table/disease.json");
const healing_1 = require("./methods/healing");
class Quarantine {
    constructor(patients) {
        this.list_patients = {};
        this.prescription = {};
        this.final_state = {};
        disease_json_1.diseases.forEach((disease) => {
            const disease_count = patients.list_patients.split(',').filter((patient) => patient == disease.ltr);
            this.list_patients[disease.ltr] = disease_count.length;
        });
    }
    setDrugs(drugs) {
        drugs.length > 0 ?
            this.list_drugs = drugs.split(',') :
            this.list_drugs = [];
    }
    wait40Days() {
        this.prescription = { disease: this.list_patients, drugs: this.list_drugs };
    }
    report() {
        const test = new healing_1.HealingProcess();
        this.final_state = test.noTreatmentEffect(this.prescription);
        return this.final_state;
    }
}
exports.Quarantine = Quarantine;
//# sourceMappingURL=quarantine.js.map