<template>
  <div class="container">
    <h1>Rate calculator</h1>
    <div class="mt-4">
      <label class="mr-2">Department rate ($/hr)</label>
      <input type="number" v-model="departmentRate" />
    </div>
    <div class="mt-4">
      <label class="mr-2">Fee (%) <input type="number" v-model="marginPercent" />%</label>
      <label class="mr-2">+ Fee ($) <input type="number" v-model="marginDollar" />/hr</label>
    </div>
    <div class="mt-4">
      <label> <input type="checkbox" v-model="usePayroll" /> Use CCN as Payroll company </label>

      <div class="mt-2">
        <label>Fee (%) <input type="number" v-model="payrollFeePercent" />%</label>
      </div>
    </div>

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

      <div v-if="usePayroll">
        <h4>Payroll breakdown</h4>
        <go-table-wrapper>
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
                <td>{{ toMoney(candidateRate) }}</td>
              </tr>
              <tr>
                <td>CCN Payroll fee</td>
                <td>{{ toMoney(payrollFee) }} ({{ payrollFeePercent }}%)</td>
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
import { GoInput } from '@go-ui/vue';
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
    };
  },
  computed: {
    candidateRate() {
      return this.departmentRate - this.ccnFee;
    },
    ccnFee() {
      return (this.departmentRate * this.marginPercent) / 100 + this.marginDollar;
    },
    payrollFee() {
      return (this.candidateRate * this.payrollFeePercent) / 100;
    },
    superanuation() {
      return (this.candidateRate * this.superanuationPercent) / 100;
    },
  },
  methods: {
    toMoney(number: number) {
      return formatter.format(number);
    },
  },
});
</script>
