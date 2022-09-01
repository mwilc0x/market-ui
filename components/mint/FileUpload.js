import React, { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone';
import { create, CID } from 'ipfs-http-client';
import Image from 'next/image';

const creds = `${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}:${process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET}`;
const credsBased = btoa(creds);
const authorization = `Basic ${credsBased}`;

let ipfs;
try {
  ipfs = create({
    url: 'https://ipfs.infura.io:5001/api/v0',
    headers: {
      authorization,
    }
  });
} catch (error) {
  console.error('IPFS init error.', error);
  ipfs = null;
}

function fileSizeValidator(file) {
  if (file.size > 10000000) {
    return {
      code: 'size-too-large',
      message: 'Size is larger than 10mb.'
    };
  }

  return null
}

export default function FileUpload({ setFile }) {
    const [image, setImage] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = async () => {
              try {
                const binaryStr = reader.result;
                const result = await ipfs.add(Buffer.from(binaryStr));
                console.log('infura upload result:', result);
                setImage({ infura: result, name: file.name });
                setFile(true);
              } catch (e) {
                console.log('error reading the onload buffer');
              }
            }
            reader.readAsArrayBuffer(file); 
          })
      }, [setFile]);
      const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
          'image/*': ['.jpg', '.jpeg', '.png'],
        },
        validator: fileSizeValidator
      })
    
      return (
        <div {...getRootProps()} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            height: 420,
            width: 420, 
            outlineStyle: 'dotted', 
            outlineColor: '#3498db',
            cursor: 'pointer'
          }}>
          { image && <Image 
            alt={image.name} 
            width={400} 
            height={400} 
            src={`https://solprint.infura-ipfs.io/ipfs/${image.infura.path}`} />
          }
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
