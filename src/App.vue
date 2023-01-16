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

      <form id="form" @submit.prevent="salvar">

        <label>Nome</label>
        <input type="text" placeholder="Nome" v-model="contato.nome">
        <label>Email</label>
        <input type="text" placeholder="Email" v-model="contato.email">
        <label>Telefone</label>
        <input type="tel" placeholder="Telefone" v-model="contato.telefone">

        <button class="waves-effect waves-light btn-small" @click="checarForm">Salvar<i
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

          <tr v-for="contato of contatos" :key="contato.agendaId">

            <td>{{ contato.nome }}</td>
            <td>{{ contato.email }}</td>
            <td>{{ contato.telefone }}</td>
            <td>
              <button @click="editar(contato)" class="waves-effect btn-small blue darken-1"><i
                  class="material-icons">create</i></button>
              <button @click="remover(contato)" class="waves-effect btn-small red darken-1"><i
                  class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>
</template>

<script>

import Contato from './services/contatos'

export default {
  name: 'app',
  data() {
    return {
      contato: {
        agendaId: '',
        nome: '',
        email: '',
        telefone: ''
      },
      contatos: [],
      errors: []
    }
  },
  mounted() {
    this.listar()
  },
  methods: {
    checarForm: function () {
      this.errors = [];

      if (!this.contato.nome) {
        this.errors.push('O nome deve ser preenchido')
      }
      if (!this.contato.email) {
        this.errors.push('O email deve ser preenchido')
      }
      if (!this.contato.telefone) {
        this.errors.push('O telefone deve ser preenchido')
      }if(this.contato.telefone.length > 11){
        this.errors.push('Digite corretamente somente números.')
      }else if(this.contato.telefone.length < 10){
        this.errors.push('Seu DDD também deve ser colocado')
      }

    },
    listar() {
      Contato.listar().then(resposta => {
        this.contatos = resposta.data.content
      }).catch(e => {
        console.log(e)
      })
    },
    salvar() {
      if (!this.contato.agendaId) {
        Contato.salvar(this.contato).then(resposta => {
          this.contato = {}
          alert('Contato salvo!')
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      } else {
        Contato.atualizar(this.contato).then(resposta => {
          this.contato = {}
          this.errors = {}
          alert('Atualizado com sucesso!')
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }

    },
    editar(contato) {
      this.errors = []
      this.contato = contato
    },
    remover(contato) {
      if (confirm('Deseja excluir o contato?')) {
        Contato.apagar(contato).then(resposta => {
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }
    }
  }
}
</script>