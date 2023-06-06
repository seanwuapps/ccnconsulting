<template>
  <div v-if="jobStore.fetchingDetails" class="text-center mt-4 mb-4">
    <GoSpinner>Fetching job details...</GoSpinner>
  </div>
  <div v-else>
    <div v-if="job">
      <GoContentLayout
        :page-heading="job.title"
        :pre-heading="job.publishedDate"
        toc
        sidebar-sticky
        sidebar-desktop-position="end">
        <div slot="sidebar" class="mb-4">
          <GoButton v-if="!job.isClosed" variant="primary" block="all" :href="mailToLink">
            <GoIcon slot="prefix" icon-set="bx" name="chat" size="1.5em" />
            <span>I'm interested</span>
          </GoButton>
          <GoButton v-else variant="neutral" block="all" disabled>This job is closed</GoButton>
        </div>
        <ul slot="intro" class="feature-list">
          <li>
            <GoIcon label="Organisation" icon-set="bx" name="buildings" /> <span>{{ job.buyer }}</span>
          </li>
          <li>
            <GoIcon label="Location" icon-set="bx" name="map" /> <span>{{ job.location }}</span>
          </li>
          <li v-if="!job.isClosed">
            <GoIcon label="Closing time" icon-set="bx" name="time" />
            <span>Closing {{ job.closingDateRelative }} ({{ job.closingDate }})</span>
          </li>
          <li v-else>
            <GoIcon icon-set="bx" name="time" /> <span>Closed ({{ job.closingDate }})</span>
          </li>
        </ul>

        <div v-auto-animate>
          <!-- description -->
          <div v-if="job.description">
            <h2>Requirements</h2>
            <GoMd :content="job.description"></GoMd>
          </div>
          <!-- criteria  -->
          <div v-if="job.essentialCriteria">
            <h2>Essential criteria</h2>
            <GoMd :content="job.essentialCriteria"></GoMd>
          </div>
          <div v-if="job.desirableCriteria">
            <h2>Desirable criteria</h2>
            <GoMd :content="job.desirableCriteria"></GoMd>
          </div>
        </div>
      </GoContentLayout>
    </div>
    <div class="container" v-else>
      <p>Sorry, we do not have the details for this job.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { GoButton, GoChip, GoContentLayout, GoIcon, GoMd, GoSpinner } from '@go-ui/vue';
import { useJobsStore } from '@/stores/jobs.store';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const jobStore = useJobsStore();
    return { jobStore };
  },
  components: { GoSpinner, GoChip, GoIcon, GoMd, GoContentLayout, GoButton },
  watch: {
    '$route.params.slug': {
      immediate: true,
      handler(slug) {
        this.jobStore.fetchJob(slug);
      },
    },
  },
  computed: {
    job() {
      return this.jobStore.currentJob;
    },
    mailToLink() {
      const linkToJob = `${window.location.protocol}//${window.location.host}/jobs/${this.job.slug}`;
      return `mailto:hello@ccnconsulting.com.au?subject=Interested%20in%${this.job.title}&body=Hi%2C%0A%0AMy%20name%20is%20%7BYOUR_NAME_HERE%7D%2C%20and%20im%20interested%20in%20your%20job%20${this.job.title}%20at%20${linkToJob}%0A%0A%0AMy%20preferred%20contact%20number%20is%20%7BYOUR_NUMBER%7D%0A%0A----%0A%0A%7BPLEASE%20ATTACH_YOUR_CV%7D%0A`;
    },
  },
});
</script>
<style lang="scss">
ul.feature-list {
  list-style: none;
  padding: 0;
  vertical-align: middle;
  li {
    display: flex;
    align-items: baseline;
    gap: 0.5em;
    color: var(--go-color-neutral-700);
  }
}
</style>