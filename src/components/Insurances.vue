<template>
  <div>
    <h2>Insurances</h2>
    <div class="columns is-multiline ">
      <div class="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen"
            v-for="(insurance, key) in insuranceList" :key="key">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              {{ insurance.name }}
            </p>
          </header>
          <div class="card-content">
            {{ insurance.description }}
          </div>
          <footer class="card-footer">
            <router-link :to="`/${insurance.id}`" class="card-footer-item">Open</router-link>
          </footer>
        </div>
      </div>
    </div>
      <router-link to="/new" class="button">
        Create New Risk
      </router-link>
  </div>
</template>

<script>
export default {
  name: 'Insurance List',
  data () {
    return {
      insuranceList: []
    }
  },
  mounted () {
    const loader = this.$loading.open()
    this.$axios.get('http://localhost:8000/insurer/risks/').then(response => {
      this.insuranceList = response.data
      loader.close()
    })
  }
}
</script>
