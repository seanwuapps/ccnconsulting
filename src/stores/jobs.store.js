import { defineStore } from 'pinia';
import Airtable from 'airtable';
import { AIRTABLE_KEY } from '../const';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);

const jobsBase = new Airtable({ apiKey: AIRTABLE_KEY }).base(
  'appjb01Lr9hMbTruv'
)('Jobs');

const formatJobCard = (record) => {
  const title = record.get('Title');
  const buyer = record.get('Buyer');
  const location = record.get('Location');
  const closingDateString = record.get('Closing date');
  const closingDate = dayjs(closingDateString);
  const description = record.get('Description');
  const blurb = description.substring(0, 100) + '...';
  const slug = record.get('Slug');
  const isClosed = dayjs().isAfter(closingDate);
  const publishedDate = dayjs(record.get('Published date')).format(
    'DD MMM YYYY'
  );
  return {
    title,
    buyer,
    location,
    closingDateRelative: closingDate.fromNow(),
    isClosed,
    blurb,
    description,
    slug,
    publishedDate,
  };
};

const formatJobDetails = (record) => {
  return {
    ...formatJobCard(record),
  };
};

export const useJobsStore = defineStore('jobs', {
  state: () => {
    return {
      latest: [],
      currentJob: null,
      fetchingDetails: false
    };
  },
  actions: {
    async fetchLatest() {
      jobsBase
        .select({
          // Selecting the first 3 records in Grid view:
          maxRecords: 3,
          view: 'Grid view',
          sort: [
            {
              field: 'Published date',
              direction: 'desc',
            },
          ],
        })
        .firstPage((_, records) => {
          if (!records) {
            return;
          }
          this.latest = records.map(formatJobCard);
        });
    },
    async fetchJob(slug) {
      this.fetchingDetails = true;
      jobsBase
        .select({
          maxRecords: 1,
          view: 'Grid view',
          filterByFormula: `{Slug} = '${slug}'`,
        })
        .firstPage((_, records) => {
          if (!records) {
            return;
          }
          this.currentJob = formatJobDetails(records[0]);
          this.fetchingDetails = false;
        });
    },
  },
});
