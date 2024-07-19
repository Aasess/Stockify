import React from 'react'

const NoRecordFound = () => {
  return (
    <div className="fs-4 text-center d-flex w-100 flex-column align-items-center">
      <img
        src="/no-record-found.jpg"
        width="400"
        height="400"
        alt="no record found"
      />
      <p>No Records Found</p>
    </div>
  )
}

export default NoRecordFound
