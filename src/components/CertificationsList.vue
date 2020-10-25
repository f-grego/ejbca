<template>
  <b-container>
    <b-row class="pt-3">
      <b-col>
        <md-table v-model="certificates" md-card @md-selected="select" md-sort="name" md-sort-order="asc">
          <md-table-toolbar v-show="count === 0">
            <b-button pill variant="primary" class="float-left" @click="addNew">
              <b-icon icon="plus"></b-icon>
              NEW
            </b-button>
          </md-table-toolbar>
          <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
            <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>
            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button" @click="deleteCertificates(selectedIds)">
                <md-icon>delete</md-icon>
              </md-button>
            </div>
          </md-table-toolbar>

          <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple">
            <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="" md-sort-by="actions">
              <md-button class="md-icon-button md-raised md-primary" @click="view(item)" v-b-tooltip.hover :title="`View ${item.name}`">
                <md-icon>info</md-icon>
              </md-button>

              <md-button class="md-icon-button md-raised md-accent" @click="deleteCertificates(item.id)"  v-b-tooltip.hover :title="`Delete ${item.name}` ">
                <md-icon>delete</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <h4 v-if="!hasCertificates" class="mt-3">No certifications found</h4>
      </b-col>
    </b-row>

    <new-certificate-modal></new-certificate-modal>
  </b-container>
</template>

<script>
import CertificationService from "@/services/CertificationService";
import NewCertificateModal from "@/components/modals/NewCertificateModal";
import router from "@/router";

export default {
  components: {
    NewCertificateModal
  },
  data: () => ({
    certificates: [],
    selectedIds: []
  }),
  async mounted() {
    // force choose user with id 1 for presentation
    this.certificates = await CertificationService.getAll(1)
    this.$root.$on("create-certificate", certicate =>
        this.certificates = [...this.certificates, certicate]
    )
  },
  methods: {
    addNew() {
      this.$bvModal.show("new-certification")
    },
    select(selected) {
      this.selectedIds = selected.map(item => item.id)
    },
    getAlternateLabel(count) {
      const plural = (count > 1) ? 's' : ''

      return `${count} certification${plural} selected`
    },
    view(certificate) {
      router.push({ name: "certificate", params: { id: certificate.id } })
    },
    async deleteCertificates(ids) {
      let result
      const idsArray = (typeof ids === "number") ? [ids] : ids
      const names = this.certificates.filter( item => idsArray.includes(item.id)).map(item => item.name)
      const res = await this.$dialog.confirm({ text: `Do you really want to delete ${names}?`})

      if (!res)
        return

      if (typeof ids === "number") {
        result = CertificationService.delete(ids)
      } else
        result = CertificationService.deleteMultiple(ids)

      if(!result) {

        return false
      }

      this.certificates = [...this.certificates].filter( certificate => !idsArray.includes(certificate.id))
    }
  },
  computed: {
    count() {
      return this.selectedIds.length
    },
    hasCertificates() {
      return this.certificates.length > 0
    }
  }
}
</script>

<style lang="scss" scoped>
small {
  display: block;
}
</style>