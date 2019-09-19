<template>
  <div>
    <clickable-icon icon="edit"
                    tooltip="Editar"
                    @click="$emit('edit')" />
    <clickable-icon :icon="lockIcon"
                    :tooltip="lockTooltip"
                    @click="$emit('toggle')" />
    <clickable-icon icon="delete"
                    tooltip="Delete"
                    @click="$emit('delete')" />
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    lockIcon () {
      return this.isActive ? 'lock_open' : 'lock';
    },

    lockTooltip () {
      return this.isActive ? 'Bloquear' : 'Desbloquear';
    },
  },
};
</script>
