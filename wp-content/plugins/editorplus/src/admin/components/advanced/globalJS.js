import React, { useState } from 'react'
import CodeEditor from '../code-editor/index'

function GlobalJS(props) {

    const classes = `ep-global-js ${props.disabled ? 'is-loading' : ''}`

    return (
        <div className={classes}>
            <h1 className="ep-heading">Custom JS</h1>
            <CodeEditor
                readOnly={props.disabled}
                mode="css"
                onChange={props.onChange}
                value={props.value}
                maxLines={20}
                minLines={5}
                fontSize="18px"
                height="800px"
            />
        </div>
    )
}

export default GlobalJS;