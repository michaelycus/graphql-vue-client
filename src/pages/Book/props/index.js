import GET from '../queries/Get.gql';
// import DELETE from '@/graphql/balanca/Delete.gql';

import fields from '../fields';

const urlTo = 'users/';

const props = {
    GET,
    // DELETE,
    model: 'users',
    fields,
    urlTo
}

export default props;
