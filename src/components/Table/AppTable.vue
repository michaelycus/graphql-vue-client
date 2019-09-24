<template>
  <div>
    <VueElementLoading v-if="loading"
                       :active="loading"
                       spinner="line-scale"
                       color="var(--info)" />
    <div v-else>
      <b-row>

        <b-col md="4"
               class="my-1">
          <div class="search-wrapper"
               v-bind:class="{ active: searchOpen }">
            <div class="input-holder">
              <input type="text"
                     class="search-input"
                     ref="search"
                     v-model="filter"
                     placeholder="Type to search" />
            </div>
            <button class="close"
                    v-on:click="searchOpen = !searchOpen" />
          </div>
        </b-col>

        <div class="btn-actions-pane-right actions-icon-btn mr-4">
          <b-dropdown toggle-class="btn-icon btn-icon-only"
                      variant="link"
                      right>
            <span slot="button-content">
              <font-awesome-icon icon="th" /></span>
            <div>
              <li class="nav-item-header nav-item">Results per page:</li>
              <button type="button"
                      tabindex="0"
                      class="dropdown-item"
                      @click="setPerPage(5)">
                <i
                   :class="perPage == 5 ? 'dropdown-icon lnr-checkmark-circle' : 'dropdown-icon lnr-circle-minus'"></i>
                <span>5 results</span>
              </button>
              <button type="button"
                      tabindex="0"
                      class="dropdown-item"
                      @click="setPerPage(10)">
                <i
                   :class="perPage == 10 ? 'dropdown-icon lnr-checkmark-circle' : 'dropdown-icon lnr-circle-minus'"></i>
                <span>10 results</span>
              </button>
              <button type="button"
                      tabindex="0"
                      class="dropdown-item"
                      @click="setPerPage(25)">
                <i
                   :class="perPage == 25 ? 'dropdown-icon lnr-checkmark-circle' : 'dropdown-icon lnr-circle-minus'"></i>
                <span>25 results</span>
              </button>
              <button type="button"
                      tabindex="0"
                      class="dropdown-item"
                      @click="setPerPage(50)">
                <i
                   :class="perPage == 50 ? 'dropdown-icon lnr-checkmark-circle' : 'dropdown-icon lnr-circle-minus'"></i>
                <span>50 results</span>
              </button>
              <button type="button"
                      tabindex="0"
                      class="dropdown-item"
                      @click="setPerPage(100)">
                <i
                   :class="perPage == 100 ? 'dropdown-icon lnr-checkmark-circle' : 'dropdown-icon lnr-circle-minus'"></i>
                <span>100 results</span>
              </button>
            </div>
          </b-dropdown>
        </div>

      </b-row>

      <b-table :striped="striped"
               :hover="true"
               :items="xItems"
               :fields="computedFields"
               :per-page="perPage"
               :current-page="currentPage"
               :empty-text="emptyText"
               :filter="filter"
               show-empty
               responsive
               @row-hovered="handleRowHover"
               @row-clicked="handleRowClicked"
               @mouseout.native="handleMouseOut"
               @filtered="onFiltered">
        <template slot="HEAD_select">
          <b-form-checkbox v-model="isAllSelected"
                           @click.native.stop
                           @change="handleCheckClick()" />
        </template>

        <template slot="select"
                  slot-scope="row">
          <b-form-checkbox v-model="row.item.isSelected"
                           @click.native.stop
                           @change="checkboxChange(row.item)" />
        </template>

        <template slot="HEAD_actions">
          <table-actions-header :selected-items="selectedItems"
                                @lockSelecteds="$emit('lockSelecteds', selectedItems)"
                                @unlockSelecteds="$emit('unlockSelecteds', selectedItems)"
                                @deleteSelecteds="$emit('deleteSelecteds', selectedItems)" />

        </template>

        <template slot="actions"
                  slot-scope="row">
          <slot name="table-actions"
                :row="row">
            <table-actions :is-active="row.item.isActive"
                           @edit="$emit('edit', row.item.id)"
                           @toggle="$emit('toggle', row.item.id, !row.item.isActive)"
                           @delete="$emit('delete', row.item.id)" />
          </slot>
        </template>

        <template slot="edit_delete_actions"
                  slot-scope="row">

          <b-link class="m-2 btn-icon btn-icon-only btn-pill"
                  :to="`${urlTo}${row.item.id}/edit`">
            <font-awesome-icon icon="edit" />
          </b-link>

          <b-link class="m-2 btn-icon btn-icon-only btn-pill"
                  @click="deleteItem(row.item.id)">
            <font-awesome-icon icon="trash-alt" />
          </b-link>

        </template>

      </b-table>

      <b-pagination v-if="!loading"
                    v-model="currentPage"
                    size="md"
                    align="center"
                    :total-rows="xItems.length"
                    :per-page="perPage" />
    </div>

  </div>
