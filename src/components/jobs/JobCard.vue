<template>
  <router-link custom v-slot="{ href, navigate }" :to="`/jobs/${job.slug}`">
    <go-card
      v-bind="$attrs"
      :heading="job.title"
      :sub-heading="job.buyer"
      heading-tag="h3"
      :href="href"
      @click="navigate"
      flat
      border
      :class="{ 'job-card': true, closed: job.isClosed }">
      <div class="job-card-chip" slot="pre-title">
        <go-chip variant="info" v-if="!job.isClosed">
          <div>Closing {{ job.closingDateRelative }}</div>
        </go-chip>
        <GoChip v-else variant="neutral">Closed</GoChip>
      </div>
      <div slot="footer">Published on {{ job.publishedDate }}</div>
    </go-card>
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
