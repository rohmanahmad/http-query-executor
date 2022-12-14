const sqlScript = document.getElementById('sql-script')
const bindKeys = document.getElementById('bind-keys')
const bindValues = document.getElementById('bind-values')
const wrapValues = document.getElementById('wrap-values')

const childTemplate = `
<div class="form-group">
    <div class="input-group mb-3 mg-t-5">
        <input type="text" class="form-control" id="bind-keys[]" value="{kk}">
        <select class="form-control m-wd-70 bg-darkorange text-white">
            <option value="str">str</option>
            <option value="int">int</option>
            <option value="bool">bool</option>
        </select>
        <input type="text" class="form-control" id="bind-values[]" value="{vv}">
    </div>
</div>
`
function randomString (length) {
    var result           = '{';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result += '}'
    return result;
}

function appendBindValue (key, value='') {
    wrapValues.innerHTML += (
        childTemplate
            .replace('{kk}', key)
            .replace('{vv}', value)
    )
}

function addValue () {
    appendBindValue(randomString(3), 'NOT SET')
}

function reset () {
    wrapValues.innerHTML = ''
    sqlScript.value = ''
}

function init () {
    reset()
    sqlScript.value = 'SELECT * FROM table_name WHERE id={id} and created_at={dateCreated}'
    appendBindValue('{id}', 10)
    appendBindValue('{dateCreated}', '2020-01-01 00:00')
}

init()