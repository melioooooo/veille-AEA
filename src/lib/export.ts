// Export utilities for PDF and CSV

import { NewsItem } from './types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export function exportToCSV(items: NewsItem[], filename = 'veille-export'): void {
    const headers = ['Date', 'Titre', 'Source', 'Catégorie', 'Score', 'Lien', 'Insight'];

    const rows = items.map(item => [
        format(new Date(item.pubDate), 'yyyy-MM-dd', { locale: fr }),
        `"${item.title.replace(/"/g, '""')}"`,
        item.source,
        item.sourceCategory,
        item.score.toString(),
        item.link,
        item.businessInsight ? `"${item.businessInsight.replace(/"/g, '""')}"` : '',
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, `${filename}-${format(new Date(), 'yyyy-MM-dd')}.csv`);
}

export function exportToPDF(
    items: NewsItem[],
    stats: { totalNews: number; newsToday: number }
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
      <title>Veille Stratégique - ${format(new Date(), 'dd MMMM yyyy', { locale: fr })}</title>
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
      <p class="subtitle">Alsace Esport Arena • ${format(new Date(), 'EEEE dd MMMM yyyy', { locale: fr })}</p>
      
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
              ${item.source} • ${item.sourceCategory} • 
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
            ${item.source} • ${item.sourceCategory} • 
            ${format(new Date(item.pubDate), 'dd MMM', { locale: fr })}
          </div>
        </div>
      `).join('')}
      
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
