import { useTranslation } from 'react-i18next';

/**
 * Supported languages on https://docs.logto.io
 */
enum DocumentationLanguage {
  English = 'en',
  Chinese = 'zh-CN',
}

const documentationSiteRoot = 'https://docs.logto.io';

const useDocumentationUrl = () => {
  const {
    i18n: { language },
  } = useTranslation();

  const documentationSiteUrl = Object.values<string>(DocumentationLanguage)
    .filter((language) => language !== DocumentationLanguage.English)
    .includes(language)
    ? `${documentationSiteRoot}/${language.toLocaleLowerCase()}`
    : documentationSiteRoot;

  return {
    documentationSiteUrl,
    getDocumentationUrl: (pagePath: string) => `${documentationSiteUrl}${pagePath}`,
  };
};

export default useDocumentationUrl;
