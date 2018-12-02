<template>
  <div>
    <h2>Form</h2>
     <b-field :label="field.field" v-for="(field, key) in insuranceDetail.field_set"
      :key="key">
        <b-select :placeholder="field.field" v-if="field.type === 'select'"
          v-model="submission[field.id]" expanded>
            <option v-for="(option, key) in field.option_set" :key="key" :value="option.id">
              {{ option.display }}
            </option>
        </b-select>
        <b-datepicker
            :placeholder="field.field" icon="calendar-today" v-model="submission[field.id]"
            v-else-if="field.type === 'date'">
        </b-datepicker>
        <div class="block" v-else-if="field.type === 'radio'">
          <b-radio  v-for="(option, key) in field.option_set" :key="key"
            v-model="submission[field.id]"  :native-value="option.id">{{option.display}}</b-radio>
        </div>
        <div class="block" v-else-if="field.type === 'checkbox'">
          <b-checkbox  v-for="(option, key) in field.option_set" :key="key"
            v-model="submission[field.id]"  :native-value="option.id">{{option.display}}</b-checkbox>
        </div>

        <b-input v-model="submission[field.id]" :pattern="field.validation"
          :type="field.type" :placeholder="field.field" v-else></b-input>
      </b-field>
      <button class="button is-primary" @click.prevent="submit">Submit</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      insuranceDetail: {},
      submission: {},
      t: []
    }
  },
  mounted () {
    const loader = this.$loading.open()
    this.$axios.get(`http://localhost:8000/insurer/risks/${this.$route.params.id}/`).then(data => {
      loader.close()
      for (const field of data.data['field_set']) {
        if (field.type === 'checkbox') {
          this.submission[field.id] = []
        }
      }
      this.insuranceDetail = data.data
    })
  },
  methods: {
    submit () {
      const params = new URLSearchParams()
      params.append('risk', this.$route.params.id)
      const fields = []
      for (const key in this.submission) {
        fields.push({
          'field': key,
          'value': this.submission[key]
        })
      }
      params.append('submissionvalue_set', fields)
      console.log(JSON.stringify(fields))
      this.$axios.post(`http://localhost:8000/insurer/submit/`,
        {
          'risk': this.$route.params.id,
          'submissionvalue_set': fields
        }).then(response => {
          window.alert('Form has been submitted')
          this.submission = {}  
      }).catch(err => {
        console.log(err.message)
      })
    }
  }
}
</script>
