import TermsLinks from '@/components/TermsLinks';
import useTerms from '@/hooks/use-terms';

type Props = {
  className?: string;
};

const TermsAndPrivacyLinks = ({ className }: Props) => {
  const { termsOfUseUrl, privacyPolicyUrl, isTermsDisabled } = useTerms();

  if (isTermsDisabled) {
    return null;
  }

  return (
    <div className={className}>
      <TermsLinks termsOfUseUrl={termsOfUseUrl} privacyPolicyUrl={privacyPolicyUrl} />
    </div>
  );
};

export default TermsAndPrivacyLinks;
