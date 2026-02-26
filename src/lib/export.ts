// Export utilities for PDF and CSV

import { NewsItem } from './types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export function exportToCSV(items: NewsItem[], filename = 'veille-export', date?: string): void {
  const headers = ['Date', 'Titre', 'Source', 'Catégorie', 'PESTEL', 'Impact', 'Score', 'Lien', 'Insight'];

  const rows = items.map(item => [
    format(new Date(item.pubDate), 'yyyy-MM-dd', { locale: fr }),
    `"${item.title.replace(/"/g, '""')}"`,
    item.source,
    item.sourceCategory,
    item.pestelCategory || '',
    item.impactType || 'neutral',
    item.score.toString(),
    item.link,
    item.businessInsight ? `"${item.businessInsight.replace(/"/g, '""')}"` : '',
  ]);

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const exportDate = date ? new Date(date) : new Date();
  downloadBlob(blob, `${filename}-${format(exportDate, 'yyyy-MM-dd')}.csv`);
}

export function exportToPDF(
  items: NewsItem[],
  stats: { totalNews: number; newsToday: number },
  date?: string
): void {
  // Open print dialog with formatted content
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Veuillez autoriser les popups pour exporter en PDF');
    return;
  }

  const recommendations = items.filter(i => i.isRecommendation);
  const news = items.filter(i => !i.isRecommendation);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Veille Stratégique - ${format(date ? new Date(date) : new Date(), 'dd MMMM yyyy', { locale: fr })}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 40px;
          color: #1a1a1a;
          line-height: 1.5;
        }
        h1 { font-size: 24px; margin-bottom: 8px; }
        .subtitle { color: #666; margin-bottom: 24px; }
        .stats { 
          display: flex; gap: 24px; margin-bottom: 32px;
          padding: 16px; background: #f5f5f5; border-radius: 8px;
        }
        .stat { text-align: center; }
        .stat-value { font-size: 24px; font-weight: 600; }
        .stat-label { font-size: 12px; color: #666; }
        h2 { font-size: 18px; margin: 24px 0 16px; border-bottom: 2px solid #d4a574; padding-bottom: 8px; }
        .article { 
          padding: 12px 0; 
          border-bottom: 1px solid #eee;
          page-break-inside: avoid;
        }
        .article-title { font-weight: 500; margin-bottom: 4px; }
        .article-meta { font-size: 12px; color: #666; }
        .article-insight { 
          margin-top: 8px; padding: 8px; 
          background: #fff8f0; border-left: 3px solid #d4a574;
          font-size: 13px;
        }
        .score { 
          display: inline-block; padding: 2px 8px; 
          border-radius: 4px; font-size: 11px; font-weight: 500;
        }
        .score-high { background: #dcfce7; color: #166534; }
        .score-medium { background: #fef3c7; color: #92400e; }
        .score-low { background: #f3f4f6; color: #6b7280; }
        @media print {
          body { padding: 20px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <h1>📊 Veille Stratégique</h1>
      <p class="subtitle">Alsace Esport Arena • ${format(date ? new Date(date) : new Date(), 'EEEE dd MMMM yyyy', { locale: fr })}</p>
      
      <div class="stats">
        <div class="stat">
          <div class="stat-value">${stats.totalNews}</div>
          <div class="stat-label">Articles</div>
        </div>
        <div class="stat">
          <div class="stat-value">${recommendations.length}</div>
          <div class="stat-label">Recommandations</div>
        </div>
        <div class="stat">
          <div class="stat-value">${stats.newsToday}</div>
          <div class="stat-label">Cette semaine</div>
        </div>
      </div>
      
      ${recommendations.length > 0 ? `
        <h2>⭐ Recommandations</h2>
        ${recommendations.map(item => `
          <div class="article">
            <div class="article-title">${item.title}</div>
            <div class="article-meta">
              ${item.source} • ${item.sourceCategory}
              ${item.pestelCategory ? ` • <span style="color: #7c3aed;">${item.pestelCategory}</span>` : ''}
              ${item.impactType && item.impactType !== 'neutral' ? ` • <span style="color: ${item.impactType === 'opportunity' ? '#16a34a' : '#dc2626'};">${item.impactType === 'opportunity' ? '↗ Opportunité' : '↘ Menace'}</span>` : ''}
              •
              <span class="score ${item.score >= 30 ? 'score-high' : item.score >= 20 ? 'score-medium' : 'score-low'}">
                Score ${item.score}
              </span>
            </div>
            ${item.businessInsight ? `
              <div class="article-insight">
                💡 ${item.businessInsight}
                ${item.businessJustification ? `<br><small>${item.businessJustification}</small>` : ''}
              </div>
            ` : ''}
          </div>
        `).join('')}
      ` : ''}
      
      <h2>📰 Actualités récentes</h2>
      ${news.slice(0, 20).map(item => `
        <div class="article">
          <div class="article-title">${item.title}</div>
          <div class="article-meta">
            ${item.source} • ${item.sourceCategory}
            ${item.pestelCategory ? ` • <span style="color: #7c3aed;">${item.pestelCategory}</span>` : ''}
            ${item.impactType && item.impactType !== 'neutral' ? ` • <span style="color: ${item.impactType === 'opportunity' ? '#16a34a' : '#dc2626'};">${item.impactType === 'opportunity' ? '↗ Opportunité' : '↘ Menace'}</span>` : ''}
            • ${format(new Date(item.pubDate), 'dd MMM', { locale: fr })}
          </div>
        </div>
      `).join('')}

      <div style="page-break-before: always;"></div>
      <h2>📊 Analyse Stratégique</h2>
      
      <div style="margin-bottom: 24px;">
        <h3>Analyse PESTEL (Répartition)</h3>
        <p style="font-size: 12px; color: #666; margin-bottom: 12px;">Basé sur la classification automatique des ${items.length} articles de la période.</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
            ${(['politique', 'economique', 'social', 'technologique', 'environnemental', 'legal'] as const).map(cat => {
    const count = items.filter(i => i.pestelCategory === cat).length;
    const labels: Record<string, string> = {
      politique: 'Politique', economique: 'Économique', social: 'Social',
      technologique: 'Technologique', environnemental: 'Environnemental', legal: 'Légal'
    };
    return `<div style="background: #f8fafc; padding: 12px; border-radius: 4px;">
                <strong>${labels[cat]}</strong><br>
                <span style="font-size: 14px; font-weight: 600;">${count}</span>
                <span style="font-size: 12px; color: #666;"> articles</span>
              </div>`;
  }).join('')}
        </div>
      </div>

       <div style="margin-bottom: 24px;">
        <h3>Qualification Impact</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-top: 12px;">
          <div style="background: #dcfce7; padding: 12px; border-radius: 4px; text-align: center;">
            <div style="font-size: 20px; font-weight: 600; color: #166534;">${items.filter(i => i.impactType === 'opportunity').length}</div>
            <div style="font-size: 12px; color: #166534;">↗ Opportunités</div>
          </div>
          <div style="background: #fef3c7; padding: 12px; border-radius: 4px; text-align: center;">
            <div style="font-size: 20px; font-weight: 600; color: #92400e;">${items.filter(i => i.impactType === 'neutral').length}</div>
            <div style="font-size: 12px; color: #92400e;">• Neutres</div>
          </div>
          <div style="background: #fee2e2; padding: 12px; border-radius: 4px; text-align: center;">
            <div style="font-size: 20px; font-weight: 600; color: #991b1b;">${items.filter(i => i.impactType === 'threat').length}</div>
            <div style="font-size: 12px; color: #991b1b;">↘ Menaces</div>
          </div>
        </div>
      </div>

       <div style="margin-bottom: 24px;">
        <h3>Matrice SWOT (Synthèse)</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
            <tr>
                <td style="width: 50%; padding: 12px; border: 1px solid #ddd; vertical-align: top;">
                    <div style="color: #166534; font-weight: bold; margin-bottom: 8px;">Forces (Interne)</div>
                    <ul style="font-size: 12px; padding-left: 16px; margin: 0;">
                        <li>Positionnement local fort en Alsace</li>
                        <li>Communauté gaming engagée</li>
                        <li>Outil de veille automatisé</li>
                    </ul>
                </td>
                <td style="width: 50%; padding: 12px; border: 1px solid #ddd; vertical-align: top;">
                    <div style="color: #991b1b; font-weight: bold; margin-bottom: 8px;">Faiblesses (Interne)</div>
                    <ul style="font-size: 12px; padding-left: 16px; margin: 0;">
                        <li>Dépendance aux éditeurs de jeux</li>
                        <li>Coûts énergétiques élevés</li>
                        <li>Marché local limité en taille</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td style="width: 50%; padding: 12px; border: 1px solid #ddd; vertical-align: top;">
                    <div style="color: #1e40af; font-weight: bold; margin-bottom: 8px;">Opportunités (Externe)</div>
                    <ul style="font-size: 12px; padding-left: 16px; margin: 0;">
                        ${items.filter(i => i.impactType === 'opportunity').slice(0, 4).map(i => `<li>${i.title}</li>`).join('')}
                        ${items.filter(i => i.impactType === 'opportunity').length === 0 ? '<li>Diversification B2B</li><li>Événementiel d\'entreprise</li>' : ''}
                    </ul>
                </td>
                <td style="width: 50%; padding: 12px; border: 1px solid #ddd; vertical-align: top;">
                    <div style="color: #9a3412; font-weight: bold; margin-bottom: 8px;">Menaces (Externe)</div>
                    <ul style="font-size: 12px; padding-left: 16px; margin: 0;">
                        ${items.filter(i => i.impactType === 'threat').slice(0, 4).map(i => `<li>${i.title}</li>`).join('')}
                        ${items.filter(i => i.impactType === 'threat').length === 0 ? '<li>Régulation accrue</li><li>Volatilité du marché esport</li>' : ''}
                    </ul>
                </td>
            </tr>
        </table>
      </div>
      
      <script>
        window.onload = () => {
          window.print();
          setTimeout(() => window.close(), 100);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
