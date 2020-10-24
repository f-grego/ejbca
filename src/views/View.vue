<template>
  <b-container>
    <b-row class="pt-3">
      <b-col>
        <certification-form></certification-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CertificationForm from "../components/CertificationForm"
export default {
  components: {
    CertificationForm
  },
  data: () => ({

  })
}
</script>