<template>
  <b-modal id="new-certification" title="Add new certification" no-close-on-backdrop hide-footer>
    <ValidationObserver ref="form">
      <b-form @submit.prevent="create">
        <b-form-group>
          <label>Name:</label>
          <ValidationProvider name="name" rules="required|min:2">
            <div slot-scope="{ errors }">
              <b-input v-model="certificate.name"></b-input>
              <small class="text-danger">{{ errors[0] }}</small>
            </div>
          </ValidationProvider>
        </b-form-group>
        <b-form-group>
          <b-button variant="success" type="submit" class="float-right">
            Create
          </b-button>
        </b-form-group>
      </b-form>
    </ValidationObserver>
  </b-modal>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required, min } from "vee-validate/dist/rules";
import CertificationService from "@/services/CertificationService";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("min", {
  ...min,
  message: "This field is required"
});

const defaultItem = {
  name: ""
}

export default {
  name: "NewCertificateModal",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    certificate: { ...defaultItem }
  }),
  methods: {
    async create() {
      const success = await this.$refs.form.validate()
      if(!success)
        return

      const certificate = await CertificationService.create(this.certificate)
      this.$root.$emit("create-certificate", certificate)
      this.$bvModal.hide("new-certification")
      this.certificate = { ...defaultItem } //clear form
    }
  }
}
</script>