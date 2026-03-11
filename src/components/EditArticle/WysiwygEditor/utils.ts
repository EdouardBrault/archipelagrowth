
export const insertMarkdown = (
  value: string,
  onChange: (value: string) => void,
  before: string,
  after: string = ''
) => {
  const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
  if (!textarea) {
    // Fallback si on ne trouve pas le textarea
    onChange(value + before + after);
    return;
  }

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = value.substring(start, end);
  
  const beforeText = value.substring(0, start);
  const afterText = value.substring(end);
  
  const newText = beforeText + before + selectedText + after + afterText;
  
  // Calculer la nouvelle position du curseur
  const newCursorPos = start + before.length + selectedText.length + after.length;
  
  onChange(newText);
  
  // Restaurer la position du curseur après le rendu
  setTimeout(() => {
    if (textarea) {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }
  }, 0);
};

export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    console.log('🖼️ Début compression image:', file.name, 'Type:', file.type, 'Taille:', file.size);
    
    // Si le fichier fait moins de 500KB, pas besoin de compression
    if (file.size <= 500 * 1024) {
      console.log('✅ Fichier petit, pas de compression nécessaire');
      resolve(file);
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.createElement('img');
    
    img.onload = () => {
      try {
        console.log('🖼️ Image chargée, dimensions:', img.width, 'x', img.height);
        
        // Calculer les nouvelles dimensions (max 1200px de largeur)
        const maxWidth = 1200;
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        const newWidth = Math.floor(img.width * ratio);
        const newHeight = Math.floor(img.height * ratio);
        
        console.log('🔄 Nouvelles dimensions:', newWidth, 'x', newHeight, 'Ratio:', ratio);
        
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        if (!ctx) {
          console.error('❌ Impossible de créer le contexte canvas');
          resolve(file);
          return;
        }

        // Dessiner l'image redimensionnée
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        
        // Déterminer le type de sortie en fonction du type original
        const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const quality = file.type === 'image/png' ? undefined : 0.85;
        
        console.log('💾 Compression vers:', outputType, 'Qualité:', quality);
        
        canvas.toBlob((blob) => {
          if (!blob) {
            console.error('❌ Échec de la compression, utilisation du fichier original');
            resolve(file);
            return;
          }
          
          console.log('✅ Compression réussie, nouvelle taille:', blob.size, 'Gain:', ((file.size - blob.size) / file.size * 100).toFixed(1) + '%');
          
          const compressedFile = new File([blob], file.name, {
            type: outputType,
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        }, outputType, quality);
      } catch (error) {
        console.error('❌ Erreur lors de la compression:', error);
        resolve(file);
      }
    };
    
    img.onerror = (error) => {
      console.error('❌ Erreur de chargement de l\'image:', error);
      resolve(file);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

const convertTableToMarkdown = (tableHtml: string): string => {
  // Créer un élément temporaire pour parser le HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = tableHtml;
  
  const table = tempDiv.querySelector('table');
  if (!table) return tableHtml;
  
  const rows: string[][] = [];
  let hasHeaders = false;
  
  // Extraire toutes les lignes (thead et tbody)
  const allRows = table.querySelectorAll('tr');
  
  allRows.forEach((row, rowIndex) => {
    const cells: string[] = [];
    const cellElements = row.querySelectorAll('th, td');
    
    // Si la première ligne contient des <th>, c'est un en-tête
    if (rowIndex === 0 && row.querySelectorAll('th').length > 0) {
      hasHeaders = true;
    }
    
    cellElements.forEach(cell => {
      // Nettoyer le contenu de la cellule et convertir les balises simples
      let cellContent = cell.innerHTML
        .replace(/<(strong|b)[^>]*>(.*?)<\/(strong|b)>/gi, '**$2**')
        .replace(/<(em|i)[^>]*>(.*?)<\/(em|i)>/gi, '*$2*')
        .replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)')
        .replace(/<br[^>]*\/?>/gi, ' ')
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
      
      cells.push(cellContent || ' ');
    });
    
    if (cells.length > 0) {
      rows.push(cells);
    }
  });
  
  if (rows.length === 0) return tableHtml;
  
  // Construire le tableau Markdown
  let markdownTable = '\n\n';
  
  // Première ligne (en-tête ou première ligne de données)
  markdownTable += '| ' + rows[0].join(' | ') + ' |\n';
  
  // Ligne de séparation
  const separatorCells = rows[0].map(() => '---');
  markdownTable += '| ' + separatorCells.join(' | ') + ' |\n';
  
  // Lignes de données (à partir de la 2ème ligne si on a des en-têtes, sinon à partir de la 2ème ligne aussi)
  const dataStartIndex = hasHeaders ? 1 : 1;
  for (let i = dataStartIndex; i < rows.length; i++) {
    // S'assurer que toutes les lignes ont le même nombre de colonnes
    const paddedCells = [...rows[i]];
    while (paddedCells.length < rows[0].length) {
      paddedCells.push(' ');
    }
    markdownTable += '| ' + paddedCells.slice(0, rows[0].length).join(' | ') + ' |\n';
  }
  
  markdownTable += '\n';
  
  return markdownTable;
};

export const htmlToMarkdown = (html: string): string => {
  // Convertir les tableaux en premier
  let markdown = html.replace(/<table[^>]*>.*?<\/table>/gis, (match) => {
    return convertTableToMarkdown(match);
  });
  
  // Nettoyer le HTML et enlever les styles
  markdown = markdown
    // Enlever les balises de style et scripts
    .replace(/<style[^>]*>.*?<\/style>/gi, '')
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    
    // Convertir les titres
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n\n# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n\n## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n\n### $1\n\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n\n#### $1\n\n')
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '\n\n##### $1\n\n')
    .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '\n\n###### $1\n\n')
    
    // Convertir le gras et l'italique
    .replace(/<(strong|b)[^>]*>(.*?)<\/(strong|b)>/gi, '**$2**')
    .replace(/<(em|i)[^>]*>(.*?)<\/(em|i)>/gi, '*$2*')
    
    // Convertir les liens
    .replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    
    // Convertir les listes
    .replace(/<ul[^>]*>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>/gi, '\n')
    .replace(/<\/ol>/gi, '\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    
    // Convertir les paragraphes et divs
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<\/div>/gi, '\n')
    .replace(/<div[^>]*>/gi, '')
    .replace(/<br[^>]*\/?>/gi, '\n')
    
    // Nettoyer les balises restantes
    .replace(/<[^>]*>/g, '')
    
    // Décoder les entités HTML
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    
    // Nettoyer les espaces et sauts de ligne excessifs
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .replace(/^\s+|\s+$/g, '')
    .trim();

  return markdown;
};

export const renderPreview = (content: string) => {
  return content
    .replace(/\n\n/g, '</p><p>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
};
