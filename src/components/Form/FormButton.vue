<template>
  <b-form-row>
    <b-col class="text-right">
      <router-link class="btn btn-link"
                   :to="to">Cancel</router-link>
      <b-button type="submit"
                variant="primary">{{ label }}</b-button>
    </b-col>
  </b-form-row>
</template>

<script>
export default {
  props: ['to'],

  computed: {
    label () {
      return this.$route.params.id ? 'Update' : 'Add'
    }
  },
}
</script>
