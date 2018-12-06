<template>
  <div>
    <b-table :columns="columns" :data="submissions"></b-table>
  </div>
</template>

<script>
export default {
  name: 'SubmittedList',
  data () {
    return {
      submissions: [],
      columns: []
    }
  },
  created () {
    const loader = this.$loading.open()
    this.$axios.get(`${this.$api}insurer/risks/${this.$route.params.id}/`).then(data => {
      loader.close()
      for (const field of data.data['field_set']) {
        this.columns.push({field: field.id.toString(), label: field.field})
      }
    })
    this.$axios.get(`${this.$api}insurer/submissions/${this.$route.params.id}/`).then(response => {
      loader.close()
      this.submissions = response.data
    }).catch(err => {
      loader.close()
      this.$toast.open({
        duration: 5000,
        message: `Unable to fetch<br/>${err.message}`,
        position: 'is-bottom',
        type: 'is-danger'
      })
      this.$router.push('/')
    })
  }
}
</script>
