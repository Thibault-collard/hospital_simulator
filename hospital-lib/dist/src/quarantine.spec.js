"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuarantineTest = void 0;
const alsatian_1 = require("alsatian");
const quarantine_1 = require("./quarantine");
let QuarantineTest = class QuarantineTest {
    setup() {
        // The responsibility of the Quarantine object is to simulate diseases on a group of patients.
        // It is initialized with a list of patients' health status, separated by a comma.
        // Each health status is described by one or more characters
        // (in the test below, we will always have only one disease / patient)
        // The characters mean:
        // H : Healthy
        // F : Fever
        // D : Diabetes
        // T : Tuberculosis
        var sampleDataPayload = {
            list_patients: 'F,T,X,X,T,T,D,H,F'
        };
        this.quarantine = new quarantine_1.Quarantine(sampleDataPayload);
        // Quarantine provides medicines to the patients, but can not target a specific group of patient.
        // The same medicines are always given to all the patients.
        // Then Quarantine can provide a report that gives the number of patients that have the given disease.
        // X means Dead
    }
    formatedSetDrugs() {
        this.quarantine.setDrugs('As,I');
        (0, alsatian_1.Expect)(this.quarantine.list_drugs).toEqual(["As", "I"]);
        this.quarantine.setDrugs('');
        (0, alsatian_1.Expect)(this.quarantine.list_drugs).toEqual([]);
    }
    beforeTreatment() {
        (0, alsatian_1.Expect)(this.quarantine.list_patients).toEqual({
            F: 2, H: 1, D: 1, T: 3, X: 2
        });
    }
    drugsPrescription() {
        this.quarantine.setDrugs('As,I');
        this.quarantine.wait40Days();
        (0, alsatian_1.Expect)(this.quarantine.prescription).toEqual({ disease: { F: 2, H: 1, D: 1, T: 3, X: 2 }, drugs: ["As", "I"] });
    }
    noDrugsSetup() {
        this.quarantine.setDrugs('');
        this.quarantine.wait40Days();
        (0, alsatian_1.Expect)(this.quarantine.prescription).toEqual({ disease: { F: 2, H: 1, D: 1, T: 3, X: 2 }, drugs: [] });
    }
    noTreatment() {
        this.quarantine.setDrugs('');
        this.quarantine.wait40Days();
        this.quarantine.report();
        (0, alsatian_1.Expect)(this.quarantine.final_state).toEqual({ F: 2, H: 1, D: 0, T: 3, X: 3 });
    }
};
__decorate([
    alsatian_1.Setup
], QuarantineTest.prototype, "setup", null);
__decorate([
    (0, alsatian_1.Test)('List of drugs is well formated')
], QuarantineTest.prototype, "formatedSetDrugs", null);
__decorate([
    (0, alsatian_1.Test)('List of patients is well formated')
], QuarantineTest.prototype, "beforeTreatment", null);
__decorate([
    (0, alsatian_1.Test)('Wait 40 days : Drugs is administer to patients')
], QuarantineTest.prototype, "drugsPrescription", null);
__decorate([
    (0, alsatian_1.Test)('No drugs setup return empty array')
], QuarantineTest.prototype, "noDrugsSetup", null);
__decorate([
    (0, alsatian_1.Test)()
], QuarantineTest.prototype, "noTreatment", null);
QuarantineTest = __decorate([
    (0, alsatian_1.TestFixture)()
], QuarantineTest);
exports.QuarantineTest = QuarantineTest;
//# sourceMappingURL=quarantine.spec.js.map