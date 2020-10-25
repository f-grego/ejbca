<template>
  <b-container>
    <b-row class="pt-3">
      <b-col>
        <certification-form v-if="loaded" :certificate="certificate"></certification-form>
        <b-icon v-else icon="circle-fill" animation="throb" font-scale="4"></b-icon>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CertificationForm from "../components/CertificationForm"
import CertificationService from "@/services/CertificationService";
import router from "@/router";
export default {
  components: {
    CertificationForm
  },
  data: () => ({
    certificate: {}
  }),
  mounted() {
    this.certificate = CertificationService.get(this.$route.params.id)

    if(typeof this.certificate === "undefined") {
      this.certificate = this.$root.newCertificates.find( cert => cert.id === this.$route.params.id)
      console.log(this.certificate)
      if(typeof this.certificate === "undefined")
        router.push("/")
    }
    this.$root.$on("certification-saved", certificate => {
      this.certificate = certificate
    })
  },
  computed: {
    loaded() {
      return Object.keys(this.certificate).length > 0
    }
  }
}
</script>