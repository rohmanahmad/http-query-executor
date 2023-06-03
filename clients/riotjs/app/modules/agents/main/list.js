import {
    cancelAllRequest,
} from 'services/SDK/main'
import {
    UserAgenList,
    ChangeRoleAgent,
    getListRole,
    BlockAgenUser,
    UnBlockAgenUser,
    RemoveUserAgent
} from 'appModule/agents/agents.sdk'
import { goTo } from 'helpers/ma'
let limit = 10
const component = [
    "user.create",
]
export default {
    onBeforeMount() {
        cancelAllRequest()
    },
    onMounted() {
        console.log('mounting pending list')
        this.listtotal = 1
        this.tipePage = '---'
        this.isLoading = true
        this.pagelimit = limit;
        this.pagination = { page: 1 }
        this.MenuAddUser = false
        this.paginationpage = this.pagination.page
        this.render()
        this.renderListRole()
        this.update()
    },
    render() {
        const data = {
            limit: this.pagelimit,
            page: (this.paginationpage < 1) ? 1 : this.paginationpage,
            sort: (this.tipePage === '---') ? '' : this.tipePage,
        }
        UserAgenList(data)
            .then((response) => {
                if (!localStorage.access) {
                    goTo('logout')
                }
                let access = JSON.parse(localStorage.access);
                _.filter(access, (val) => {
                    if (component.indexOf(val) > -1) {
                        this.MenuAddUser = true;
                    }
                })
                this.listtotal = response.data.total;

                this.paginations = this.listtotal / this.pagelimit;
                const data = response.data
                this.actions = data.actions;
                this.items = data.items;
                this.paginprev = [data.pagination.prev];
                this.paginnext = [data.pagination.next];
                this.pagcurrent = data.pagination.current
                this.isLoading = false
                this.update()
            })
    },
    renderListRole() {
        getListRole()
            .then((response) => {
                this.selectRole = (response.data.items)
                this.update()
            })
    },
    Action(e, val) {
        if (val === 'block') {
            this.Block(e, "Block")
        }

        if (val === 'unblock') {
            this.UnBlock(e, "Unblock")
        }

        if (val === 'change') {
            this.Change(e)
        }

        if (val === 'delete') {
            this.Delete(e)
        }
    },
    Change(e) {
        var namerole = (e.role.name)
        const val = _.map(this.selectRole, (val) => {
            if (val.name.toLowerCase() === namerole.toLowerCase()) {
                val.name = val.name
                val.checked = true
            } else {
                val.name = val.name
                val.checked = false
            }
            return val
        })
        this.userid = e.userid
        this.namevalue = e.name;
        // setTimeout(()=>{
        $('#modalChange').modal('show');
        // },1)
        this.update()
    },
    Delete(e) {
        const data = {
            userid: e.userid
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Deleted'
        }).then((result) => {
            if (result.value) {
                this.isLoadingfull = true;
                this.update()
                RemoveUserAgent(data)
                    .then((response) => {
                        this.isLoadingfull = false;
                        this.update()
                        Swal
                            .fire(
                                response.message,
                                '',
                                'success'
                            )
                        this.render()
                    })
                    .catch((error) => {
                        Swal
                            .fire(
                                'Error!',
                                error.error,
                                'error'
                            )
                    })
            }
        })
    },
    Block(e, val) {
        const data = {
            userid: e.userid
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: val
        }).then((result) => {
            if (result.value) {
                this.isLoadingfull = true;
                this.update()
                BlockAgenUser(data)
                    .then((response) => {
                        this.isLoadingfull = false;
                        this.update()
                        Swal.fire(
                            response.message,
                            '',
                            'success'
                        )
                        this.render()
                    })
                    .catch((err) => {
                        console.error(err)
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: err.message || err.error || 'Server Not Responding',
                            // footer: '<a href>Why do I have this issue?</a>'
                        })
                    })
            }
        })
    },
    UnBlock(e, val) {
        const data = {
            userid: e.userid
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: val
        }).then((result) => {
            if (result.value) {

                this.isLoadingfull = true;
                this.update()
                UnBlockAgenUser(data)
                    .then((response) => {
                        this.isLoadingfull = false;
                        this.update()
                        Swal.fire(
                            response.message,
                            '',
                            'success'
                        )
                        this.render()
                    })
                    .catch((err) => {
                        console.error(err)
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: err.message || err.error || 'Server Not Responding',
                            // footer: '<a href>Why do I have this issue?</a>'
                        })
                    })
            }
        })
    },
    changeLimit(e) {
        this.isLoading = true
        this.paginationpage = 0
        this.pagelimit = (e.target.value)
        this.render()
        this.update()
    },
    changeType(e) {
        this.tipePage = (e.target.value)
        this.render()
        this.update()
    },
    forward(e) {
        this.isLoading = true
        this.paginationpage++
        this.render()
        this.update()
    },
    first() {
        this.isLoading = true
        this.paginationpage--
        this.render()
        this.update()
    },
    SearchId(e) {
        e.preventDefault()
        this.isLoading = true;
        this.paginationpage = 1
        this.update()
        const data = {
            limit: this.pagelimit,
            page: this.paginationpage,
            userid: this.$('#searchAgent').value
        }
        UserAgenList(data)
            .then((response) => {
                const data = response.data
                this.actions = data.actions;
                this.items = data.items;
                this.isLoading = false
                this.update()
            })
    },
    save(e) {
        const data = {
            userid: this.userid,
            role: this.userRole
        }
        ChangeRoleAgent(data)
            .then((response) => {
                Swal.fire(
                    response.message,
                    '',
                    'success'
                )
                this.render()
            })
            .catch((err) => {
                console.error(err)
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: err.message || err.error || 'Server Not Responding',
                    // footer: '<a href>Why do I have this issue?</a>'
                })
            })
    },
    changeRole(e) {
        var nameRoleval = (e.target.value);
        this.userRole = nameRoleval;
        this.update();
    }
}