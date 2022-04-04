import {Expect, Setup, Test, TestFixture} from 'alsatian';
import {Quarantine} from './quarantine';

@TestFixture()
export class QuarantineTest {

  private quarantine: Quarantine;

  @Setup
  public setup() {
    var sampleDataPayload = {
      list_patients: 'F,T,X,X,T,T,D,H,F'
   }
    this.quarantine = new Quarantine(sampleDataPayload);
  }

  @Test('List of drugs is well formated')
  public formatedSetDrugs(): void {
    this.quarantine.setDrugs('As,I');
    Expect(this.quarantine.list_drugs).toEqual(["As","I"]);
  }

  @Test('List of patients is well formated')
  public beforeTreatment(): void {
    Expect(this.quarantine.list_patients).toEqual({
      F: 2, H: 1, D: 1, T: 3, X: 2
    });
  }

  @Test('Wait 40 days : Drugs is administer to patients')
  public drugsPrescription(): void {
    this.quarantine.setDrugs('As,I');
    this.quarantine.wait40Days();
    Expect(this.quarantine.prescription).toEqual(
      {disease:{F: 2, H: 1, D: 1, T: 3, X: 2},drugs:["As","I"]}
    );
  }

  @Test('No drugs setup return empty array')
  public noDrugsSetup(): void {
    this.quarantine.setDrugs('');
    this.quarantine.wait40Days();
    Expect(this.quarantine.prescription).toEqual(
      {disease:{F: 2, H: 1, D: 1, T: 3, X: 2},drugs:[]}
    );
  }

  @Test('No drugs kill diabetes subjects')
  public noTreatment(): void {
    this.quarantine.setDrugs('');
    this.quarantine.wait40Days();
    Expect(this.quarantine.report()).toEqual({F: 2, H: 1, D: 0, T: 3, X: 3});
  }

  @Test('Mixed paracetamol and aspirin kill everybody')
  public paracetamolAndAspirin(): void {
    this.quarantine.setDrugs('P,As');
    this.quarantine.wait40Days();
    Expect(this.quarantine.report()).toEqual({
      F: 0, H: 0, D: 0, T: 0, X: 9
    });
  }

  @Test('Aspirin cures fever')
  public aspirin(): void {
    this.quarantine.setDrugs('As');
    this.quarantine.wait40Days();
    Expect(this.quarantine.report()).toEqual({
      F: 0, H: 3, D: 1, T: 3, X: 2
    });
  }

  @Test('Antibiotic cures tuberculoses')
  public antibiotic(): void {
    this.quarantine.setDrugs('An');
    this.quarantine.wait40Days();
    Expect(this.quarantine.report()).toEqual({
      F: 2, H: 4, D: 1, T: 0, X: 2
    });
  }

  @Test('Paracetamol cures fever')
  public paracetamol(): void {
    this.quarantine.setDrugs('P');
    this.quarantine.wait40Days();
    Expect(this.quarantine.report()).toEqual({
      F: 0, H: 3, D: 1, T: 3, X: 2
    });
  }

  @Test('Insulin prevents diabetic from dying')
  public insulin(): void {
    this.quarantine.setDrugs('I');
    this.quarantine.wait40Days();
    Expect(this.quarantine.report()).toEqual({
      F: 2, H: 1, D: 1, T: 3, X: 2
    });
  }

  @Test('If insulin is mixed with antibiotic, healthy people catch fever')
  public antibioticPlusInsulin(): void {
    this.quarantine.setDrugs('An,I');
    this.quarantine.wait40Days();
    Expect(this.quarantine.report()).toEqual({
      F: 3, H: 3, D: 1, T: 0, X: 2
    });
  }

}

