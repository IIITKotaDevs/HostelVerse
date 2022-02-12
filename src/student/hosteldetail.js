import React from 'react'
import { useParams } from 'react-router-dom'

function HostelDetail(id) {
    const params = useParams();
  return (
    <div>{params.id}</div>
  )
}

export default HostelDetail