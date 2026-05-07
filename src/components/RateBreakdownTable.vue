<template>
  <section>
    <h2>Rate breakdown</h2>
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
              {{ toMoneyFormat(departmentRate) }}
            </td>
          </tr>
          <tr>
            <td>CCN fee</td>
            <td>-{{ toMoneyFormat(ccnFee) }}</td>
          </tr>
          <tr>
            <td><b>Candidate rate inc. super</b></td>
            <td><b>{{ toMoneyFormat(payrollStartingRate) }}</b></td>
          </tr>
        </tbody>
      </table>
    </go-table-wrapper>
  </section>
</template>
<script lang="ts" setup>
import { toMoneyFormat } from '@/utils/toMoney';

defineProps<{
  departmentRate: number;
  ccnFee: number;
  payrollStartingRate: number;
}>()

</script>