<template>
  <div>
    <h1>Hello World! Sign in with {{spotifyId}}</h1>

    <button @click="logout()">Logout</button>
    <a href="/api/auth/spotify">Login</a>
  </div>
</template>

<script>
export default {
  computed: {
    spotifyId () {
      if(this.$store.state.auth.user != undefined) {
        return this.$store.state.auth.user.spotifyId
      } else {
        return 'no one'
      }
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>