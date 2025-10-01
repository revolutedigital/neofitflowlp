const fs = require('fs');
const path = require('path');

// Get all blog post directories
const blogDir = path.join(__dirname, 'app', 'blog');
const entries = fs.readdirSync(blogDir, { withFileTypes: true });
const postDirs = entries
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)
  .sort();

console.log(`📊 Found ${postDirs.length} blog posts\n`);

// ============= UPDATE SITEMAP =============
console.log('📝 Updating sitemap.ts...');

const sitemapContent = `import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://neofitflow.com.br'

  const blogPosts = [
${postDirs.map(slug => `    '${slug}',`).join('\n')}
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: \`\${baseUrl}/blog\`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogPosts.map(slug => ({
      url: \`\${baseUrl}/blog/\${slug}\`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}`;

fs.writeFileSync(path.join(__dirname, 'app', 'sitemap.ts'), sitemapContent, 'utf8');
console.log(`✓ Sitemap updated with ${postDirs.length} posts\n`);

// ============= CREATE ROBOTS.TXT =============
console.log('🤖 Creating robots.txt...');

const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

# Sitemaps
Sitemap: https://neofitflow.com.br/sitemap.xml

# Google bots
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

# Bing
User-agent: Bingbot
Allow: /

# Crawl delay (optional)
Crawl-delay: 0`;

fs.writeFileSync(path.join(__dirname, 'public', 'robots.txt'), robotsTxt, 'utf8');
console.log('✓ robots.txt created\n');

// ============= EXTRACT POST METADATA =============
console.log('📖 Extracting post metadata for blog page...');

const postsMetadata = [];

postDirs.forEach((slug) => {
  const filePath = path.join(blogDir, slug, 'page.tsx');

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract title
    const titleMatch = content.match(/title:\s*"([^"]+)"/);
    const title = titleMatch ? titleMatch[1].replace(' | NeoFitFlow', '') : slug;

    // Extract description
    const descMatch = content.match(/description:\s*"([^"]+)"/);
    const excerpt = descMatch ? descMatch[1] : '';

    // Extract category from the post content
    const categoryMatch = content.match(/<div className="text-sm text-gray-400 mb-4">([^<]+)<\/div>/);
    let category = categoryMatch ? categoryMatch[1] : 'Geral';

    // Map categories
    const categoryMap = {
      'IA e Prevenção': 'IA & Retenção',
      'Impacto Financeiro': 'Gestão',
      'Sinais de Risco': 'Retenção',
      'Ação Preventiva': 'Retenção',
      'Casos Por Modalidade': 'Específico',
      'Retenção': 'Retenção',
      'Automação': 'Automação',
      'Vendas': 'Vendas',
      'Gestão': 'Gestão',
      'Marketing': 'Marketing',
      'Específico': 'Específico'
    };

    category = categoryMap[category] || 'Geral';

    // Extract date
    const dateMatch = content.match(/datePublished:\s*"(\d{4}-\d{2}-\d{2})"/);
    const date = dateMatch ? dateMatch[1] : '2025-10-01';

    postsMetadata.push({
      slug,
      title,
      excerpt: excerpt.substring(0, 150),
      category,
      date
    });
  }
});

// Sort by date descending
postsMetadata.sort((a, b) => new Date(b.date) - new Date(a.date));

console.log(`✓ Extracted metadata for ${postsMetadata.length} posts\n`);

// ============= UPDATE BLOG PAGE =============
console.log('📄 Updating blog page with all posts...');

const blogPageContent = `'use client';

import Link from "next/link";
import { useState } from "react";

const blogPosts = ${JSON.stringify(postsMetadata, null, 2)};

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Retenção', 'IA & Retenção', 'Automação', 'Vendas', 'Gestão', 'Marketing', 'Específico'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b-2 border-white fixed w-full z-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-xl md:text-2xl font-bold tracking-tight">NeoFitFlow</span>
            </Link>
            <Link
              href="/"
              className="bg-white text-black px-4 md:px-6 py-2 hover:bg-gray-200 transition-colors font-bold border-2 border-white text-sm md:text-base"
            >
              Voltar para Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 border-b-2 border-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-center">
            Blog NeoFitFlow
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto text-center mb-8">
            Tudo sobre IA, retenção de alunos e automação para academias
          </p>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <input
                type="text"
                placeholder="🔍 Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 bg-white text-black border-2 border-white focus:outline-none focus:ring-2 focus:ring-white text-lg"
              />
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={\`px-4 py-2 font-bold border-2 border-white transition-all \${
                    selectedCategory === category
                      ? 'bg-white text-black'
                      : 'bg-black text-white hover:bg-white hover:text-black'
                  }\`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8 text-center">
            <p className="text-xl text-gray-400">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={\`/blog/\${post.slug}\`}
                className="border-2 border-white p-6 hover:bg-white hover:text-black transition-all group"
              >
                <div className="text-sm font-bold mb-2 text-gray-400 group-hover:text-gray-600">
                  {post.category} • {new Date(post.date).toLocaleDateString('pt-BR')}
                </div>
                <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
                <p className="text-gray-300 group-hover:text-gray-700 mb-4">
                  {post.excerpt}
                </p>
                <span className="font-bold">Ler mais →</span>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-400 mb-4">Nenhum artigo encontrado</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Todos');
                }}
                className="border-2 border-white px-6 py-3 font-bold hover:bg-white hover:text-black transition-all"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t-2 border-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto Para Reduzir Evasão Com IA?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Sistema que identifica alunos em risco e age automaticamente via WhatsApp
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-black px-8 py-4 font-bold hover:bg-gray-200 transition-colors text-lg border-2 border-white"
          >
            Ver Demonstração Gratuita
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t-2 border-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 NeoFitFlow. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}`;

fs.writeFileSync(path.join(__dirname, 'app', 'blog', 'page.tsx'), blogPageContent, 'utf8');
console.log(`✓ Blog page updated with all ${postsMetadata.length} posts\n`);

console.log('✅ All updates completed successfully!');
console.log(`\nSummary:`);
console.log(`- Sitemap: ${postDirs.length} posts`);
console.log(`- robots.txt: Created`);
console.log(`- Blog page: ${postsMetadata.length} posts listed`);