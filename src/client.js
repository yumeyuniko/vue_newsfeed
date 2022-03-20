import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: 'ykkkl4nj',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-03-25',
});
