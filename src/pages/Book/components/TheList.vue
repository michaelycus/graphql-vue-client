<template>
  <div class="tables-basic">
    <b-breadcrumb>
      <b-breadcrumb-item>System</b-breadcrumb-item>
      <b-breadcrumb-item active>Users</b-breadcrumb-item>
    </b-breadcrumb>

    <b-row>
      <b-col xs="6">
        <h2 class="page-title">List of <span class="fw-semi-bold">Users</span>
        </h2>
      </b-col>
      <b-col xs="6"
             style="text-align:right; margin-left: auto; white-space: nowrap">
        <router-link class="btn btn-shadow d-inline-flex align-items-center btn btn-primary"
                     :to="props.urlTo + 'add'">
          <font-awesome-icon class="mr-2"
                             icon="plus" />
          Add
        </router-link>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <Widget>

          <ApolloQuery :query="props.GET">
            <template slot-scope="{ result: { data, loading }, isLoading }">
              <div v-if="isLoading">Loading...</div>
              <app-table v-else
                         v-bind="props"
                         :items="data[props.model]"></app-table>
            </template>
          </ApolloQuery>

        </Widget>
      </b-col>

    </b-row>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faPlus,
);

import props from "../props";

import Widget from '@/components/Widget/Widget';
import AppTable from '@/components/Table/AppTable';

export default {
  name: 'User',
  components: { Widget, AppTable, 'font-awesome-icon': FontAwesomeIcon },
  data () {
    return {
      props
    };
  },
};
</script>

<style src="../style/style.scss" lang="scss" scoped />
