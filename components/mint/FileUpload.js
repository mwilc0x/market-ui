import React, { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone';
import { create } from 'ipfs-http-client';
import Image from 'next/image';

const creds = `${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}:${process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET}`;
const credsBased = btoa(creds);
const authorization = `Basic ${credsBased}`;

let ipfs;
try {
  ipfs = create({
    url: `${process.env.NEXT_PUBLIC_INFURA_IPFS_API}/api/v0`,
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

export default function FileUpload({ file, setFile, uploadedMetadata }) {
    const onDrop = useCallback(acceptedFiles => {
        if (!!uploadedMetadata) {
          return;
        }

        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = async () => {
              try {
                const result = await ipfs.add(Buffer.from(reader.result));
                const imageDetails = { 
                  href: `${process.env.NEXT_PUBLIC_INFURA_DEDICATED_GATEWAY}/ipfs/${result.path}`, 
                  name: file.name 
                };
                setFile(imageDetails);
              } catch (e) {
                console.log('Error reading the onload buffer.', e);
              }
            }
            reader.readAsArrayBuffer(file); 
          })
      }, []);
      const {getRootProps, getInputProps } = useDropzone({
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
          { file && <Image 
            alt={file.name} 
            width={400} 
            height={400} 
            src={file.href} />
          }
          <input {...getInputProps()} />
          {
            !file ?
              <p>Drag and drop some files here, or click to select files</p> :
              null
          }
        </div>
      )
};
