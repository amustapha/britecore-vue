<template>
  <div>
    <h2>Create Risk Form</h2>
    <br/>
    <form method="post" @submit.prevent="submit()">
      <b-field label="Risk name">
        <b-input v-model="risk.name" required></b-input>
      </b-field>
      <b-field label="Risk description">
        <b-input v-model="risk.description" type="textarea" required></b-input>
      </b-field>
      <br/>
      <h3>Risk Data Fields</h3>
      <div class="columns" v-for="(field, key) in risk.field_set" :key="key">
        <div class="column is-one-quarter">
          <b-field label="Field Name">
            <b-input v-model="field.field" required/>
          </b-field>
        </div>
        <div class="column is-narrow">
          <b-field label="Field type">
            <b-select expanded v-model="field.type"
              @input="adjust(field)">
              <option v-for="(typ, i) in types" :value="typ.value" :key="i"> {{typ.label}}</option>
            </b-select>
          </b-field>
        </div>
        <div class="column" v-if="field.type === 'select' || field.type === 'radio' || field.type === 'checkbox'">
          <b-field label="Options" message="Seperate options with comma">
            <b-taginput ellipsis v-model="field.options" />
          </b-field>
        </div>
        <div class="column">
          <b-field label="Validation"
            message="Type a HTML5 <a href='http://html5pattern.com/' target='_blank'>pattern</a> regex validator">
              <b-input v-model="field.validation" ellipsis />
          </b-field>
        </div>
        <div class="column">
          <b-field label="Hint" message="Hint to help user provide valid data ">
            <b-input v-model="field.message" ellipsis />
          </b-field>
        </div>
        <div class="column is-narrow">
            <b-tooltip :label="`This field is ${field.is_required ? '' : 'not' } required`" always position="is-left">
              <b-switch v-model="field.is_required" type="is-info">
              </b-switch>
            </b-tooltip>
            <b-field>
              <p class="control">
                <b-tooltip label="Add new field"
                  type="is-dark"
                  position="is-bottom">
                  <button class="button is-success" title="Add new field" @click.prevent="risk.field_set.splice(key + 1, 0, {})">
                      <b-icon icon="plus"></b-icon>
                  </button>
                </b-tooltip>
              </p>
              <p class="control" v-if="risk.field_set.length > 1">
                <b-tooltip label="Delete field"
                  type="is-dark"
                  position="is-bottom">
                      <button class="button is-danger" title="Remove Field" @click.prevent="risk.field_set.splice(key, 1)">
                          <b-icon icon="delete"></b-icon>
                      </button>
                </b-tooltip>
              </p>
            </b-field>
        </div>
      </div>
      <button class="button is-primary" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'HelloWorld',
  data () {
    return {
      risk: {
        'field_set': [{}]
      },
      types: [
        {label: 'Check boxes', value: 'checkbox'},
        {label: 'Date', value: 'date'},
        {label: 'Email', value: 'email'},
        {label: 'Long text', value: 'textarea'},
        {label: 'Number', value: 'number'},
        {label: 'Phone number', value: 'tel'},
        {label: 'Radio buttons', value: 'radio'},
        {label: 'Select', value: 'select'},
        {label: 'Text', value: 'text'},
        {label: 'URL', value:'url'}
      ]
    }
  },
  methods: {
    adjust (field) {
      if (field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') {
        if (!field.options) {
          field.options = []
        }
      } else {
        delete field.options
      }
    },
    submit () {
      for (const field of this.risk.field_set) {
        if (field.options) {
          field.option_set = []
          for (const value of field.options) {
            field.option_set.push({display: value})
          }
        }
      }
      this.$axios.post('http://localhost:8000/insurer/risks/', this.risk, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        this.$toast.open({
          message: 'New risk definition has been created!',
          type: 'is-success',
          position: 'is-bottom'
        })
        this.risk = { 'field_set': [{}] }
      }).catch(err => {
         this.$toast.open({
          message: 'New risk definition unsuccessfull!',
          type: 'is-error',
          position: 'is-bottom'
        })
      })
    }
  }
}
</script>
