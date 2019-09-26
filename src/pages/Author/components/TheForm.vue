<template>
  <div class="tables-basic">
    <b-breadcrumb>
      <b-breadcrumb-item>System</b-breadcrumb-item>
      <b-breadcrumb-item active>Users</b-breadcrumb-item>
    </b-breadcrumb>

    <widget>

      <hr>

      <b-form @submit.prevent="onSubmit">
        <b-form-row>
          <b-col md="4">
            <b-form-group label="Name: *"
                          label-for="name">
              <b-form-input id="name"
                            v-model="name"
                            type="text"
                            :required="$route.params.id!=null"
                            placeholder="...full name"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group label="Email: *"
                          label-for="email">
              <b-form-input id="email"
                            v-model="email"
                            type="text"
                            required
                            placeholder="...user's email"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group label="Password: *"
                          label-for="password">
              <b-form-input id="password"
                            v-model="password"
                            type="password"
                            placeholder="...password"></b-form-input>
            </b-form-group>
          </b-col>

        </b-form-row>

        <hr>

        <form-button to="/users" />

      </b-form>
    </widget>
  </div>
</template>

<script>

import Widget from '@/components/Widget/Widget';
import FormButton from '@/components/Form/FormButton';

import CREATE from '../queries/Create.gql';
import UPDATE from '../queries/Update.gql';
import GET from '../queries/Get.gql';
import FIND from '../queries/Find.gql';

export default {
  name: 'User',
  components: { Widget, FormButton },
  data () {
    return {
      id: null,
      name: null,
      email: null,
      password: null,
    }
  },

  apollo: {
    user: {
      query: FIND,
      variables () {
        if (this.$route && this.$route.params) {
          return {
            id: this.$route.params.id
          }
        }
      },
      result ({ data: { user } }) {
        this.name = user.name
        this.email = user.email
      },
      skip () {
        return !this.$route.params.id
      }
    },
  },

  methods: {
    add () {
      this.$apollo.mutate({
        mutation: CREATE,
        variables: {
          name: this.name,
          email: this.email,
          password: this.password,
        },
        update: (cache, { data: { createUser } }) => {
          try {
            const data = cache.readQuery({
              query: GET
            })

            const insertedItems = createUser
            data.users.push(insertedItems)

            cache.writeQuery({
              query: GET,
              data
            })
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          }
        }
      }).then(() => {
        this.$router.push({ path: 'users' })
        // this.$eventHub.$emit('alert-success', "A seção foi criada com sucesso!")
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
    },

    edit () {
      this.$apollo.mutate({
        mutation: UPDATE,
        variables: {
          id: this.$route.params.id,
          name: this.name,
          email: this.email,
          password: this.password
        },
        update: (store, { data: { updateUser } }) => {
          if (updateUser) {
            const data = store.readQuery({
              query: GET,
            });

            const updatedItem = data.users.find(s => s.id === this.$route.params.id);
            updatedItem.name = this.name
            updatedItem.email = this.email

            store.writeQuery({
              query: GET,
              data
            });
          }
        }
      }).then(() => {
        this.$router.push(`/app/users/`)
        // this.$eventHub.$emit('alert-success', "A seção foi atualizada com sucesso!")
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
    },

    onSubmit () {
      this.$route.params.id ? this.edit() : this.add()
    }
  }
};
</script>

<style src="../style/style.scss" lang="scss" scoped />
