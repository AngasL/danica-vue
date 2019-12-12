/**
 * Created by rainyiwo on 2017/8/8.
 */

const mutations = {
    set_base(state, obj){
        state.base[obj.prop] = obj.val
    },
    set_butler(state, obj){
        state.butler[obj.prop] = obj.val
    },
    set_comment(state, obj){
        state.comment[obj.prop] = obj.val
    },

}

export default mutations
