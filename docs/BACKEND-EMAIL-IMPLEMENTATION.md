# Implementação Back-End - Funcionalidades de Email e Compartilhamento

## 📧 Endpoint para Envio de Email

### POST `/api/email/send-invoice`

**Descrição:** Envia nota fiscal por email com PDF anexado

**Body Request:**

```json
{
  "invoiceData": {
    "invoiceNumber": "NF12345",
    "date": "11/10/2025",
    "customerName": "João da Silva Santos",
    "customerCpf": "123.456.789-00",
    "customerAddress": "Rua das Flores, 123 - Centro - São Paulo/SP",
    "professionalName": "Maria Oliveira Costa",
    "professionalCpf": "987.654.321-00",
    "serviceName": "Limpeza Residencial Completa",
    "serviceDescription": "Limpeza completa de casa com 3 quartos",
    "servicePrice": 150.0,
    "serviceDate": "11/10/2025",
    "serviceTime": "14:00 - 17:00",
    "total": 150.0,
    "paymentMethod": "Cartão de Crédito",
    "transactionId": "TXN1728654321"
  },
  "recipientEmail": "cliente@email.com",
  "customerEmail": "João da Silva Santos"
}
```

**Response Success (200):**

```json
{
  "success": true,
  "message": "Email enviado com sucesso!",
  "emailId": "email_123456789"
}
```

**Response Error (400/500):**

```json
{
  "success": false,
  "message": "Erro ao enviar email"
}
```

---

## 🔗 Endpoint para Gerar Link Compartilhável

### POST `/api/invoice/generate-link`

**Descrição:** Gera link público para visualização/download da nota fiscal

**Body Request:**

```json
{
  "invoiceData": {
    // Mesmo objeto InvoiceData do endpoint anterior
  }
}
```

**Response Success (200):**

```json
{
  "success": true,
  "shareUrl": "https://api.delbicos.com/invoice/view/abc123def456",
  "expiresAt": "2025-10-18T14:30:00Z"
}
```

**Response Error (400/500):**

```json
{
  "success": false,
  "message": "Erro ao gerar link"
}
```

---

## 🛠️ Implementação Sugerida

### 1. **Serviço de Email**

```javascript
// services/emailService.js
const nodemailer = require('nodemailer');
const puppeteer = require('puppeteer');

const transporter = nodemailer.createTransporter({
  // Configuração do seu provedor de email
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function generateInvoicePDF(invoiceData) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // HTML da nota fiscal (mesmo template do React)
  const htmlContent = generateInvoiceHTML(invoiceData);

  await page.setContent(htmlContent);
  const pdf = await page.pdf({
    format: 'A4',
    margin: {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm',
    },
  });

  await browser.close();
  return pdf;
}

async function sendInvoiceEmail(invoiceData, recipientEmail) {
  const pdfBuffer = await generateInvoicePDF(invoiceData);

  const mailOptions = {
    from: '"DelBicos" <noreply@delbicos.com>',
    to: recipientEmail,
    subject: `Nota Fiscal DelBicos - ${invoiceData.invoiceNumber}`,
    html: `
      <h2>Nota Fiscal - DelBicos</h2>
      <p>Olá!</p>
      <p>Segue em anexo a nota fiscal do serviço realizado através da plataforma DelBicos.</p>
      <br>
      <p><strong>Detalhes do Serviço:</strong></p>
      <ul>
        <li>Serviço: ${invoiceData.serviceName}</li>
        <li>Profissional: ${invoiceData.professionalName}</li>
        <li>Data: ${invoiceData.serviceDate}</li>
        <li>Valor: R$ ${invoiceData.total.toFixed(2).replace('.', ',')}</li>
      </ul>
      <br>
      <p>Obrigado!</p>
      <p>---<br>DelBicos - Conectando você aos melhores profissionais</p>
    `,
    attachments: [
      {
        filename: `nota-fiscal-${invoiceData.invoiceNumber}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  };

  return await transporter.sendMail(mailOptions);
}
```

### 2. **Serviço de Links Compartilháveis**

```javascript
// services/shareService.js
const crypto = require('crypto');
const redis = require('redis'); // ou database de sua escolha

async function generateShareableLink(invoiceData) {
  // Gera ID único para o link
  const shareId = crypto.randomBytes(16).toString('hex');

  // Salva dados temporariamente (expira em 7 dias)
  await redis.setex(
    `invoice:${shareId}`,
    7 * 24 * 60 * 60, // 7 dias em segundos
    JSON.stringify(invoiceData),
  );

  const shareUrl = `${process.env.API_BASE_URL}/invoice/view/${shareId}`;

  return {
    shareUrl,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };
}
```

### 3. **Controllers**

```javascript
// controllers/emailController.js
app.post('/api/email/send-invoice', async (req, res) => {
  try {
    const { invoiceData, recipientEmail } = req.body;

    // Validações
    if (!invoiceData || !recipientEmail) {
      return res.status(400).json({
        success: false,
        message: 'Dados da nota fiscal e email são obrigatórios',
      });
    }

    const result = await sendInvoiceEmail(invoiceData, recipientEmail);

    res.json({
      success: true,
      message: 'Email enviado com sucesso!',
      emailId: result.messageId,
    });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
    });
  }
});

// controllers/invoiceController.js
app.post('/api/invoice/generate-link', async (req, res) => {
  try {
    const { invoiceData } = req.body;

    if (!invoiceData) {
      return res.status(400).json({
        success: false,
        message: 'Dados da nota fiscal são obrigatórios',
      });
    }

    const result = await generateShareableLink(invoiceData);

    res.json({
      success: true,
      shareUrl: result.shareUrl,
      expiresAt: result.expiresAt,
    });
  } catch (error) {
    console.error('Erro ao gerar link:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao gerar link',
    });
  }
});

// Endpoint para visualizar nota fiscal
app.get('/invoice/view/:shareId', async (req, res) => {
  try {
    const { shareId } = req.params;
    const invoiceData = await redis.get(`invoice:${shareId}`);

    if (!invoiceData) {
      return res.status(404).send('Link expirado ou inválido');
    }

    const data = JSON.parse(invoiceData);
    const pdfBuffer = await generateInvoicePDF(data);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="nota-fiscal-${data.invoiceNumber}.pdf"`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('Erro ao visualizar nota fiscal:', error);
    res.status(500).send('Erro interno');
  }
});
```

---

## 📦 Dependências Necessárias

```bash
npm install nodemailer puppeteer redis crypto
```

---

## 🔒 Variáveis de Ambiente

```env
# Email
SMTP_HOST=smtp.gmail.com
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app

# API
API_BASE_URL=https://api.delbicos.com

# Redis (para links compartilháveis)
REDIS_URL=redis://localhost:6379
```

---

## ✅ Benefícios da Implementação Back-End

1. **📧 Email Profissional:** Envios através de servidor SMTP confiável
2. **🔒 Segurança:** Links temporários com expiração automática
3. **📊 Analytics:** Possibilidade de tracking de visualizações
4. **🎨 Templates:** HTML/CSS avançado para PDFs profissionais
5. **⚡ Performance:** Geração otimizada no servidor
6. **📱 Compatibilidade:** Funciona em todos os dispositivos/navegadores

---

## 🧪 Como Testar

1. **Implemente os endpoints** no seu back-end
2. **Configure as variáveis** de ambiente
3. **Teste no app:** Os botões já estão preparados para usar a API
4. **Verifique logs** do servidor para debug

O front-end já está **100% preparado** para usar esses endpoints! 🚀
