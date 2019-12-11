import React, { useState } from 'react'
import { Upload, Button, Icon } from 'antd'

import { storage, firestore } from '../../utils/firebaseHelper'

const UploadButton = () => {

  const [uploading, setUploading] = useState(false)
  const [fileList, setFileList]: any[] = useState([])

  const handleUpload = () => {
    const formData = new FormData()
    fileList.forEach((file: any, index: number) => {
      formData.append(`files[]`, file)
    })
    setUploading(true)

    let fileData = formData.getAll('files[]')

    
    console.log('fileData:', fileData)
    console.log('first file data:', fileData[0])
    //console.log('file name:', fileData!.name)
    //console.log('file list:', fileList)
    // implement upload logic
    //const fileRef = storage.child()
    //let metadata = {
    //  contentType: '.json'
    //}
    //storage.put(fileData)

  }

  const onRemove = (file: any) => {
    const index = fileList.indexOf(file)
    const newFileList = fileList.slice()
    newFileList.splice(index, 1)
    setFileList(newFileList)
  }

  const beforeUpload = (file: any) => {
    setFileList([...fileList, file])
    return false
  }

  return (
    <div>
      <Upload
        // multiple={false}
        fileList={fileList}
        onRemove={onRemove}
        beforeUpload={beforeUpload}
        >
        <Button>
          <Icon type="upload" /> Select File
        </Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </div>
  )
}

export default UploadButton
