import { site } from '@/data/content';
import { advisor, institution, teamMembers } from '@/data/team';

/** Dados estruturados (schema.org) de projeto educacional de pesquisa. */
export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: site.projectTitle,
    description:
      'Projeto científico sobre o uso de Machine Learning e dados climáticos para antecipar períodos de maior risco de arboviroses em Florianópolis.',
    inLanguage: 'pt-BR',
    learningResourceType: 'Projeto de pesquisa',
    educationalLevel: 'Ensino Médio',
    isAccessibleForFree: true,
    dateCreated: institution.year,
    about: ['Arboviroses', 'Dengue', 'Zika', 'Chikungunya', 'Machine Learning', 'Saúde pública'],
    author: teamMembers.map((name) => ({ '@type': 'Person', name })),
    contributor: { '@type': 'Person', name: advisor, jobTitle: 'Orientadora' },
    publisher: {
      '@type': 'EducationalOrganization',
      name: institution.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: institution.city,
        addressRegion: 'SC',
        addressCountry: 'BR',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
