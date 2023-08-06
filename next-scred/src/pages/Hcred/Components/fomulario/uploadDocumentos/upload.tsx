import { useEffect, useState } from 'react';
import { useFileContext } from '../../../../../context/FileContext';
import UploadDocumentos from './uploadDocumentos';

export default function Upload(){
  
  const {parentFiles, setParentFiles} = useFileContext();
  const [fileState, setFileState] = useState<File[]>([]);

  useEffect(() => {
    const onlyFiles = parentFiles.map(item => item.file);
    setFileState(onlyFiles);
  }, [parentFiles]);

  return(
    < UploadDocumentos/>
  )
} 