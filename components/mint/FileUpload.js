import React, { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone'

export default function FileUpload() {
    const [image, setImage] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
              const binaryStr = reader.result
              setImage(binaryStr);
            }
            reader.readAsDataURL(file); 
            reader.onloadend = async (e) => {
              try {
                const dataUrl = e.target.result;
                var b64 = dataUrl.split("base64,")[1];

                const result = await fetch('/api/mint', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                   'Content-Type': 'application/json' 
                  },
                  body: JSON.stringify({
                    name: file.name,
                    data: b64
                  })
                }).then(res => res.json());

                console.log(result);
              } catch (e) {
                console.log('error uploading image', e);
              }
            };
          })
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
      return (
        <div {...getRootProps()} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            height: 420,
            width: 420, 
            outlineStyle: 'dotted', 
            outlineColor: '#5856d6',
            cursor: 'pointer'
          }}>
          { image && <img style={{ height: 400, width: 400 }} src={image} />}
          <input {...getInputProps()} />
          {
            !image ?
              <p>Drag and drop some files here, or click to select files</p> :
              null
          }

          {/* {
            image ? <span style={{ position: 'relative', top: 0, right: 0 }}>X</span> : null
          } */}
        </div>
      )
};
