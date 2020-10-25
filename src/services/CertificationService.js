// import axios from "axios"

class CertificationService {
    getAll() {
        // return axios.get('/certificates', certification)
        return certificates
    }
    //newCertificate added for presentation in order to handle new certificates edit
    get(certificateId, newCertificate = null) {
        // return axios.get('/certificates/${certificateId}', certification)
        if(newCertificate !== null)
            return newCertificate
        return certificates.find(certificate => certificate.id === +certificateId)
    }

    create(certification) {
        //Enable axios when backend is ready
        // return axios.post('/', certification)
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

    save(certification) {
        // return axios.post('/', certification)

        return certification
    }
}

export const defaultItem = {
    name: "",
    type: "",
    selectavailablekeyalgorithms: [],
    selectavailableeccurves: [],
    selectavailablebitlengths: [],
    selectsignaturealgorithm: "",
    textfieldvalidity: "",
    checkusecertificatevalidityoffsetgroup: "Off",
    checkuseexpirationtrestrictionforweekdays: "Off"
}

const certificates = [
    {
        id: 1,
        name: "ENDUSER",
        type: "Sub CA",
        selectavailablekeyalgorithms: ["DSA", "ECDSA"],
        selectavailableeccurves: ["ANY_EC_CURVE", "FRP256v1"],
        selectavailablebitlengths: ["0", "224"],
        selectsignaturealgorithm: "SHA256WithRSA",
        textfieldvalidity: "2y",
        checkusecertificatevalidityoffsetgroup: "On",
        checkuseexpirationtrestrictionforweekdays: "Off"
    },
    {
        id: 2,
        name: "OCSPSIGNER",
        type: "Sub CA",
        selectavailablekeyalgorithms: ["DSA"],
        selectavailableeccurves: ["ANY_EC_CURVE"],
        selectavailablebitlengths: ["224"],
        selectsignaturealgorithm: "SHA256WithRSA",
        textfieldvalidity: null,
        checkusecertificatevalidityoffsetgroup: "On",
        checkuseexpirationtrestrictionforweekdays: "Off"
    },
    {
        id: 3,
        name: "ROOTCA",
        type: "Sub CA",
        selectavailablekeyalgorithms: ["DSA"],
        selectavailableeccurves: ["GostR3410-2001-CryptoPro-A"],
        selectavailablebitlengths: ["192", "224"],
        selectsignaturealgorithm: "SHA384WithRSA",
        textfieldvalidity: null,
        checkusecertificatevalidityoffsetgroup: "Off",
        checkuseexpirationtrestrictionforweekdays: "On"
    },
    {
        id: 4,
        name: "SERVER",
        type: "Sub CA",
        selectavailablekeyalgorithms: ["DSA"],
        selectavailableeccurves: ["GostR3410-2001-CryptoPro-B"],
        selectavailablebitlengths: ["256"],
        selectsignaturealgorithm: "SHA256withRSAandMGF1",
        textfieldvalidity: null,
        checkusecertificatevalidityoffsetgroup: "Off",
        checkuseexpirationtrestrictionforweekdays: "Off"
    }
]

export default new CertificationService();