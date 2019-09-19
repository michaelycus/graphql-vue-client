<template>
  <div>
    <div v-if="selectedItems.length <= 0">Ações</div>
    <b-dropdown v-else
                text="Actions">
      <b-dropdown-item @click="$emit('deleteSelecteds')">Delete {{selecteds}}
      </b-dropdown-item>
      <b-dropdown-item @click="$emit('lockSelecteds')">Block Access
        {{selecteds}}</b-dropdown-item>
      <b-dropdown-item @click="$emit('unlockSelecteds')">Unblock Access
        {{selecteds}}</b-dropdown-item>
    </b-dropdown>
  </div>
</template>
<script>
export default {
  props: {
    selectedItems: {
      type: Array,
      // default: [],
    },
  },
  computed: {
    selecteds () {
      return this.selectedItems.length > 0 ? `(${this.selectedItems.length})` : '';
    },
  },
}
</script>
