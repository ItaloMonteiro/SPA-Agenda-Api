<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Agenda</a>
      </div>
    </nav>

    <div class="container">

      <p v-if="errors.length">
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
      </p>

      <form id="form" @submit.prevent="save">

        <label>Nome</label>
        <input type="text" placeholder="Nome" v-model="contact.name">
        <label>Email</label>
        <input type="text" placeholder="Email" v-model="contact.email">
        <label>Telefone</label>
        <input type="tel" placeholder="Telefone" v-model="contact.phone">

        <button class="waves-effect waves-light btn-small" @click="checkForm">Salvar<i
            class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="contact of contacts" :key="contact.id">

            <td>{{ contact.name }}</td>
            <td>{{ contact.email }}</td>
            <td>{{ contact.phone }}</td>
            <td>
              <button @click="edit(contact)" class="waves-effect btn-small blue darken-1"><i
                  class="material-icons">create</i></button>
              <button @click="remove(contact)" class="waves-effect btn-small red darken-1"><i
                  class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>
</template>

<script>

import Contact from './services/contacts'

export default {
  name: 'app',
  data() {
    return {
      contact: {
        id: '',
        name: '',
        email: '',
        phone: ''
      },
      contacts: [],
      errors: []
    }
  },
  mounted() {
    this.list()
  },
  methods: {
    checkForm: function () {
      this.errors = [];

      if (!this.contact.name) {
        this.errors.push('O nome deve ser preenchido')
      }
      if (!this.contact.email) {
        this.errors.push('O email deve ser preenchido')
      }
      if (!this.contact.phone) {
        this.errors.push('O telefone deve ser preenchido')
      }if(this.contact.phone.length > 11){
        this.errors.push('Digite corretamente somente números.')
      }else if(this.contact.phone.length < 10){
        this.errors.push('Seu DDD também deve ser colocado')
      }

    },
    list() {
      Contact.list().then(resposta => {
        this.contacts = resposta.data.content
      }).catch(e => {
        console.log(e)
      })
    },
    save() {
      if (!this.contact.id) {
        Contact.save(this.contact).then(resposta => {
          this.contact = {}
          alert('Contato salvo!')
          this.list()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      } else {
        Contact.update(this.contact).then(resposta => {
          this.contact = {}
          this.errors = {}
          alert('Atualizado com sucesso!')
          this.list()
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }

    },
    edit(contact) {
      this.errors = []
      this.contact = contact
    },
    remove(contact) {
      if (confirm('Deseja excluir o contato?')) {
        Contact.delete(contact).then(resposta => {
          this.list()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }
    }
  }
}
</script>