const sqlScript = document.getElementById('sql-script')
const bindKeys = document.getElementsByName('bind-keys[]')
const bindValues = document.getElementsByName('bind-values[]')
const bindTypes = document.getElementsByName('bind-types[]')
const wrapValues = document.getElementById('wrap-values')

const childTemplate = `
<div class="form-group">
    <div class="input-group mb-3 mg-t-5">
        <input type="text" class="form-control" name="bind-keys[]" value="{kk}">
        {{selectType}}
        <input type="text" class="form-control" name="bind-values[]" value="{vv}">
    </div>
</div>
`
const acceptedTypes = ['str', 'int', 'bool']

function generateSelectType (type) {
    let sel = `<select class="form-control m-wd-70 bg-darkorange text-grey" name="bind-types[]">`
    for (const v of acceptedTypes) {
        const isSelected = (v == type)
        sel += `<option value="${v}" ${isSelected ? "selected" : ""}>${v}</option>`
    }
    sel += `</select>`
    return sel
}

function randomString (length) {
    var result           = '[';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result += ']'
    return result;
}

function appendBindValue (key, value='', type='str') {
    const selectHTML = generateSelectType(type)
    wrapValues.innerHTML += (
        childTemplate
            .replace('{kk}', key)
            .replace('{vv}', value)
            .replace('{{selectType}}', selectHTML)
    )
    const lastChilds = bindTypes[bindTypes.length -1]
    lastChilds.selectedIndex = acceptedTypes.indexOf(type)
    console.log(key, type, selectHTML)
}

function addValue () {
    appendBindValue(randomString(3), 'NOT SET')
}

function reset () {
    wrapValues.innerHTML = ''
    sqlScript.value = ''
}

function execute () {
    const sql = new SQL(sqlScript.value)
    const params = {}
    for (let index = 0; index < bindValues.length; index++) {
        const key = bindKeys[index].value
        const type = bindTypes[index].value
        const value = bindValues[index].value
        if (key) params[key] = {type, value}
    }
    sql.setParams(params)
    sql.execute()
}

function init () {
    reset()
    sqlScript.value = 'SELECT * FROM table_name WHERE id={id} and created_at={dateCreated}'
    appendBindValue('id', 10, 'int')
    appendBindValue('dateCreated', '2020-01-01 00:00', 'str')
}

init()