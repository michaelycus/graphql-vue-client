<template>
  <nav :class="{sidebar: true, sidebarStatic, sidebarOpened}"
       @mouseenter="sidebarMouseEnter"
       @mouseleave="sidebarMouseLeave">
    <header class="logo">
      <router-link to="/app"><span class="text-warning">Sing</span> App
      </router-link>
    </header>
    <ul class="nav">
      <NavLink header="Dashboard"
               link="/dashboard"
               iconName="flaticon-home"
               index="dashboard"
               isHeader />
      <NavLink header="Typography"
               link="/typography"
               iconName="flaticon-list"
               index="typography"
               isHeader />
      <NavLink header="Authors"
               link="/authors"
               iconName="flaticon-user-1"
               index="authors"
               isHeader />
      <NavLink header="Books"
               link="/books"
               iconName="flaticon-document"
               index="books"
               isHeader />
      <NavLink header="Users"
               link="/users"
               iconName="flaticon-users"
               index="users"
               isHeader />
      <NavLink header="Tables Basic"
               link="/tables"
               iconName="flaticon-equal-1"
               index="tables"
               isHeader />
      <NavLink header="Notifications"
               link="/notifications"
               iconName="flaticon-star"
               index="notifications"
               isHeader />
      <NavLink :activeItem="activeItem"
               header="Components"
               link="/components"
               iconName="flaticon-network"
               index="components"
               :childrenLinks="[
          { header: 'Charts', link: '/components/charts' },
          { header: 'Icons', link: '/components/icons' },
          { header: 'Maps', link: '/components/maps' },
        ]" />
    </ul>

  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import isScreen from '@/core/screenHelper';
import NavLink from './NavLink/NavLink';

export default {
  name: 'Sidebar',
  components: { NavLink },
  data () {
    return {
      alerts: [
        {
          id: 0,
          title: 'Sales Report',
          value: 15,
          footer: 'Calculating x-axis bias... 65%',
          color: 'info',
        },
        {
          id: 1,
          title: 'Personal Responsibility',
          value: 20,
          footer: 'Provide required notes',
          color: 'danger',
        },
      ],
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute () {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
    sidebarMouseEnter () {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave () {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    },
  },
  created () {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState('layout', {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
