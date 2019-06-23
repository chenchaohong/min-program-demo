export default {
    namespaced: true,
    state: {
        ywmkid: '1',
        formData: {}
    },
    mutations: {
        SET_YWMKID (state, ywmkid) {
            state.ywmkid = ywmkid
        },
        SET_FORMDATA (state, formData) {
            state.formData = formData
        }
    }
}