</template>

<script>
import TableActions from './TableActions';
import TableActionsHeader from './TableActionsHeader';

import VueElementLoading from 'vue-element-loading'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTh,
  faEdit,
  faTrash,
  faTrashAlt,
  faUserShield
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faTh,
  faEdit,
  faTrash,
  faTrashAlt,
  faUserShield
);

export default {
  name: "app-table",
  components: {
    TableActions,
    TableActionsHeader,
    VueElementLoading,
    'font-awesome-icon': FontAwesomeIcon,
  },
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },

    GET: {
      type: Object,
      default: null
    },
    DELETE: {
      type: Object,
      default: null,
    },
    urlTo: {
      type: String,
      default: null,
    },
    model: {
      type: String,
      default: null,
    },
    striped: {
      type: Boolean,
      default: true,
    },
    hover: {
      type: Boolean,
      default: true,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
    actionable: {
      type: Boolean,
      default: false,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    emptyText: {
      type: String,
      default: null,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      searchOpen: false,

      selectedItems: [],
      isAllSelected: false,
      xItems: [],
      currentPage: 1,

      totalRows: 0,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
    };
  },

  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    },

    computedFields () {
      let mergedFields = this.fields;
      if (this.checkable) {
        mergedFields = [
          'select',
          ...mergedFields,
        ];
      }
      if (this.actionable) {
        mergedFields = [
          ...mergedFields,
          'actions',
        ];
      }
      if (this.editable) {
        mergedFields = [
          ...mergedFields,
          {
            key: 'edit_actions',
            label: 'Actions',
          },
        ];
      }
      return mergedFields;
    },
  },

  watch: {
    items () {
      this.xItems = this.items.map(item => ({
        ...item,
        _rowVariant: item.isActive === false ? '- text-muted font-italic' : '',
      }));
    },
  },

  created () {
    this.xItems = this.items.map(item => ({
      ...item,
      _rowVariant: item.isActive === false ? '- text-muted font-italic' : '',
    }));
  },

  methods: {
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    deleteItem (id) {
      if (window.confirm("Do you really want to delete?")) {
        this.$apollo.mutate({
          mutation: this.DELETE,
          variables: {
            id
          },
          update: (store) => {
            const data = store.readQuery({ query: this.GET })

            data[this.model] = data[this.model].filter(e => e.id != id)

            store.writeQuery({ query: this.GET, data })
          },
        })
          .then(data => {
            // eslint-disable-next-line
            console.log(data)
          })
      }
    },

    checkboxChange (item) {
      const index = this.selectedItems.indexOf(item.id);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
        item.isSelected = false;
      } else {
        this.selectedItems.push(item.id);
        item.isSelected = true;
      }
      this.isAllSelected = this.selectedItems.length === this.xItems.length;
    },

    handleCheckClick () {
      this.isAllSelected = !this.isAllSelected;
      this.xItems.forEach(item => item.isSelected = this.isAllSelected);

      if (this.isAllSelected === false) {
        this.selectedItems = [];
      } else {
        this.selectedItems = this.xItems.map(item => item.id);
      }
    },

    setPerPage (num) {
      this.perPage = num;
    },

    handleRowHover (row) {
      this.$emit('row-hovered', row);
    },

    handleRowClicked (row) {
      this.$emit('row-clicked', row);
    },

    handleMouseOut () {
      this.$emit('mouse-out');
    }
  },
};
</script>

<style scoped>
.btn-actions-pane-right {
  margin-left: auto;
  white-space: nowrap;
}
</style>