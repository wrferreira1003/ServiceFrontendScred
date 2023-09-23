import * as XLSX from 'xlsx';


export function downloadExcel(data:any) {
  // Crie um novo workbook
  const wb = XLSX.utils.book_new();

  // Converta os dados para uma folha de cálculo
  const ws = XLSX.utils.json_to_sheet(data);

  // Adicione a folha de cálculo ao workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Escreva o workbook e faça o download
  XLSX.writeFile(wb, "data.xlsx");
}





