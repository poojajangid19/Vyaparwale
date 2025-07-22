import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const handleSharePDF = async () => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #000; padding: 8px; text-align: center; }
          img { width: 100px; height: auto; margin: 5px; }
          .footer { font-size: 12px; margin-top: 20px; }
          .header { margin-bottom: 20px; }
          .title { font-size: 18px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">Granite Measurement Sheet</div>
          <p><strong>Customer:</strong> ${partyName}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Granite:</strong> ${graniteDetailText}</p>
        </div>

        <div>
          ${images.map(img => `<img src="${img.uri}" />`).join('')}
        </div>

        <table>
          <tr>
            <th>S.No</th>
            <th>Length</th>
            <th>Width</th>
            <th>Sq.Ft</th>
          </tr>
          ${
            sheetData?.measurements?.map((item, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${item.length}</td>
                <td>${item.width}</td>
                <td>${item.sqft}</td>
              </tr>
            `).join('') || '<tr><td colspan="4">No measurement data found</td></tr>'
          }
        </table>

        <h4>Total Sq.Ft: ${totalSqFt} ft²</h4>

        <div class="footer">
          <p>Less/Chipping: ${calculateLessArea()} ft² (${lessLength} x ${lessBreadth} x ${lessQty})</p>
          <p>Download the app: <a href="https://play.google.com/store/apps/details?id=com.patthar.granitemar">Play Store Link</a></p>
          <p>Page 1</p>
        </div>
      </body>
    </html>`;

  try {
    const options = {
      html: htmlContent,
      fileName: `Granite_Sheet_${partyName.replace(/\s+/g, '_')}_${Date.now()}`,
      directory: 'Documents',
    };

    const file = await RNHTMLtoPDF.convert(options);

    await Share.open({
      url: `file://${file.filePath}`,
      type: 'application/pdf',
      title: 'Share Granite Measurement PDF',
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    Alert.alert('Error', 'Could not generate PDF. Please try again.');
  }
};
