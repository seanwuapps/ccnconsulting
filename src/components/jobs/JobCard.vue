<template>
  <router-link custom v-slot="{ href, navigate }" :to="`/jobs/${job.slug}`">
    <GoCard
      v-bind="$attrs"
      :card-title="job.title"
      :card-subtitle="job.buyer"
      heading-tag="h3"
      :href="href"
      @click="navigate"
      flat
      border
      :class="{ 'job-card': true, closed: job.isClosed }">
      <div class="job-card-chip" slot="pre-title">
        <GoChip v-if="!job.isClosed">
          <div>Closing {{ job.closingDateRelative }}</div>
        </GoChip>
        <GoChip v-else variant="neutral">Closed</GoChip>
      </div>
      <div slot="footer">Published on {{ job.publishedDate }}</div>
    </GoCard>
  </router-link>
</template>

<script lang="ts">
import { GoButton, GoCard, GoIcon, GoChip, GoLink } from '@go-ui/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false,
  components: {
    GoCard,
    GoButton,
    GoIcon,
    GoChip,
    GoLink,
  },
  props: {
    job: {
      type: Object,
      required: true,
    },
  },
});
</script>
<style lang="scss">
.job-card {
  &.closed {
    opacity: 0.6;
  }
  // .job-card-chip {
  //   float: right;
  // }
}
</style>
