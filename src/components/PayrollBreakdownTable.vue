<template>
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
          <td><b>Candidate rate inc. super</b></td>
          <td><b>{{ toMoneyFormat(payrollStartingRate) }}</b></td>
        </tr>
        <tr>
          <td>CCN Payroll fee</td>
          <td>-{{ toMoneyFormat(payrollFee) }} ({{ payrollFeePercent }}%)</td>
        </tr>

      </tbody>
    </table>
  </go-table-wrapper>
</template>

<script setup lang="ts">
import { toMoneyFormat } from '@/utils/toMoney';

defineProps<{
  payrollStartingRate: number;
  payrollFee: number;
  payrollFeePercent: number;
}>()

</script>
