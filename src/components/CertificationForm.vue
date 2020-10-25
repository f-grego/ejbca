<template>
  <b-card>
    <b-card-body>
      <b-alert
          v-model="showSuccess"
          dismissible
          variant="success"
      >
        Certification Saved
      </b-alert>

      <b-button v-if="!editMode" variant="primary" class="float-right" @click="edit(true)">
        <b-icon icon="pencil"></b-icon>
        Edit
      </b-button>
      <div v-else class="float-right">
        <b-button  size="sm" variant="secondary" class="mr-3" @click="edit(false)">
          <b-icon icon="chevron-compact-left"></b-icon>Back
        </b-button>
        <b-button  variant="primary" @click="save">
          <b-icon icon="pencil"></b-icon>Save
        </b-button>
      </div>
      <b-form class="pull-left">
        <b-form-group>
          <label>Certificate Profile ID:</label>
          <span>{{ certificate.id }}</span>
        </b-form-group>
        <b-form-group v-if="editMode">
          <label>Name:</label>
          <input v-model="certificateClone.name" >
        </b-form-group>
        <b-form-group>
          <label>Type:</label>
          <span v-if="!editMode">{{ certificate.type }}</span>
          <b-button-group v-else>
            <b-button @click="setType('End Entity')" class="mr-2" :class="{active: isSelected('End Entity')}">
              <b-icon icon="check" v-if="isSelected('End Entity')"></b-icon> End Entity
            </b-button>
            <b-button @click="setType('Sub CA')" class="mr-2" :class="{active: isSelected('Sub CA')}">
              <b-icon icon="check" v-if="isSelected('Sub CA')"></b-icon> Sub CA
            </b-button>
            <b-button @click="setType('Root CA')" :class="{active: isSelected('Root CA')}">
              <b-icon icon="check" v-if="isSelected('Root CA')"></b-icon> Root CA
            </b-button>
          </b-button-group>
        </b-form-group>
        <b-form-group>
          <label> Available Key Algorithms <a href="#" v-b-tooltip.hover title="Click to open the relevant section in the help window.">[?]</a>:</label>
          <span v-if="!editMode">{{ certificate.selectavailablekeyalgorithms.join() }}</span>
          <b-select v-else v-model="certificateClone.selectavailablekeyalgorithms" multiple>
            <b-select-option value="DSA">DSA</b-select-option>
            <b-select-option value="ECDSA">ECDSA</b-select-option>
            <b-select-option value="RSA">RSA</b-select-option>
          </b-select>
        </b-form-group>
        <b-form-group>
          <label> Available ECDSA curves <a href="#" v-b-tooltip.hover title="Click to open the relevant section in the help window.">[?]</a>:</label>
          <span v-if="!editMode">{{ certificate.selectavailableeccurves.join() }}</span>
          <b-select v-else v-model="certificateClone.selectavailableeccurves" multiple>
            <b-select-option value="ANY_EC_CURVE">Any allowed by bit lengths</b-select-option>
            <b-select-option value="FRP256v1">FRP256v1</b-select-option>
            <b-select-option value="FRP256v1">FRP256v1</b-select-option>
            <b-select-option value="GostR3410-2001-CryptoPro-A">GostR3410-2001-CryptoPro-A / GostR3410-2001-CryptoPro-XchA</b-select-option>
            <b-select-option value="GostR3410-2001-CryptoPro-B">GostR3410-2001-CryptoPro-B</b-select-option>
            <b-select-option value="GostR3410-2001-CryptoPro-C">GostR3410-2001-CryptoPro-C / GostR3410-2001-CryptoPro-XchB</b-select-option>
          </b-select>
        </b-form-group>
        <b-form-group>
          <label> Available Bit Lengths <a href="#" v-b-tooltip.hover title="Click to open the relevant section in the help window.">[?]</a>:</label>
          <span v-if="!editMode">{{ certificate.selectavailablebitlengths.join() }}</span>
          <b-select v-else v-model="certificateClone.selectavailablebitlengths" multiple>
            <b-select-option value="0">0 bits</b-select-option>
            <b-select-option value="192">192 bits</b-select-option>
            <b-select-option value="224">224 bits</b-select-option>
            <b-select-option value="239">239 bits</b-select-option>
            <b-select-option value="256">256 bits</b-select-option>
            <b-select-option value="384">384 bits</b-select-option>
          </b-select>

        </b-form-group>
        <b-form-group>
          <label> Signature Algorithm:</label>
          <span v-if="!editMode">{{ certificate.selectsignaturealgorithm }}</span>
          <b-select v-else v-model="certificateClone.selectsignaturealgorithm">
            <b-select-option value="null">Inherit from issuing CA</b-select-option>
            <b-select-option value="SHA256WithRSA">SHA256WithRSA</b-select-option>
            <b-select-option value="SHA384WithRSA">SHA384WithRSA</b-select-option>
            <b-select-option value="SHA512WithRSA">SHA512WithRSA</b-select-option>
            <b-select-option value="SHA3-256withRSA">SHA3-256withRSA</b-select-option>
            <b-select-option value="SHA256withRSAandMGF1">SHA256withRSAandMGF1</b-select-option>
          </b-select>
        </b-form-group>
        <b-form-group>
          <label> Validity or end date of the certificate <a href="#" v-b-tooltip.hover title="Click to open the relevant section in the help window.">[?]</a>:</label>
          <span v-if="!editMode">{{ certificate.textfieldvalidity }}</span>
          <div v-else >
            <b-input v-model="certificateClone.textfieldvalidity" />
            <small>ISO 8601 date: [yyyy-MM-dd HH:mm:ssZZ]: '2020-10-25 15:26:04+00:00' <br/> (*y *mo *d *h *m *s) - y=365 days, mo=30 days</small>
          </div>
        </b-form-group>
        <b-form-group>
          <label>Validity Offset <a href="#" v-b-tooltip.hover title="Click to open the relevant section in the help window.">[?]</a>:</label>
          <span v-if="!editMode">{{ certificate.checkusecertificatevalidityoffsetgroup }}</span>
          <b-checkbox v-else v-model="certificateClone.checkusecertificatevalidityoffsetgroup" value="On" unchecked-value="Off">
            Use ...
          </b-checkbox>
        </b-form-group>
        <b-form-group>
          <label>Expiration Restrictions <a href="#" v-b-tooltip.hover title="Click to open the relevant section in the help window.">[?]</a>:</label>
          <span v-if="!editMode">{{ certificate.checkuseexpirationtrestrictionforweekdays }}</span>
          <b-checkbox v-else v-model="certificateClone.checkuseexpirationtrestrictionforweekdays" value="On" unchecked-value="Off">
            Use ...
          </b-checkbox>
        </b-form-group>

      </b-form>
    </b-card-body>
  </b-card>
</template>

<script>
import CertificationService from "@/services/CertificationService";
export default {
  name: "CertificationForm.vue",
  props: {
    certificate: {
      required: true,
      type: Object
    }
  },
  data: () => ({
    certificateClone: {},
    editMode: false,
    showSuccess: false
  }),
  mounted() {
    this.certificateClone = {...this.certificate}
    this.$root.$emit("setTitle", `View Certificate ${this.certificate.name}`)
  },
  methods: {
    edit(flag) {
      const keyword = flag ? "Edit" : "View"
      const title = `${keyword} Certificate ${this.certificate.name}`
      this.$root.$emit("setTitle", title)

      this.certificateClone = {...this.certificate}

      this.editMode = flag
    },
    setType(type) {
      this.certificateClone = {
        ...this.certificateClone,
        ...{type: type}
      }
    },
    isSelected(type) {
      return this.certificateClone.type === type
    },
    save() {
      const certificate = CertificationService.save(this.certificateClone)
      this.$root.$emit("certification-saved", certificate)
      this.edit(false)
      this.showSuccess = true
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2)
}
.card .form-group {
  text-align: left;
}

.card form label {
  width:100%;
  font-weight: bold;
}

.btn.active{
  background-color: #007bff !important
}
</style>