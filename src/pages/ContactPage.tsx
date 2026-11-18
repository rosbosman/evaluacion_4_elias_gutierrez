import { ContactForm } from '../components/ContactForm/ContactForm';
import { PageSection } from '../components/PageSection/PageSection';
import { ParchmentCard } from '../components/ParchmentCard/ParchmentCard';
import { profile } from '../data/portfolioData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function ContactPage() {
  useDocumentTitle('Contacto');

  return (
    <PageSection title="Invítame a tu Mesa">
      <ParchmentCard>
        <p>{profile.introContacto}</p>
        <ContactForm />
      </ParchmentCard>
    </PageSection>
  );
}
