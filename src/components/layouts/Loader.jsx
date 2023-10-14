import React from 'react'

export default function Loader() {
  return (
    <div className="text-center fw-bold fs-4 d-flex justify-content-center align-items-center" style={{"padding": "150px 150px"}}>
        <div className="spinner-border me-2" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div>Cargando...</div>
      </div>
  )
}
