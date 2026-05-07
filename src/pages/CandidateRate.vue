<template>
  <div class="candidate-rate-page" v-if="parsedParams">
    <GoHero :heading="`Candiate rate breakdown for ${candidateName}`"> </GoHero>

    <div class="container">
      <!-- <div class="row">
        <div class="col-desktop-8">
          <div class="mt-4">
            <GoInput disabled type="number" label="Department rate" v-model="departmentRate">
              <span slot="prefix">$</span>
              <span slot="suffix">/hr</span>
            </GoInput>
          </div>
          <div class="mt-4 row">
            <div class="col-6">
              <GoInput disabled type="number" label="Fee (%)" v-model="marginPercent">
                <span slot="suffix">%</span>
              </GoInput>
            </div>
            <div class="col-6">
              <GoInput disabled type="number" label="Fee ($)" v-model="marginDollar">
                <span slot="suffix">/hr</span>
              </GoInput>
            </div>
          </div>
          <div class="mt-4">
            <GoSwitch disabled label="Calculate payroll tax" v-model="usePayrollTax" />
          </div>
          <div class="mt-4">
            <GoSwitch disabled label="Use CCN as Payroll company" v-model="usePayroll" />
          </div>
          <div class="mt-2" v-if="usePayroll">
            <GoInput disabled type="number" label="Payroll fee (%)" v-model="payrollFeePercent">
              <span slot="suffix">%</span>
            </GoInput>
          </div>
        </div>
      </div> -->

      <div class="mt-4 mb-4">
        <RateBreakdownTable :department-rate="departmentRate" :ccn-fee="ccnFee"
          :payrollStartingRate="payrollStartingRate" />

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
          <PayrollBreakdownTable :payrollStartingRate="payrollStartingRate" :payrollFee="payrollFee"
            :payrollFeePercent="payrollFeePercent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RateBreakdownTable from '@/components/RateBreakdownTable.vue';
import PayrollBreakdownTable from '@/components/PayrollBreakdownTable.vue';
import { GoHero, GoInput, GoSwitch } from '@go-ui/vue';
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
      departmentRate: 0,
      marginPercent: 0,
      marginDollar: 0,
      usePayroll: false,
      payrollFeePercent: 0,
      superanuationPercent: 0,
      usePayrollTax: false,
      payrollTaxPercent: 0,
      candidateName: '',
      parsedParams: null,
    };
  },
  beforeMount() {
    const params = atob(String(this.$route.params.encodedParams));
    try {
      this.parsedParams = JSON.parse(params);
      if (!this.parsedParams) {
        return;
      }
      this.departmentRate = Number(this.parsedParams.departmentRate);
      this.marginPercent = Number(this.parsedParams.marginPercent);
      this.marginDollar = Number(this.parsedParams.marginDollar);
      this.usePayroll = Boolean(this.parsedParams.usePayroll);
      this.payrollFeePercent = Number(this.parsedParams.payrollFeePercent);
      this.superanuationPercent = Number(this.parsedParams.superanuationPercent);
      this.usePayrollTax = Boolean(this.parsedParams.usePayrollTax);
      this.payrollTaxPercent = Number(this.parsedParams.payrollTaxPercent);
      this.candidateName = this.parsedParams.candidateName;
    } catch (e) {
      console.error(e);
      this.parsedParams = null;
    }
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
    rateIncludingSuper() {
      return this.payrollStartingRate - this.payrollFee;
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
  },
  mounted() {
    document.title = `${this.candidateName} | Candidate rate breakdown | CCN Consulting Pty Ltd`;
  },
});
</script>
<style>
.candidate-rate-page table {
  width: 100%;
}
</style>
