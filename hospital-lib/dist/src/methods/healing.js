"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealingProcess = void 0;
const disease_json_1 = require("../../table/disease.json");
class HealingProcess {
    constructor() { }
    noTreatmentEffect(prescription) {
        /* disease:{F: 2, H: 1, D: 1, T: 3, X: 2},drugs:[]} */
        var report_state = { F: 0, H: 0, D: 0, T: 0, X: 0 };
        prescription.drugs.length == 0 ?
            Object.keys(prescription.disease).forEach((value, key) => {
                disease_json_1.diseases.filter((disease) => key == disease.ltr ?
                    disease.dieWithoutDrugs ?
                        report_state.X += value :
                        report_state[disease.ltr] = value
                    : '');
            }) : '';
        console.log(report_state);
        return report_state;
    }
}
exports.HealingProcess = HealingProcess;
//# sourceMappingURL=healing.js.map