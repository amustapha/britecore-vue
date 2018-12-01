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
  </div>
</template>

<script>
import axios from 'axios'
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
    axios.get(`/api/insurer/risks/${this.$route.params.id}/`).then(data => {
      loader.close()
      for (const field of data.data['field_set']){
        if (field.type === 'checkbox') {
          this.submission[field.id] = []
        }
      }
      this.insuranceDetail = data.data
    })
  }
}
</script>
