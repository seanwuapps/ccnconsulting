<template>
  <div class="container">
    <h1>Rate calculator</h1>
    <div class="row">
      <div class="col-desktop-8">
        <div class="mb-4">
          <GoInput type="number" label="Department rate" v-model="departmentRate">
            <span slot="prefix">$</span>
            <span slot="suffix">/hr</span>
          </GoInput>
        </div>
        <div class="mb-4 row">
          <div class="col-6">
            <GoInput type="number" label="Fee (%)" v-model="marginPercent">
              <span slot="suffix">%</span>
            </GoInput>
          </div>
          <div class="col-6">
            <GoInput type="number" label="Fee ($)" v-model="marginDollar">
              <span slot="suffix">/hr</span>
            </GoInput>
          </div>
        </div>
        <div class="mb-4">
          <GoSwitch label="Calculate payroll tax" v-model="usePayrollTax" />
        </div>
        <div class="mb-4">
          <GoSwitch label="Use CCN as Payroll company" v-model="usePayroll" />
        </div>
        <div class="mb-2" v-if="usePayroll">
          <GoInput type="number" label="Payroll fee (%)" v-model="payrollFeePercent">
            <span slot="suffix">%</span>
          </GoInput>
        </div>
      </div>
      <div class="col-desktop-4">
        <GoInput label="Candidate name" v-model="candidateName" />
        <GoButton :disabled="!candidateName" type="button" variant="primary" block="all" @click="openShareDialog">
          <GoIcon decorative name="share" size="1em" slot="prefix"></GoIcon>
          Share</GoButton
        >
        <GoDialog ref="shareDialog" :heading="`Share with ${candidateName}`">
          <div class="input-group">
            <GoInput label="Link" :value="shareLink" readonly />
            <GoButton variant="primary" class="mb-2" @click="copyShareLink">Copy</GoButton>
          </div>
          <div v-show="copyMessage">{{ copyMessage }}</div>
        </GoDialog>
      </div>
    </div>

    <hr />
    <div class="mt-4 mb-4">
      <h4>Rate breakdown</h4>
      <go-table-wrapper bordered striped>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>$ Value (GST excl.)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Invoice to department</td>
              <td>
                {{ toMoney(departmentRate) }}
              </td>
            </tr>
            <tr>
              <td>CCN fee</td>
              <td>{{ toMoney(ccnFee) }}</td>
            </tr>
            <tr>
              <td>To candidate's ABN/Payroll</td>
              <td>{{ toMoney(candidateRate) }}</td>
            </tr>
          </tbody>
        </table>
      </go-table-wrapper>

      <div class="mt-2" v-if="usePayrollTax">
        <h4>Payroll tax</h4>
        <go-table-wrapper bordered striped>
          <table>
            <tbody>
              <tr>
                <td>ACT Payroll tax rate</td>
                <td>{{ payrollTaxPercent }}%</td>
              </tr>
              <tr>
                <td>ACT Payroll Tax Payable</td>
                <td>{{ toMoney(payrollTax) }} (Candidate rate * payroll tax rate)</td>
              </tr>
              <tr>
                <td>Candidate rate after payroll tax</td>
                <td>{{ toMoney(payrollStartingRate) }}</td>
              </tr>
            </tbody>
          </table>
        </go-table-wrapper>
      </div>

      <div class="mt-2" v-if="usePayroll">
        <h4>Payroll breakdown</h4>
        <go-table-wrapper bordered striped>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>$ Value (GST excl.)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total value</td>
                <td>{{ toMoney(payrollStartingRate) }}</td>
              </tr>
              <tr>
                <td>CCN Payroll fee</td>
                <td>{{ toMoney(payrollFee) }} ({{ payrollFeePercent }}%)</td>
              </tr>

              <tr>
                <td>Candidate pre-super rate</td>
                <td>
                  <strong>{{ toMoney(preSuperRate) }}</strong>
                </td>
              </tr>

              <tr>
                <td>Superanuation</td>
                <td>{{ toMoney(superanuation) }} ({{ superanuationPercent }}%)</td>
              </tr>
            </tbody>
          </table>
        </go-table-wrapper>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GoInput, GoSwitch, GoButton, GoDialog, GoIcon } from '@go-ui/vue';
import { defineComponent } from 'vue';
</script>

<script lang="ts">
const formatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
export default defineComponent({
  data() {
    return {
      departmentRate: 100,
      marginPercent: 5,
      marginDollar: 5,
      usePayroll: true,
      payrollFeePercent: 1.5,
      superanuationPercent: 11,
      usePayrollTax: false,
      payrollTaxPercent: 6.85,
      candidateName: '',
      shareLink: '',
      copyMessage: '',
    };
  },
  computed: {
    candidateRate() {
      return Number(this.departmentRate) - this.ccnFee;
    },
    ccnFee() {
      return (Number(this.departmentRate) * Number(this.marginPercent)) / 100 + Number(this.marginDollar);
    },
    payrollFee() {
      return (this.candidateRate * Number(this.payrollFeePercent)) / 100;
    },
    preSuperRate() {
      return this.payrollStartingRate - this.payrollFee;
    },
    superanuation() {
      return (this.preSuperRate * Number(this.superanuationPercent)) / 100;
    },
    payrollTax() {
      return (this.candidateRate * Number(this.payrollTaxPercent)) / 100;
    },
    payrollStartingRate() {
      return this.usePayrollTax ? this.candidateRate - this.payrollTax : this.candidateRate;
    },
  },
  methods: {
    toMoney(number: number) {
      return formatter.format(number);
    },
    openShareDialog() {
      this.copyMessage = '';
      // build sharelink
      this.shareLink = this.buildShareLink();
      (this.$refs.shareDialog as any).$el.open();
    },
    buildShareLink() {
      const {
        departmentRate,
        marginPercent,
        marginDollar,
        usePayroll,
        payrollFeePercent,
        superanuationPercent,
        usePayrollTax,
        payrollTaxPercent,
        candidateName,
      } = this;
      const encodedParam = btoa(
        JSON.stringify({
          departmentRate,
          marginPercent,
          marginDollar,
          usePayroll,
          payrollFeePercent,
          superanuationPercent,
          usePayrollTax,
          payrollTaxPercent,
          candidateName,
        })
      );
      return `${window.location.origin}/candidate-rate/${encodedParam}`;
    },
    copyShareLink() {
      this.copyMessage = '';
      try {
        navigator.clipboard.writeText(this.buildShareLink());
        this.copyMessage = `Link copied to clipboard!`;
      } catch (e) {
        this.copyMessage = `Copy failed, please manually copy from the field above.`;
      }
    },
  },
});
</script>
<style lang="scss">
.input-group {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  go-input {
    flex: 1;
  }
}
</style>
