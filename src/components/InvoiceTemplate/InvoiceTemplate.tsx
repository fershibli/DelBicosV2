export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerCpf: string;
  customerAddress: string;
  professionalName: string;
  professionalCpf: string;
  serviceName: string;
  serviceDescription: string;
  servicePrice: number;
  serviceDate: string;
  serviceTime: string;
  total: number;
  // Novos campos para melhor rastreabilidade
  paymentMethod?: string;
  transactionId?: string;
  dueDate?: string;
  observations?: string;
}

/**
 * Formata valores monetários para o padrão brasileiro
 * @param value - Valor numérico
 * @returns String formatada em R$ XX,XX
 */
const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

/**
 * Valida se os dados obrigatórios estão presentes
 * @param data - Dados da nota fiscal
 * @returns true se válidos
 */
const validateInvoiceData = (data: InvoiceData): boolean => {
  const requiredFields = [
    'invoiceNumber',
    'customerName',
    'customerCpf',
    'professionalName',
    'serviceName',
    'total',
  ];

  return requiredFields.every((field) => data[field as keyof InvoiceData]);
};

const InvoiceTemplate = (invoiceData: InvoiceData): string => {
  // Validar dados antes de gerar o template
  if (!validateInvoiceData(invoiceData)) {
    throw new Error('Dados obrigatórios da nota fiscal estão ausentes');
  }

  return `
    <html>
      <head>
        <meta charset="utf-8">
        <title>Nota Fiscal - DelBicos</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
          }
          
          .header {
            text-align: center;
            border-bottom: 3px solid #4A90E2;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #4A90E2;
            margin-bottom: 10px;
          }
          
          .invoice-title {
            font-size: 24px;
            color: #333;
            margin-bottom: 5px;
          }
          
          .invoice-number {
            font-size: 16px;
            color: #666;
          }
          
          .section {
            margin-bottom: 25px;
            padding: 15px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background-color: #fafafa;
          }
          
          .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #4A90E2;
            margin-bottom: 10px;
            border-bottom: 1px solid #4A90E2;
            padding-bottom: 5px;
          }
          
          .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            padding: 5px 0;
          }
          
          .info-label {
            font-weight: bold;
            color: #555;
            width: 40%;
          }
          
          .info-value {
            color: #333;
            width: 60%;
            text-align: right;
          }
          
          .service-details {
            background-color: #f0f8ff;
            border: 1px solid #4A90E2;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
          }
          
          .total-section {
            background-color: #4A90E2;
            color: white;
            text-align: center;
            padding: 20px;
            border-radius: 8px;
            margin-top: 30px;
          }
          
          .total-amount {
            font-size: 32px;
            font-weight: bold;
            margin-top: 10px;
          }
          
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e0e0e0;
            color: #666;
            font-size: 14px;
          }
          
          .datetime {
            text-align: right;
            color: #666;
            font-size: 14px;
            margin-bottom: 20px;
          }
          
          @media print {
            body {
              margin: 0;
              padding: 10px;
            }
          }
        </style>
      </head>
      <body>
        <div class="datetime">
          Emitido em: ${new Date().toLocaleString('pt-BR')}
        </div>
        
        <div class="header">
          <div class="logo">DelBicos</div>
          <div class="invoice-title">Nota Fiscal de Serviço</div>
          <div class="invoice-number">Nº ${invoiceData.invoiceNumber}</div>
        </div>

        <div class="section">
          <div class="section-title">Dados do Cliente</div>
          <div class="info-row">
            <span class="info-label">Nome:</span>
            <span class="info-value">${invoiceData.customerName}</span>
          </div>
          <div class="info-row">
            <span class="info-label">CPF:</span>
            <span class="info-value">${invoiceData.customerCpf}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Endereço:</span>
            <span class="info-value">${invoiceData.customerAddress}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Dados do Prestador de Serviço</div>
          <div class="info-row">
            <span class="info-label">Nome:</span>
            <span class="info-value">${invoiceData.professionalName}</span>
          </div>
          <div class="info-row">
            <span class="info-label">CPF:</span>
            <span class="info-value">${invoiceData.professionalCpf}</span>
          </div>
        </div>

        <div class="service-details">
          <div class="section-title">Detalhes do Serviço</div>
          <div class="info-row">
            <span class="info-label">Serviço:</span>
            <span class="info-value">${invoiceData.serviceName}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Descrição:</span>
            <span class="info-value">${invoiceData.serviceDescription}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Data do Serviço:</span>
            <span class="info-value">${invoiceData.serviceDate}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Horário:</span>
            <span class="info-value">${invoiceData.serviceTime}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Valor do Serviço:</span>
            <span class="info-value">${formatCurrency(invoiceData.servicePrice)}</span>
          </div>
        </div>

        <div class="total-section">
          <div style="font-size: 20px;">Valor Total</div>
          <div class="total-amount">${formatCurrency(invoiceData.total)}</div>
        </div>

        <div class="footer">
          <p>Esta é uma nota fiscal eletrônica gerada pelo DelBicos</p>
          <p>Plataforma de serviços profissionais</p>
          <p>www.delbicos.com.br</p>
        </div>
      </body>
    </html>
  `;
};

export default InvoiceTemplate;
