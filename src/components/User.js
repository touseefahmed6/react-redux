import React from 'react'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
// include blueprint-icons.css for icon font support
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { Spinner } from '@blueprintjs/core';
export default function User(props) {
  
  return (
    <div>
      <h1>User Component</h1>
      <h4>{props.data.fullName}</h4>
      <Spinner intent='primary'/>
    </div>
  )
}
