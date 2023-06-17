<template>
  <GoHero heading="Jobs">
    <p class="text-size-1">Latest contracting job openings</p>
    <!-- subscribe to job notification feature -->
  </GoHero>
  <div class="container mt-4">
    <GoSpinner v-if="jobsStore.fetchingList">Fetching jobs...</GoSpinner>
    <div v-else class="row">
      <div class="col-12 col-desktop-3 mb-4">
        <h2 class="h3">Filters</h2>
        <GoInput
          label="Keyword"
          :value="jobsStore.listFilters.query"
          @input="(e) => jobsStore.search(e.target.value)"></GoInput>
        <GoSwitch
          :checked="jobsStore.listFilters.showClosed"
          @change="handleIncludeClosedToggle"
          label="Include closed jobs"
          show-on-off
          active-label="Yes"
          inactive-label="No"></GoSwitch>
      </div>
      <div class="col-12 col-desktop-9">
        <h2 class="h3 mb-3">Results</h2>
        <GoCardRow
          v-if="jobsStore.filteredList?.length > 0"
          :cols="1"
          :cols-tablet="2"
          :cols-desktop="2"
          :cols-large="3"
          :key="JSON.stringify(jobsStore.listFilters)">
          <JobCard class="mr-2 mb-2" :job="job" v-for="job in jobsStore.filteredList" :key="job.slug" />
        </GoCardRow>
        <div v-else>
          <div class="mt-4">Sorry, nothing to show here.</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import JobCard from '@/components/jobs/JobCard.vue';
import { useJobsStore } from '@/stores/jobs.store';
import { GoCardRow, GoCard, GoHero, GoSpinner, GoSwitch, GoInput, GoButton } from '@go-ui/vue';
import { onMounted } from 'vue';
const jobsStore = useJobsStore();
const handleIncludeClosedToggle = async (e) => {
  jobsStore.listFilters.showClosed = e.target.checked;
};
onMounted(async () => {
  await jobsStore.fetchListing();
});
</script>
