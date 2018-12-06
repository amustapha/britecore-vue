<template>
  <div id="app">
    <nav class="navbar is-info" role="navigation" aria-label="main navigation" id="navbarBasicExample">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item" tag="b">BRITECORE</router-link>

          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <router-link to="/" class="navbar-item">Risks</router-link>
            <router-link to="/new-risk" class="navbar-item">New Risk</router-link>
          </div>
        </div>
      </nav>
      <div class="section">
        <router-view/>
      </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

  <style>
  h1, h2, h3 { font-weight: bold }
  h1 {
    font-size: 2.4em;
  }
  h2 {
    font-size: 2em;
  }
  h3 {
    font-size: 1.7em;
  }

  .mute {
    color: #777;
  }
  .mb {
    display: block;
    margin-bottom: 24px;
  }
  </style>
