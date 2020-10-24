// import axios from "axios"

class CertificationService {
    getAll() {
        // return axios.get('/certificates', certification)
        return certificates
    }

    get(certificateId) {
        console.log(certificateId)
        // return axios.get('/certificates/${certificateId}', certification)

        return certificates.find(certificate => certificate.id === certificateId)
    }

    create(certification) {
        //Enable axios when backend is ready
        // return axios.post('/', certification)
        console.log(certification)
        return {
            id: new Date().getTime(),
            ...certification
        } //force return last id as timestamp to be unique
    }

    delete(certificationId) {
        // return axios.delete('/certificates/${certificateId}', certification)
        console.log(certificationId)
        return true
    }

    deleteMultiple(certificationIds) {
        // return axios.post('/certificates/delete-multiple', certificationIds)
        console.log(certificationIds)
        return true
    }
}

const certificates = [
    {
        id: 1,
        name: "ENDUSER",
        type: "Sub CA",
        selectavailablekeyalgorithms: ["DSA"],
        selectavailableeccurves: [],
        selectavailablebitlengths: [],
        selectsignaturealgorithm: [],
        textfieldvalidity: "",
        checkusecertificatevalidityoffsetgroup: false,
        checkuseexpirationtrestrictionforweekdays: false
    },
    {
        id: 2,
        name: "OCSPSIGNER",
        type: "Sub CA",
        selectavailablekeyalgorithms: ["DSA"],
        selectavailableeccurves: [],
        selectavailablebitlengths: [],
        selectsignaturealgorithm: [],
        textfieldvalidity: "",
        checkusecertificatevalidityoffsetgroup: false,
        checkuseexpirationtrestrictionforweekdays: false
    },
    {
        id: 3,
        name: "ROOTCA",
        type: "Sub CA",
        selectavailablekeyalgorithms: ["DSA"],
        selectavailableeccurves: [],
        selectavailablebitlengths: [],
        selectsignaturealgorithm: [],
        textfieldvalidity: "",
        checkusecertificatevalidityoffsetgroup: false,
        checkuseexpirationtrestrictionforweekdays: false
    },
    {
        id: 4,
        name: "SERVER",
        type: "Sub CA",
        selectavailablekeyalgorithms: ["DSA"],
        selectavailableeccurves: [],
        selectavailablebitlengths: [],
        selectsignaturealgorithm: [],
        textfieldvalidity: "",
        checkusecertificatevalidityoffsetgroup: false,
        checkuseexpirationtrestrictionforweekdays: false
    }
]

export default new CertificationService();