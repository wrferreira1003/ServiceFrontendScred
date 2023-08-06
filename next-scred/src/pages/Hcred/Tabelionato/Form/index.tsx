import { useState } from 'react'
import HeaderService from '../../Components/headerService';
import NovoServico from '../../Components/NovoServicoGeral';
import ConsultaServico from '../../Components/ConsultaServico';
import ReconhecimentoVerdadeiro from '../../Components/ReconhecimentoVerdadeiro';
import ReconhecimentoSemelhanca from '../../Components/ReconhecimentoSemelhanca';
import { FileProvider } from '../../../../context/FileContext';
//import { Check } from '@phosphor-icons/react';

export default function Tabelionato(){
  const [servico, setServico] = useState('');
  const [subservico, setSubServico] = useState('');
  const [isDisable, setIsDisable] = useState(false);

  
  const handleServicoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setServico(event.target.value);
  }
  const handleSubServicoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSubServico(event.target.value);
  }

 
  return (
    <FileProvider>
    <div className=" w-4/5 mx-auto">
      <HeaderService 
        isDisabled = {isDisable}
        handleServicoChange={handleServicoChange}
        handleSubServicoChange={handleSubServicoChange}
      /> 
      {/* Solicitacao Novo Serviço */}
      {((subservico === 'Ata Notarial' || subservico === 'Emissão de Certidão' 
        || subservico === 'Escritura') && servico === 'Nova Solicitação') && (
  
        <NovoServico /> //Todo: Preciso receber os dados do componente
              
      )}
          
      {/* Solicitacao de consulta */}
      {((subservico === 'Ata Notarial' || subservico === 'Emissão de Certidão' 
        || subservico === 'Escritura') && servico === 'Solicitação de Consulta') && (
        
        <ConsultaServico />
        
        )}

      {/* Reconhecimento por Verdadeiro*/}
      {(subservico === 'Reconhecimento de Firma por Verdadeiro' && servico === 'Nova Solicitação') && (
        
          < ReconhecimentoVerdadeiro />
        
        )}

      {/* Reconhecimento por Verdadeiro*/}
      {(subservico === 'Reconhecimento de Firma por Semelhança' && servico === 'Nova Solicitação') && (
        
        <ReconhecimentoSemelhanca />

      )}
            
    </div> 
    </FileProvider>   
  )}